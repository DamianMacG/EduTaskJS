const seed = require("./seed");
const devData = require("../dev-data/index");
const pool = require("../connection");

const runSeed = async () => {
  try {
    console.log("Seeding...");
    await seed(devData);
    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    pool.end();
  }
};

runSeed();
