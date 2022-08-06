# snowfl-api

Unofficial [Snowfl](https://snowfl.com/) API [NPM package](https://www.npmjs.com/package/snowfl-api)

## Installation

```
$ npm install snowfl-api
```

## Usage

***Node.js***

<br>

**Boilerplate code**

```
const { Snowfl, Sort } = require('snowfl-api') // common js
import { Snowfl, Sort } from 'snowfl-api' //ECMAjs

const snowfl = new Snowfl();
```

**Searching Snowfl Site**

```
let res = await snowfl.parse(<Query here>, { <config here> })
// search query must of length >= 2, config object is optional
```

**Configuration- Optional**

```
{
  sort: <Sorting Method>, // optional
  includeNsfw: <bool> // optional
}
```

Avaliable Sorting Methods

```
MAX_SEED // Decreaing number of seed counts
MAX_LEECH // Decreasing number of leech counts
SIZE_ASC // Increasing number of size per file
SIZE_DSC // Decreasing number of size per file
RECENT // Recent shows first
NONE // No sorting (snowfl default) - Default
```

Include NSFW bool

```
true // to include NSFW content
false // only decent content - Default
```

**Return Value**
```
{
  status: <code>,
  message: <message>,
  data: [<array of objects>]
}
```

**Example Search**

```
let res = await snowfl.parse('JoJo', {sort: Sort.MAX_SEED, includeNsfw: false})
```

**Example Responses**
<br>

***Found Something***

```
{
  status: 200,
  message: 'OK',
  data: [
      {
        magnet: 'magnet:?xt=urn:btih:F3B5014A2E048E9286163B3A6A9D95942F3D8F3B&tr=udp%3A%2F%2Ftracker',
        age: '12 months',
        name: 'John Coltrane - Ole Coltrane [V0](Big Papi) Jazz Music',
        size: '86.92 MB',
        seeder: 2,
        leecher: 1,
        type: 'Music',
        site: '****',
        url: 'https://www.*****.info/John-Coltrane--Ole-Coltrane-[V0](Big-Papi)-Jazz-Music-torrent-4500787.html',
        trusted: false,
        nsfw: false
      },
      {
        magnet: 'magnet:?xt=urn:btih:6f1fe981ab6624ef5c235278128c00d1c7ff534e&dn',
        age: '6 years',
        name: 'John Newman Ft. Calvin Harris Ole MP3 Download, 2016',
        size: '9.41 MB',
        seeder: 1,
        leecher: 0,
        type: 'Music',
        site: '****',
        url: 'https://www.****.com/file/2742569/john-newman-ft.-calvin-harris-ole-mp3-download-2016/',
        trusted: false,
        nsfw: false
      }
    ]
}
```

***Nothing found***
```
{ status: 200, message: 'OK', data: [] }
```