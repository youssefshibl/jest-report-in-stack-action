const core = require("@actions/core");
const exec = require("@actions/exec");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname,"..","..", "test-report.json");

async function run() {
  let testReport;
  try {
    await exec.exec("npm", ["install"]);

    // start testing
    core.startGroup("Start testing");
    await exec.exec("npm test");
    core.endGroup();
    console.log(filePath);
    await exec.exec("ls")
    await exec.exec("pwd")
    if(fs.existsSync(filePath)){
      console.log("File exists");
    }else{
      console.log("File does not exist");
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
