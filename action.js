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

    let filePath= ""
    await exec.exec("pwd", [], {
      listeners: {
        stdout: (data) => {
          filePath += data.toString();
        },
      },
    });
    filePath = path.join(filePath, "test-report.json");   
    await exec.exec(`cat ${filePath}`)

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
