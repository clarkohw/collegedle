import { COLLEGEDLE_OFFSET, COLLEGEDLE_POOL } from "./constants";

export const randomNumberForDate = () => {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0]; 
  const rand = randomFromSeed(dateStr);
  return Math.floor(rand * COLLEGEDLE_POOL);
};

const randomFromSeed = (seed) => {
  let numericSeed = 0;
  if (typeof seed === 'string') {
    for (let i = 0; i < seed.length; i++) {
      numericSeed += seed.charCodeAt(i) * (i + 1); // Multiply by position to avoid anagrams having same value
    }
  } else {
    numericSeed = seed;
  }
  
  const x = Math.sin(numericSeed) * 100000;
  return x - Math.floor(x);
};
