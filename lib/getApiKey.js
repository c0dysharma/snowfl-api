const cheerio = require('cheerio');
const axios = require('axios').default;
const site = 'https://snowfl.com/'

// async function getKeys

async function getApiKey() {
  const jsFileLink = await getJSFileLink();
  console.log(jsFileLink);

  if (jsFileLink) {
    const res = await axios.get(jsFileLink);
    const $ = cheerio.load(res.data);
    console.log($.text());
  }
}

async function getJSFileLink() {
  const res = await axios.get(site);
  const $ = cheerio.load(res.data);
  const script = $('script');

  for (let item of script) {
    let link = item.attribs.src;
    if (link.includes('b.min.js'))
      return `${site}${link}`;
  }
  return null;
}


getApiKey()
