#!/usr/bin/env node
var angular;
try {
	const root = require('child_process').execSync('npm root -g').toString().trim();
	angular = require(root + '/@angular/cli');
} catch (err) {
	console.log("You should install '@angular/cli' global. 'npm i -g @angular/cli'");
	process.exit(1);
}
const fs = require('fs');
const base = process.cwd() + '/src/app/';
const component = 'modules/illustration/';
if (!fs.existsSync(base + component + 'illustration.module.ts')) {
	console.log("Can't find module illustration");
	process.exit(1);
}
const axios = require('axios').default;
const argv = process.argv.slice();
argv.splice(0, 2);
let counter = 0;
const dec = ()=> {
	if (!--counter) {
		console.log('All possible illustrations were added');
		process.exit(1);
	}
};
const add = async illustration => {
	let path = base + component + illustration.name;
	if (!illustration.name || !illustration.html || !illustration.ts) {
		console.log("Icon cannot be used: ", JSON.stringify(illustration));
		return dec();
	}
	await angular.default({
		cliArgs: [
			'generate',
			'component',
			'--export=true',
			component + illustration.name
		]
	}).then(() => {
		console.log('then', arguments);
	}).catch(() => {
		console.log('catch', arguments);
	}).finally(() => {
		console.log('finally', arguments);
		path += '/' + illustration.name +'.component.';
		if (fs.existsSync(path + 'scss')) {
			fs.unlinkSync(path + 'scss')
		}
		if (fs.existsSync(path + 'css')) {
			fs.unlinkSync(path + 'css')
		}
		if (fs.existsSync(path + 'spec.ts')) {
			fs.unlinkSync(path + 'spec.ts')
		}
		if (fs.existsSync(path + 'html')) {
			fs.unlinkSync(path + 'html')
		}
		if (fs.existsSync(path + 'ts')) {
			fs.unlinkSync(path + 'ts')
		}
		fs.writeFileSync(path + 'html', illustration.html, 'utf8');
		fs.writeFileSync(path + 'ts', illustration.ts, 'utf8');
		if (illustration.scss) {
			fs.writeFileSync(path + 'scss', illustration.scss, 'utf8');
		}
		dec();
	});
}

const get = async () => {
	const resp = await axios.post('https://webart.work/api/illustration/list', {
		_ids: argv
	}).catch(err => {
		console.log(err);
		process.exit(1);
	});
	if (resp.data.length) {
		counter = resp.data.length;
		resp.data.forEach(add);
	} else {
		counter = 1;
		dec();
	}
}
get();
