const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
  try {
    const src = __dirname
    await exec.exec('npm', ['install']);
    // start testing 
    core.setOutput('start testing', "start testing")
    await exec.exec('npm test')
    await exec.exec('cat test-report.json')
    

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
