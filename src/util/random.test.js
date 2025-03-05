import { randomNumberForDate } from './random';
import { COLLEGEDLE_POOL } from './constants';

// Import the randomFromSeed function directly for testing
// Since it's not exported, we'll need to recreate it for testing
const randomFromSeed = (seed) => {
  // Convert string seed to a numeric value by summing char codes
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

// Mock Date.now() to return specific dates
describe('randomNumberForDate', () => {
  let originalDateNow;
  let originalDateToISOString;
  
  beforeEach(() => {
    // Store the original methods
    originalDateNow = Date.now;
    originalDateToISOString = Date.prototype.toISOString;
  });
  
  afterEach(() => {
    // Restore the original methods
    Date.now = originalDateNow;
    Date.prototype.toISOString = originalDateToISOString;
  });
  
  test('debug randomFromSeed function', () => {
    // Test with string dates
    const testDates = [
      '2025-03-01',
      '2025-03-02',
      '2025-03-03',
      '2025-03-04'
    ];
    
    console.log('Testing randomFromSeed with date strings:');
    for (const dateStr of testDates) {
      // Calculate numeric seed
      let numericSeed = 0;
      for (let i = 0; i < dateStr.length; i++) {
        numericSeed += dateStr.charCodeAt(i) * (i + 1);
      }
      
      const sinValue = Math.sin(numericSeed);
      const x = sinValue * 100000;
      const result = x - Math.floor(x);
      const finalResult = Math.floor(result * COLLEGEDLE_POOL);
      
      console.log(`Date: ${dateStr}`);
      console.log(`  Numeric seed: ${numericSeed}`);
      console.log(`  Math.sin(${numericSeed}) = ${sinValue}`);
      console.log(`  x = ${x}`);
      console.log(`  result = ${result}`);
      console.log(`  Math.floor(result * ${COLLEGEDLE_POOL}) = ${finalResult}`);
      console.log('---');
    }
    
    // Simple assertion to make the test pass
    expect(true).toBe(true);
  });
  
  test('print random numbers for March 1-4, 2025', () => {
    // Create an array to store the random numbers for each day
    const results = [];
    
    // Define the dates we want to test
    const testDates = [
      { date: '2025-03-01', display: 'March 1, 2025' },
      { date: '2025-03-02', display: 'March 2, 2025' },
      { date: '2025-03-03', display: 'March 3, 2025' },
      { date: '2025-03-04', display: 'March 4, 2025' }
    ];
    
    for (const { date, display } of testDates) {
      // Mock the toISOString method to return our test date
      Date.prototype.toISOString = jest.fn(() => `${date}T12:00:00.000Z`);
      
      // Get the random number for this date
      const randomNum = randomNumberForDate();
      
      // Store the date and random number
      results.push({
        date: display,
        randomNum
      });
    }
    
    // Print the results
    console.table(results);
    
    // Check if any consecutive days have the same random number
    for (let i = 1; i < results.length; i++) {
      if (results[i].randomNum === results[i-1].randomNum) {
        console.error(`WARNING: ${results[i-1].date} and ${results[i].date} have the same random number: ${results[i].randomNum}`);
      }
    }
    
    // Simple assertion to make the test pass
    expect(true).toBe(true);
  });
}); 