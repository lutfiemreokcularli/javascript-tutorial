let baseURL = 'https://tr.minticity.com/web/mintibuch/a1/a1-1/meine-familie/seite-1/junior/';

let common = baseURL.split('/').slice(0, -3).join('/') + '/assets/' + 'junior' + '/';

console.log(common)
