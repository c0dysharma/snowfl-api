const getApiKey = require('./lib/getApiKey');
const axios = require('axios');

const baseURl = 'https://snowfl.com/';

class Snowfl {
  static sortEnum = {
    MAX_SEED: '/DH5kKsJw/0/SEED/NONE/',
    MAX_LEECH: '/DH5kKsJw/0/LEECH/NONE/',
    SIZE_ASC: '/DH5kKsJw/0/SIZE_ASC/NONE/',
    SIZE_DSC: '/DH5kKsJw/0/SIZE/NONE/',
    RECENT: '/DH5kKsJw/0/DATE/NONE/',
    NONE: '/DH5kKsJw/0/NONE/NONE/'
  };

  async parse(query, { sort = Snowfl.sortEnum.NONE, includeNsfw = false } = {}) {
    this.query = query;
    this.sort = sort;
    this.includeNsfw = typeof (includeNsfw) == "boolean" && includeNsfw ? 1 : 0;
    const sortEnum = Snowfl.sortEnum;

    try {
      this.api = await getApiKey();
      if (this.api == null) throw error('Exiting')

      if (Object.values(sortEnum).includes(this.sort))
        this.url = `${baseURl}${this.api}/${this.query}${this.sort}${this.includeNsfw}`
      else this.url = `${baseURl}${this.api}/${this.query}${sortEnum.NONE}${this.includeNsfw}`

      const res = await axios.get(this.url);
      if (res.status != 200) throw Error("Couldn't get data");
      return res.data;

    } catch (error) {
      console.error('Something Went wrong....')
      console.error(error);
    }
  }

}
const Sort = Snowfl.sortEnum
module.exports = { Snowfl, Sort };