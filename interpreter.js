
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '../temp/input.txt');
const EXEC_PATH = path.join(__dirname, '../interpreter/lsbasi_exec');

function runInterpreter(code, callback) {
    fs.writeFileSync(INPUT_FILE, code, 'utf8');

    exec(`${EXEC_PATH} ${INPUT_FILE}`, (err, stdout, stderr) => {
        if (err) {
            return callback(`Execution error: ${stderr}`, null);
        }
        return callback(null, stdout);
    });
}

module.exports = { runInterpreter };
