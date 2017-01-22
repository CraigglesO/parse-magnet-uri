"use strict";
const parse_magnet_uri_1 = require("./parse-magnet-uri");
let torrent = parse_magnet_uri_1.parseMagnet('magnet:?xt=urn:btih:74416fe776ca02ca2da20f686fed835e4dcfe84d&dn=Screen+Shot+2017-01-21+at+8.25.15+AM.png&tr=udp%3A%2F%2F0.0.0.0%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com');
console.log(torrent);
let magnet = parse_magnet_uri_1.encodeMagnet(torrent);
console.log(magnet);
