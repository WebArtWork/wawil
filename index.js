#!/usr/bin/env node
const fs = require('fs');
function getfiles (dir, files){
	files = files || [];
	var allFiles = fs.readdirSync(dir);
	for (var i =0; i<allFiles.length; i++){
		var name = dir + '/' + allFiles[i];
		if (fs.statSync(name).isDirectory()){
			getfiles (name, files);
		} else {
			  files.push(name);
		}
	}
	return files;
};
if (getfiles (".//").indexOf(".//src") == -1) {
	console.log("Function not found");
	process.exit(1);
}
if (getfiles (".//src/app/modules/").indexOf(".//src/app/modules//icons/icons.module.ts") == -1) {
	console.log("No icons module");
	process.exit(1);
}

const axios = require('axios').default;
const argv = process.argv.slice();
argv.splice(0,2);

const get = async ()=>{
	console.log('get');
	const resp = await axios.post('http://localhost:8080/api/illustration/list', {
		_ids: argv
	}).catch(err => {
		console.log(err);
		process.exit(1);
	});
	console.log('end', resp.data);
	process.exit(1);
}
get();
console.log(argv);
