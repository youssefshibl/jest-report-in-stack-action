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

    core.startGroup("send report to slack stage");
    await exec.exec("ls");
    core.endGroup();

  } catch (error) {
    core.setFailed(error.message);
  }

  core.startGroup("test");
  await exec.exec("ls");
  core.endGroup()
}

run();
