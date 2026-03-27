/* @type {import('jest').Config} */
const config = {
  // Use 'node' environment for Express/Node.js apps
  testEnvironment: "node",

  // Display individual test results with the test suite hierarchy
  verbose: true,

  // Path to the setup file that runs after the test framework is installed
  // <rootDir> is a special token that refers to your project root
  setupFilesAfterEnv: ["./jest.setup.js"],
};

module.exports = config;
