const getApiKey = require('./lib/getApiKey');
const axios = require('axios');
const baseURl = 'https://snowfl.com/';

class Snowfl {
  static sortEnum = {
    MAX_SEED: '/DH5kKsJw/0/SEED/NONE/', // Sort based on more seeds
    MAX_LEECH: '/DH5kKsJw/0/LEECH/NONE/',
    SIZE_ASC: '/DH5kKsJw/0/SIZE_ASC/NONE/',
    SIZE_DSC: '/DH5kKsJw/0/SIZE/NONE/',
    RECENT: '/DH5kKsJw/0/DATE/NONE/',
    NONE: '/DH5kKsJw/0/NONE/NONE/'
  };

  async parse(query, { sort = Snowfl.sortEnum.NONE, isNsfw = false } = {}) {
    this.query = query;
    this.sort = sort;
    this.isNsfw = isNsfw ? 1 : 0;
    this.api = this.api ? this.api : await getApiKey();

    const sortEnum = Snowfl.sortEnum;
    if (Object.values(sortEnum).includes(this.sort))
      this.url = `${baseURl}${this.api}/${this.query}${this.sort}${this.isNsfw}`
    else this.url = `${baseURl}${this.api}/${this.query}${sortEnum.NONE}${this.isNsfw}`

    const res = await axios.get(this.url);
    return res.data;
  }

}
const Sort = Snowfl.sortEnum
module.exports = { Snowfl, Sort };