#!/usr/bin/env node
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
