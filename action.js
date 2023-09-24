const core = require("@actions/core");
const exec = require("@actions/exec");
const { WebClient, LogLevel } = require("@slack/web-api");
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


    core.startGroup("Start upload testing file to slack");
    const SlackToken = core.getInput('slack_token', { required: true });
    const channelId = core.getInput('channel_id', { required: true });

    const client = new WebClient(
        SlackToken
    );
    await client.files.upload({
      channels: channelId,
      initial_comment: "testing file from github repo",
      file: fs.createReadStream("./test-report.json"),
    });
    
    core.endGroup();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
