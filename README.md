![Untitled-2023-08-22-1534](https://github.com/youssefshibl/jest-report-in-stack-action/assets/63800183/0da18e01-0768-4966-a63e-064db821846a)

# Jest-js Report In Slack Action

this is custome action to run test and generate json report and upload it to slack

## Usage

how use this action in your workflow yml file

```yaml
- name: express-jest-slack-my-action
  uses: youssefshibl/jest-report-in-stack-action@main
  with:
    slack_token: ${{ secrets.slack_token }}
    channel_id: ${{ secrets.slack_channel_id}}
```

#### How get slack_token && channel_id

- got to `https://api.slack.com/apps` and make your app
- see this video `https://www.youtube.com/watch?v=h94FK8h1OJU` to can get token and set permissions to this token , then get id of channel and dont forget invite this app in your channel

### Example

in this project i make sample file to test it in `testing` directory and make `one.test.js` which contain

```js
test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});
```

dont forget to add test command in scripts in package.json

```json
{
  "scripts": {
    "test": "jest --json > test-report.json"
  }
}
```

your workflow file will be like this for example

```yaml
name: express-jest-report-slack

on:
  push:
    branches: [main]

jobs:

  test1:
    runs-on: ubuntu-latest
    name: express-jest-slack
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js 16
        uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: express-jest-slack-my-action
        uses: youssefshibl/jest-report-in-stack-action@main
        with:
          slack_token: ${{ secrets.slack_token }}
          channel_id: ${{ secrets.slack_channel_id}}

```
after you push your commit the workflow will be run and the result will be like this
![Screenshot from 2023-09-24 23-06-20](https://github.com/youssefshibl/jest-report-in-stack-action/assets/63800183/c109b9ce-7b9a-46a1-a935-ad2962882806)
![Screenshot from 2023-09-24 23-09-24](https://github.com/youssefshibl/jest-report-in-stack-action/assets/63800183/2db9d233-86d8-4bef-a332-a3589936eada)

test file will be like this 
```json
{
  "numFailedTestSuites": 0,
  "numFailedTests": 0,
  "numPassedTestSuites": 1,
  "numPassedTests": 1,
  "numPendingTestSuites": 0,
  "numPendingTests": 0,
  "numRuntimeErrorTestSuites": 0,
  "numTodoTests": 0,
  "numTotalTestSuites": 1,
  "numTotalTests": 1,
  "openHandles": [],
  "snapshot": {
    "added": 0,
    "didUpdate": false,
    "failure": false,
    "filesAdded": 0,
    "filesRemoved": 0,
    "filesRemovedList": [],
    "filesUnmatched": 0,
    "filesUpdated": 0,
    "matched": 0,
    "total": 0,
    "unchecked": 0,
    "uncheckedKeysByFile": [],
    "unmatched": 0,
    "updated": 0
  },
  "startTime": 1695579401482,
  "success": true,
  "testResults": [
    {
      "assertionResults": [
        {
          "ancestorTitles": [],
          "duration": 3,
          "failureDetails": [],
          "failureMessages": [],
          "fullName": "adds 1 + 2 to equal 3",
          "invocations": 1,
          "location": null,
          "numPassingAsserts": 1,
          "retryReasons": [],
          "status": "passed",
          "title": "adds 1 + 2 to equal 3"
        }
      ],
      "endTime": 1695579401879,
      "message": "",
      "name": "/home/runner/work/jest-report-in-stack-action/jest-report-in-stack-action/testing/one.test.js",
      "startTime": 1695579401513,
      "status": "passed",
      "summary": ""
    }
  ],
  "wasInterrupted": false
}
```
