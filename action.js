const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
  const src = __dirname;
  let test_status = true;
  let testReport;
  try {
    await exec.exec("npm", ["install"]);
    // start testing
    core.startGroup("Start testing");
    await exec.exec("npm test");
    core.endGroup();

    //Check the test result
    // testReport = require("./test-report.json");
    // if (!testReport.success) {
    //   test_status = false;
    // }
  } catch (error) {
    core.setFailed(error.message);
  }
  // send report to slack stage
  try {
    testReport = require("./test-report.json");
    if (true) {
        core.startGroup("send report to slack stage");
        SendReportToSlack();
        core.endGroup();

    }
  } catch (error) {}
}

run();

function SendReportToSlack() {
  console.log("send report to slack");
}
