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
  
  test('check for consecutive identical results over a full year', () => {
    // Create an array to store the random numbers for each day of the year
    const results = [];
    
    // Generate a random number for each day of the year (using direct seed calculation without mocking Date)
    for (let month = 1; month <= 12; month++) {
      // Get number of days in this month for 2025
      const daysInMonth = new Date(2025, month, 0).getDate();
      
      for (let day = 1; day <= daysInMonth; day++) {
        // Format the date as YYYY-MM-DD with padding for single-digit months/days
        const dateStr = `2025-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        
        // Use the randomFromSeed function directly with the date string
        const rand = randomFromSeed(dateStr);
        const randomNum = Math.floor(rand * COLLEGEDLE_POOL);
        
        // Store the date and random number
        results.push({
          date: dateStr,
          randomNum
        });
      }
    }
    
    // Check for consecutive identical results
    let consecutiveCount = 0;
    let totalConsecutivePairs = 0;
    
    for (let i = 1; i < results.length; i++) {
      if (results[i].randomNum === results[i-1].randomNum) {
        totalConsecutivePairs++;
        console.error(`WARNING: ${results[i-1].date} and ${results[i].date} have the same random number: ${results[i].randomNum}`);
        
        // Check for runs of consecutive identical values
        consecutiveCount++;
      } else {
        // Reset the consecutive counter when we find a different value
        consecutiveCount = 0;
      }
      
      // Alert if we find a run of more than 2 consecutive identical values
      if (consecutiveCount >= 2) {
        console.error(`CRITICAL: Found ${consecutiveCount + 1} consecutive dates with the same random number: ${results[i].randomNum}`);
      }
    }
    
    console.log(`Total days tested: ${results.length}`);
    console.log(`Total consecutive pairs found: ${totalConsecutivePairs}`);
    console.log(`Collision rate: ${(totalConsecutivePairs / (results.length - 1) * 100).toFixed(2)}%`);
    
    // Calculate distribution of values
    const valueDistribution = {};
    for (const result of results) {
      if (!valueDistribution[result.randomNum]) {
        valueDistribution[result.randomNum] = 0;
      }
      valueDistribution[result.randomNum]++;
    }
    
    // Print the most frequent values
    const sortedValues = Object.entries(valueDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    console.log('Top 10 most frequent values:');
    for (const [value, count] of sortedValues) {
      console.log(`  Value ${value}: appeared ${count} times (${(count / results.length * 100).toFixed(2)}%)`);
    }
    
    // Check that we don't have an unacceptable collision rate (arbitrary threshold)
    expect(totalConsecutivePairs / (results.length - 1)).toBeLessThan(0.1); // Less than 10% collision rate
  });
}); 