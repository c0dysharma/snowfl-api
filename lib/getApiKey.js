const axios = require('axios').default;

const site = 'https://snowfl.com/';
const regexForKey = /findNextItem.*?"(.*?)"/s;
const regexForjs = /((?:b.min.js).*)(?=")/;

async function getApiKey() {
  try {
    const home = await axios.get(site);
    // get the js file link containing api key
    if(home.status != 200) throw Error('error in fetching homepage');
    const apiKey = home.data.match(regexForjs)[0]
    const jsFileLink = `${site}${apiKey}`;
    
    // get the key iteself out of link
    const res = await axios.get(jsFileLink);
    if (res.status != 200) throw Error('error to fetching js file');
    return res.data.match(regexForKey)[1];

  } catch (error) {
    console.error('Unable to get API key', error);
    return null;
  }
}

module.exports = getApiKey;