const { rejects } = require("assert");
const { execSync, spawn, exec, execFile } = require("child_process");
const fs = require("fs");
const { resolve } = require("path");
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

async function executor(language, code, input) {
    const filename = "files/language" + generateString(5)
    var outputParams = {
        status: "init",
        stdout: ""
    }

    fs.writeFile(filename, code, err => {
        if (err) {
            console.log(err)
        }
    })

    switch (language) {
        case "python":
            {
                try {
                    const result = await new Promise((resolve, reject) => {
                        try {
                            var process = execFile("python3", [filename], (error, stdout, stderr) => {
                                if (error) {
                                    outputParams.status = "fail"
                                    console.log(stderr)
                                    resolve(error)
                                } else if (stderr) {
                                    outputParams.status = "fail"
                                    console.log(stderr)
                                    resolve(stderr)
                                } else {
                                    outputParams.status = "success"
                                    console.log(outputParams.stdout)
                                    resolve(stdout)
                                }
                            })
                            process.stdin.write(input)
                            process.stdin.end()
                        } catch (err) {
                            outputParams.status = "fail"
                        }
                    })
                    outputParams.stdout = result.toString();
                } catch (err) {
                    outputParams.status = "fail"
                    console.log(err)
                }
                break;
            }
        default:
            {
                outputParams.status = "fail"
            }
    }

    return outputParams
}

module.exports = { executor }