const Sheet = require('./sheet')
const fetch = require('node-fetch');

async function scrapePage(i) {
  const res = await fetch(`https://jobs.github.com/positions.json?page=${i}search=code`)
  const json = await res.json();

  const rows = json.map(job => {
    return {
      company: job.company,
      title: job.title,
      location: job.location,
      date: job.created_at,
      url: job.url
    }
  })

  return rows;
}

(async function () {
  let i = 1;
  let rows = [];
  while (true) {
    const newRows = await scrapePage(i);
    console.log('new row length', newRows.length);
    if (newRows.length === 0) break;
    // rows = [...rows, ...newRows];
    rows = rows.concat(newRows);
    i++;
  }
  const nRows = rows.filter((job) => job.title.toLowerCase().includes('javascript')).sort((a, b) => (new Date(b.date) - new Date(a.date)))
  console.log('total rows length', nRows);
  const sheet = new Sheet();
  await sheet.load();
  await sheet.addRows(nRows)
})()