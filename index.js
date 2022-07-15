const baseURl = 'https://snowfl.com/RIRCDbdSyEmeiBegmhFUyOfBboBuxSddD/';
const isNsfw = {
  yes : 1,
  no : 0
}

class Snowfl {
  constructor(query, sort = Snowfl.sortEnum.NONE) {
    this.query = query;
    this.sort = sort
    this.buildUrl()
  }
  static sortEnum = {
    MAX_SEED: '/DH5kKsJw/0/SEED/NONE/1', // Sort based on more seeds
    MAX_LEECH: '/DH5kKsJw/0/LEECH/NONE/1',
    SIZE_ASC: '/DH5kKsJw/0/SIZE_ASC/NONE/1',
    SIZE_DSC: '/DH5kKsJw/0/SIZE/NONE/1',
    RECENT: '/DH5kKsJw/0/DATE/NONE/1',
    NONE: '/DH5kKsJw/0/NONE/NONE/1'
  };

  buildUrl(query = this.query) {
    const sortEnum = Snowfl.sortEnum;
    if (Object.values(sortEnum).includes(this.sort))
      this.url = `${baseURl}${this.query}${this.sort}`

    else this.url = `${baseURl}${this.query}${sortEnum.NONE}`
  }
}
const sort = Snowfl.sortEnum
module.exports = { Snowfl, sort };