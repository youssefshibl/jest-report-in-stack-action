const core = require("@actions/core");
const exec = require("@actions/exec");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "test-report.json");

async function run() {
  const src = __dirname;
  let testReport;
  try {
    await exec.exec("npm", ["install"]);

    // start testing
    core.startGroup("Start testing");
    await exec.exec("npm test");
    core.endGroup();
  } catch (error) {
    core.setFailed(error.message);
  }

  try {
    if (fs.existsSync(filePath)) {
      core.setOutput("test-report.json exist");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
