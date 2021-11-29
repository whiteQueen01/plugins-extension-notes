let hx = require('hbuilderx');

function fnNotes() {
	let editorPromise = hx.window.getActiveTextEditor();
	let config = hx.workspace.getConfiguration()
	let Author = config.get("Author");
	editorPromise.then(async (editor) => {
		let document = editor.document;
		let selection = editor.selection;
		const extname = document.languageId;
		if(extname !== "vue" && extname !== "javascript_es6") {
			return;
		}
		let lineSelection = await document.lineFromPosition(selection.anchor)
		let fnLine = await document.lineAt(lineSelection.lineNumber+1)
        let template = [
				"/**",
				"* @description: ",
				"* @param {*}",
				"* @return: {*}",
				`* @author: ${Author}`,
				"*/"
		];
        let values = template.join("\n" + lineSelection.text);
		editor.edit(editBuilder => {
			editBuilder.insert(selection, values);
		});		
	});	
}

module.exports = {
	fnNotes
};
