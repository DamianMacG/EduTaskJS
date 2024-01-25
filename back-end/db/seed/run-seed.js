const seed = require("./seed");
const devData = require("../dev-data/index");
const pool = require("../connection");
const testData = require('../test-data/index')

const runSeed = async () => {
  try {
    console.log("Seeding...");
    await seed(testData);
    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    pool.end();
  }
};

runSeed();
