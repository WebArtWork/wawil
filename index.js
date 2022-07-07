#!/usr/bin/env node
const argv = process.argv.slice();
argv.splice(0,2);

async function postData(url = '', data = []) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: data
    });
    return response;
}
console.log(postData('http://localhost:8080/api/illustration/list', argv));

console.log(argv);
process.exit(1);