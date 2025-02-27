import { COLLEGEDLE_OFFSET, COLLEGEDLE_POOL } from "./constants";

export const randomNumberForDate = () => {
  const today = new Date(Date.now());
  const yearRand = randomFromSeed(today.getFullYear());
  const monthRand = randomFromSeed(today.getMonth() + 1);
  const dayRand = randomFromSeed(today.getDate());
  
  return Math.floor(COLLEGEDLE_OFFSET * yearRand * monthRand * dayRand) % COLLEGEDLE_POOL;
};

const randomFromSeed = (seed) => {
  const x = Math.sin(seed) * 100000;
  return x - Math.floor(x);
};
