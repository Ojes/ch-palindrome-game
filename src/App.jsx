import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { getScore, StepType } from './utils';
import { validateLength, validatePalindrome } from './utils/validation';
import { useReminder } from './hooks/useReminder';

function App() {
  const [score, setScore] = useState(0);
  const [palindromeValue, setPalindromeValue] = useState('');
  const [palindromeList, addPalindrome] = useState(() => []);
  const [step, setStep] = useState(StepType.Start);
  const { time, start, reset } = useReminder(handleGameOver, 30);

  useEffect(() => {
    if (step === StepType.Playing) start();
  }, [step]);

  function handleGameOver() {
    setStep(StepType.GameOver);
  }

  const handleStartPlaying = () => {
    setStep(StepType.Playing);
  };

  const handleValue = (evt) => {
    setPalindromeValue(evt.target.value);
  };

  const hasPalindrome = useMemo(
    () => palindromeList.find((value) => value.text === palindromeValue),
    [palindromeList, palindromeValue]
  );

  const isLongerEnough = validateLength(palindromeValue);

  const handleAddPalindrome = (evt) => {
    evt.preventDefault();

    if (hasPalindrome || !isLongerEnough) return;

    const isValid = validatePalindrome(palindromeValue);
    const points = isValid ? getScore(palindromeValue) : 0;
    const result = {
      isValid,
      points,
      text: palindromeValue,
    };
    addPalindrome([...palindromeList, result]);
    setPalindromeValue('');
    setScore(score + points);
  };

  const handleRestart = () => {
    setPalindromeValue('');
    setScore(0);
    addPalindrome([]);
    reset();
    setStep(StepType.Playing);
  };

  return (
    <article className='bg-violet-900 w-full h-full p-4 justify-center items-center flex flex-col'>
      <header>
        <h1 className='text-2xl text-white font-extrabold mb-8'>🕹 The palindrome game 🎉</h1>
      </header>
      {step === StepType.Start && (
        <section>
          <button
            onClick={handleStartPlaying}
            className='bg-blue-500 hover:bg-blue-700 h-[38px] text-white font-bold py-2 px-4 rounded'
          >
            Start to play
          </button>
        </section>
      )}
      {step === StepType.Playing && (
        <section className='flex flex-col justify-content items-center w-full max-w-[760px]'>
          <header className='w-full flex justify-between'>
            <p className=' w-full text-white text-sm font-bold mb-6'>{time}</p>
            <p className='text-right w-full text-white text-sm font-bold mb-6'>
              Your score: <span className='text-md font-bold'>{score}</span>
            </p>
          </header>
          <form className='bg-white shadow-md rounded-md w-full px-8 pt-6 pb-8 mb-4' onSubmit={handleAddPalindrome}>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='palindrome'>
                Write a palindrome
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='palindrome'
                value={palindromeValue}
                onChange={handleValue}
                type='text'
              />
              {hasPalindrome && <p className='text-red-700 text-xs'>Palindrome was write before</p>}
            </div>
            <button
              type='submit'
              disabled={!isLongerEnough}
              className={classNames('bg-blue-500 text-white font-bold py-2 px-4 rounded', {
                'bg-gray-50': !isLongerEnough,
                'hover:bg-blue-700 ': isLongerEnough,
              })}
            >
              Add palindrome
            </button>
          </form>

          <ul className='gap-2 flex w-full  max-w-[760px] max-h-[300px] overflow-auto'>
            {palindromeList.map((result, index) => (
              <li
                key={`${result.text}-${index}`}
                className={classNames('p-2 border-2  text-md rounded-md bg-white inline-flex', {
                  'border-green-600': result.isValid,
                  'border-red-600': !result.isValid,
                })}
              >
                {result.text}{' '}
                <span className='text-bold text-gray-300 ml-4'> {result.points ? `+${result.points}` : 0}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
      {step === StepType.GameOver && (
        <section className='w-full text-center'>
          <header>
            <h2 className='text-white text-2xl font-medium'>Your score is:</h2>
            <p className='text-white text-8xl font-bold'>{score}</p>
          </header>
          <button
            onClick={handleRestart}
            className='bg-blue-500 hover:bg-blue-700 h-[38px] mt-6 text-white font-bold py-2 px-4 rounded'
          >
            Play again
          </button>
        </section>
      )}
    </article>
  );
}

export default App;
