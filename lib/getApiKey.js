const cheerio = require('cheerio');
const axios = require('axios').default;
const site = 'https://snowfl.com/'
const regex = /findNextItem.*?"(.*?)"/s;

// async function getKeys

async function getApiKey() {
  const jsFileLink = await getJSFileLink();
  if (jsFileLink) {
    const res = await axios.get(jsFileLink);
    const result = res.data.match(regex)[1];
    return result;
  } return null;
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

module.exports = getApiKey;