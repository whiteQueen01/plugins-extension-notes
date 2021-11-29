const hx = require('hbuilderx');
var dayjs = require('dayjs');

function insertNotes() {
	let editorPromise = hx.window.getActiveTextEditor();
	let config = hx.workspace.getConfiguration()
	let Author = config.get("Author");
	let isLastEdit = config.get("isLastEdit");
	editorPromise.then( async (editor) => {
		let document = editor.document;
		let selection = editor.selection;
		const extname = document.languageId;
		try{
			const line = await document.lineAt(0)
			const line2 = await document.lineAt(1)
			// 判断是否注释过
			if(!line.text.includes('<!--') && !line2.text.includes('*')){
					// 在起始位置添加注释
					selection.start = 0;
					selection.end = 0;
					let fsPath = document.uri.fsPath.split(document.workspaceFolder.name)
					let template = ''
					// 是否取消最后修改的时间和作者
					if(isLastEdit){
						template = [
							`* @Author: ${Author}`,
							`* @Date:  ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
							`* @FilePath: ${fsPath[1].replace(/\\/g, '/')}`,
							"* @Description: In User Settings Edit"
						];
					}else{
						template = [
							`* @Author: ${Author}`,
							`* @Date: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
							`* @LastEditors: ${Author}`,
							`* @LastEditTime: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
							`* @FilePath: ${fsPath[1].replace(/\\/g, '/')}`,
							"* @Description: In User Settings Edit"
						];
					}
					if (extname === "vue" || extname === "html") {
						template.unshift("<!--")
						template.push("-->")
					} else {
						template.unshift("/*")
						template.push("*/")
					};
					let values = template.join("\n");
					editor.edit(editBuilder => {
						editBuilder.insert(0, values + "\n");
					});		
			}
		}catch(e){
			hx.window.showInformationMessage('添加注释异常！请重新尝试！');
		}
	
	});
}

module.exports = {
	insertNotes
};
