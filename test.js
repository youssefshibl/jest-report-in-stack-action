// check if file exist in directory
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'test.txt');
if (fs.existsSync(filePath)) {
  console.log('File exists');
}   