export const StepType = {
  Start: 0,
  Playing: 1,
  GameOver: 2,
};

export const getScore = (value) => {
  return Math.min(value.split(' ').length, 2);
};
