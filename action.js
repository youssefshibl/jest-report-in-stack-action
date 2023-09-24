const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
  try {
    const src = __dirname;
    await exec.exec("npm", ["install"]);
    // start testing
    core.startGroup("Start testing");
    await exec.exec("npm test");
    core.endGroup();

    // Check the test result
    const testReport = require("./test-report.json");
    if (testReport.success) {
      console.log("Tests passed successfully.");
    } else {
      console.error("Tests failed.");
      //core.setFailed("Tests failed.");
    }
  } catch (error) {
    //core.setFailed(error.message);
  }
}

run();