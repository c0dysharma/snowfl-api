const axios = require('axios').default;

const jsFileLink = 'https://snowfl.com/b.min.js';
const regexForKey = /findNextItem.*?"(.*?)"/s;
// const regexForjs = /((?:b.min.js).*)(?=")/;

async function getApiKey() {
  try {
    const res = await axios.get(jsFileLink);
    return res.data.match(regexForKey)[1];
  } catch (error) {
    console.error('Unable to get API key');
    return null;
  }
}

module.exports = getApiKey;