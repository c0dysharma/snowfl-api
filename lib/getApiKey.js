const axios = require('axios').default;

const site = 'https://snowfl.com/'
const regexForKey = /findNextItem.*?"(.*?)"/s;
const regexForjs = /((?:b.min.js).*)(?=")/;

// async function getKeys

async function getApiKey() {
  const jsFileLink = await getJSFileLink();
  if (jsFileLink) {
    const res = await axios.get(jsFileLink);
    const result = res.data.match(regexForKey)[1];
    return result;
  } return null;
}

async function getJSFileLink() {
  const res = await axios.get(site);
  const jsFileName = res.data.match(regexForjs)[0];
  return `${site}${jsFileName}`;
}

module.exports = getApiKey;