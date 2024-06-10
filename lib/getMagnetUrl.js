const axios = require('axios').default;
const { FetchError } = require('./errors');

const baseURl = 'https://snowfl.com/';

async function getMagnetUrl(api, item, retries = 3, delayTime = 800) {
  try {
    const { url, site } = item;
    if (!url || !site) throw new Error('Missing required inputs!');
    const encodedUrl = btoa(encodeURIComponent(url));
    const apiUrl = `${baseURl}${api}/${site}/${encodedUrl}`;
    const res = await axios.get(apiUrl);
    if (res.status !== 200) throw new FetchError("Couldn't get Magnet URL");
    return res?.data?.url || '';
  } catch (error) {
    if (error.response && error.response.status === 503 && retries > 0) {
      console.warn(`503 error encountered. Retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, delayTime));
      return getMagnetUrl(api, item, retries - 1, delayTime);
    } else if (error instanceof FetchError) {
      console.error(error.message);
    } else {
      console.error('Unable to get Magnet URL: ', error.message);
    }
    return '';
  }
}

module.exports = getMagnetUrl;
