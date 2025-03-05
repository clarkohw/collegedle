module.exports = {
  transformIgnorePatterns: [
    // Change the default pattern to transform d3 packages
    'node_modules/(?!(d3|d3-scale|d3-scale-chromatic|d3-array|d3-color|d3-format|d3-interpolate|d3-time|d3-time-format)/)'
  ],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
}; 