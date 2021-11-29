var hx = require("hbuilderx");
var insertNotes = require('./api/insert_notes.js');
var fnNotes = require('./api/funtion_notes.js');
var updateNotes = require('./api/update_notes.js');

//该方法将在插件激活的时候调用
function activate(context) {
	let insert = hx.commands.registerCommand('extension.insert', () => {
		insertNotes.insertNotes();
	});
	let functionNotes = hx.commands.registerCommand('extension.functionNotes', () => {
		fnNotes.fnNotes();
	});
	let willSaveTextDocumentEventDispose = hx.workspace.onWillSaveTextDocument(function(event){
	      updateNotes.updateNotes()
	  });
	//订阅销毁钩子，插件禁用的时候，自动注销该command。
	context.subscriptions.push(insert);
	context.subscriptions.push(functionNotes);
	context.subscriptions.push(willSaveTextDocumentEventDispose);
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
	activate,
	deactivate
}
