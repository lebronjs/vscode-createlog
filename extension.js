// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(
        'Congratulations, your extension "testytest123" is now active!'
    );
    console.log(vscode.workspace.workspaceFolders);
    const folderPath = vscode.workspace.workspaceFolders[0].uri
        .toString()
        .split(':')[1];

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        'testytest.createlog',
        function () {
            // The code you place here will be executed every time your command is executed
            const time = moment().format('H:mm:ss');
            fs.writeFile(
                path.join(folderPath, `log-${time}.txt`),
                '请输入日志：',
                function (err) {
                    if (err) {
                        console.error(err);
                        return vscode.window.showInformationMessage(
                            'Failed to create log file'
                        );
                    }
                    vscode.window.showInformationMessage(
                        `created ${`log-${time}.txt`}`
                    );
                }
            );
            // Display a message box to the user
        }
    );

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
