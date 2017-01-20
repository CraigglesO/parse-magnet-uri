// EXAMPLES:
// magnet:?xt=urn:btih:945f2e8866dbe16761f034757c5629ba9b6c66f0&dn=Smolensk.2016.DVDRip.x264-AFO&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969
// magnet:?xt=urn:btih:f170ef7c940838c509e6e86b10fbf51f2f2e0a57&dn=Split+2016+BluRay+HD+x264-LOL&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969
// magnet:?xt=urn:btih:d5254c71fe912bb62c9c0516b9c5a5a7bfa6c84c&dn=Dead.Story.2017.HDRip.XviD.AC3-EVO&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969
// magnet:?xt=urn:btih:b53f3e12cb21ec06f75c585c4f197ae83fdc0e85&dn=ZINDAGI+Zindagi+50+50+Hindi+Song&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969
// magnet:?xt=urn:btih:f65d5f640c8abc2976b20c8d08e01fd1eea2adc4&dn=The+Upright+Thinkers%3A+The+Human+Journey+from+Living+in+Trees+to+&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969
// magnet:?xt=urn:btih:38d81da01f1d582423585a41bd72630b35911e66&dn=Unity+Pro+5.3.4f1+%5BMAC%5D&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969
// magnet:?xt=urn:ed2k:354B15E68FB8F36D7CD88FF94116CDC1&xt=urn:tree:tiger:7N5OAMRNGMSSEUE3ORHOKWN4WWIQ5X4EBOOTLJY&xt=urn:btih:QHQXPYWMACKDWKP47RRVIV7VOURXFE5Q&xl=10826029&dn=mediawiki-1.15.1.tar.gz&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&as=http%3A%2F%2Fdownload.wikimedia.org%2Fmediawiki%2F1.15%2Fmediawiki-1.15.1.tar.gz&xs=http%3A%2F%2Fcache.example.org%2FXRX2PEFXOOEJFRVUCX6HMZMKS5TWG4K5&xs=dchub://example.org

import { Buffer } from 'buffer';
import { uniq }   from 'lodash';

interface Magnet {
  xt:             string | Array<string> // xt (Exact Topic) – URN containing file hash
  xl:             number                 // xl (Exact Length) – Size in bytes
  as:             string                 // as (Acceptable Source) – Web link to the file online
  dn:             string                 // dn (Display Name) – Filename
  kt:             Array<string>          // kt (Keyword Topic) – Key words for search
  mt:             string                 // mt (Manifest Topic) – link to the metafile that contains a list of magneto (MAGMA – MAGnet MAnifest)
  tr:             Array<string>          // tr (Address Tracker) – Tracker URL for BitTorrent downloads
  infoHash:       string                 // Same as xt
  infoHashBuffer: Buffer
  name:           string
  announce:       Array<string>
}


function parseMagnet(magnet: string): Magnet {
  let result = {
    xt: [],
    xl: null,
    as: null,
    dn: null,
    kt: null,
    mt: null,
    tr: [],
    infoHash: null,
    infoHashBuffer: null,
    name: null,
    announce: []
  };

  let info     = magnet.split('magnet:?')[1],
      params   = (info.length) ? info.split('&') : [],
      trackers = [];

  params.forEach((param) => {
    if (param.substring(0,2) === 'xt') {
      result['xt'].push( param.slice(3) );
      if (param.substring(3,12) === 'urn:btih:') {
        result['infoHash'] = param.slice(12);
      }
    } else if (param.substring(0,2) === 'dn') {
      result['dn']   = urlDecode( param.slice(3) );
      result['name'] = result['dn'];
    } else if (param.substring(0,2) === 'tr') {
      trackers.push( urlDecode(param.slice(3)) )
    } else if (param.substring(0,2) === 'xl') {
      result['xl'] = Number( param.slice(3) );
    } else if (param.substring(0,2) === 'as') {
      result['as'] = urlDecode( param.slice(3) );
    } else if (param.substring(0,2) === 'kt') {
      result['kt'] = param.slice(3);
      result['kt'] = result['kt'].split('+');
    } else if (param.substring(0,2) === 'mt') {
      result['mt'] = urlDecode( param.slice(3) );
    }
  });

  if (result['xt'].length === 1)
    result['xt'] = result['xt'][0];

  trackers                 = uniq(trackers);
  result['tr']             = trackers;
  result['announce']       = trackers;
  result['infoHashBuffer'] = Buffer.from(result['infoHash'], 'hex');

  return result;
}

function encodeMagnet(magnet: Magnet): string {
  return '';
}

function urlDecode(url) {
  url = url.replace(/\+/g, ' ');
  url = url.replace(/%3A/g, ':');
  url = url.replace(/%2F/g, '/');
  url = url.replace(/%21/g, '!');
  url = url.replace(/%23/g, '#');
  url = url.replace(/%24/g, '$');
  url = url.replace(/%26/g, '&');
  url = url.replace(/%27/g, '\'');
  url = url.replace(/%28/g, '(');
  url = url.replace(/%29/g, ')');
  url = url.replace(/%2A/g, '*');
  url = url.replace(/%2B/g, '+');
  url = url.replace(/%2C/g, ',');
  url = url.replace(/%2F/g, '/');
  url = url.replace(/%3A/g, ':');
  url = url.replace(/%3B/g, ';');
  url = url.replace(/%3D/g, '=');
  url = url.replace(/%3F/g, '?');
  url = url.replace(/%40/g, '@');
  url = url.replace(/%5B/g, '[');
  url = url.replace(/%5D/g, ']');
  return url;
}

export { parseMagnet, encodeMagnet }
