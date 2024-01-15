

const runSeed = async () => {
  try {
    await require("./seed");
    console.log("Seed script executed successfully");
  } catch (error) {
    console.error("Error running seed script:", error);
    process.exit(1);
  }
};

runSeed().then(() => process.exit());
