const core = require("@actions/core");
const exec = require("@actions/exec");
const fs = require("fs");
const path = require("path");
// const filePath = path.join(__dirname,"..","..", "test-report.json");

async function run() {
  let testReport;
  try {
    await exec.exec("npm", ["install"]);

    // start testing
    core.startGroup("Start testing");
    await exec.exec("npm test");
    core.endGroup();

    await exec.exec(`cat ./test-report.json`);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
