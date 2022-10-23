export const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const getRandom0To50 = () => {
  return getRandomArbitrary(0, 50);
};
