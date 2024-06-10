const getApiKey = require('./lib/getApiKey');
const getMagnetUrl = require('./lib/getMagnetUrl');
const { ApiError, FetchError } = require('./lib/errors');
const axios = require('axios');

const baseURl = 'https://snowfl.com/';

class Snowfl {
  // Optional args to sort data
  static sortEnum = {
    MAX_SEED: '/DH5kKsJw/0/SEED/NONE/',
    MAX_LEECH: '/DH5kKsJw/0/LEECH/NONE/',
    SIZE_ASC: '/DH5kKsJw/0/SIZE_ASC/NONE/',
    SIZE_DSC: '/DH5kKsJw/0/SIZE/NONE/',
    RECENT: '/DH5kKsJw/0/DATE/NONE/',
    NONE: '/DH5kKsJw/0/NONE/NONE/'
  };

  async parse(query, { sort = Snowfl.sortEnum.NONE, includeNsfw = false, forceFetchMagnet = false } = {}) {
    this.query = query;
    this.sort = sort;
    this.includeNsfw = typeof (includeNsfw) == "boolean" && includeNsfw ? 1 : 0;
    const sortEnum = Snowfl.sortEnum;

    try {
      if (this.query.length <= 2) throw new FetchError('Query should be of length >= 3');
      this.api = await getApiKey(); // get the apiKey from helper function
      if (this.api == null) throw new ApiError()

      if (Object.values(sortEnum).includes(this.sort)) // check if invalid sorting option
        this.url = `${baseURl}${this.api}/${this.query}${this.sort}${this.includeNsfw}`
      else this.url = `${baseURl}${this.api}/${this.query}${sortEnum.NONE}${this.includeNsfw}` // revert to default- NONE

      const res = await axios.get(this.url);
      if (res.status != 200) throw new FetchError("Couldn't get data");
      const { data } = res;

      if (forceFetchMagnet && data && data.length) {
        const updatedData = await Promise.all(data.map(async item => {
          if (item.magnet) return item;
          const magnet = await getMagnetUrl(this.api, item);
          return { ...item, magnet };
        }));

        return { status: 200, message: 'OK', data: updatedData };
      }

      return { status: 200, message: 'OK', data: res.data }; // returns Object data

    } catch (error) {
      if (error instanceof FetchError || error instanceof axios.AxiosError) {
        console.error('Something Went wrong....')
        console.error(error.message);
      }
      return { status: 400, message: error.message, data: undefined };
    }
  }

}
const Sort = Snowfl.sortEnum
module.exports = { Snowfl, Sort };