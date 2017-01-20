# parse-magnet-uri

### Parse a magnet link to something useful for a Bittorent app

Both decoding and encoding are supported.
Simple and fast.
Easy to use.

## Install

``` typescript
npm install parse-magnet-uri
```

## Usage
``` typescript
import { parseMagnet, encodeMagnet } from 'parse-magnet-uri';

let torrent = parseMagnet('insert-magnet-here');
//{ xt:
//   [ 'urn:ed2k:354B15E68FB8F36D7CD88FF94116CDC1',
//     'urn:tree:tiger:7N5OAMRNGMSSEUE3ORHOKWN4WWIQ5X4EBOOTLJY',
//     'urn:btih:QHQXPYWMACKDWKP47RRVIV7VOURXFE5Q' ],
//  xl: 10826029,
//  as: 'http://download.wikimedia.org/mediawiki/1.15/mediawiki-1.15.1.tar.gz',
//  dn: 'mediawiki-1.15.1.tar.gz',
//  kt: null,
//  mt: null,
//  tr: [ 'udp://tracker.openbittorrent.com:80/announce' ],
//  infoHash: 'QHQXPYWMACKDWKP47RRVIV7VOURXFE5Q',
//  infoHashBuffer: <Buffer >,
//  name: 'mediawiki-1.15.1.tar.gz',
//  announce: [ 'udp://tracker.openbittorrent.com:80/announce' ] }

```

Encoding:
``` typescript
let magnet = encodeMagnet(torrent);
```
Result:
```
magnet:?xt=urn:ed2k:354B15E68FB8F36D7CD88FF94116CDC1&xt=urn:tree:tiger:7N5OAMRNGMSSEUE3ORHOKWN4WWIQ5X4EBOOTLJY&xt=urn:btih:QHQXPYWMACKDWKP47RRVIV7VOURXFE5Q&xl=10826029&dn=mediawiki-1.15.1.tar.gz&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&as=http%3A%2F%2Fdownload.wikimedia.org%2Fmediawiki%2F1.15%2Fmediawiki-1.15.1.tar.gz&xs=http%3A%2F%2Fcache.example.org%2FXRX2PEFXOOEJFRVUCX6HMZMKS5TWG4K5&xs=dchub://example.org
```

## ISC License (Open Source Initiative)

ISC License (ISC)
Copyright <2017> <Craig OConnor>
Copyright (c) 2004-2010 by Internet Systems Consortium, Inc. ("ISC")
Copyright (c) 1995-2003 by Internet Software Consortium


Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
