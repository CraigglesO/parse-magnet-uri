"use strict";
const buffer_1 = require("buffer");
const lodash_1 = require("lodash");
function parseMagnet(magnet) {
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
    let info = magnet.split('magnet:?')[1], params = (info.length) ? info.split('&') : [], trackers = [];
    params.forEach((param) => {
        if (param.substring(0, 2) === 'xt') {
            result['xt'].push(param.slice(3));
            if (param.substring(3, 12) === 'urn:btih:') {
                result['infoHash'] = param.slice(12);
            }
        }
        else if (param.substring(0, 2) === 'dn') {
            result['dn'] = urlDecode(param.slice(3));
            result['name'] = result['dn'];
        }
        else if (param.substring(0, 2) === 'tr') {
            trackers.push(urlDecode(param.slice(3)));
        }
        else if (param.substring(0, 2) === 'xl') {
            result['xl'] = Number(param.slice(3));
        }
        else if (param.substring(0, 2) === 'as') {
            result['as'] = urlDecode(param.slice(3));
        }
        else if (param.substring(0, 2) === 'kt') {
            result['kt'] = param.slice(3);
            result['kt'] = result['kt'].split('+');
        }
        else if (param.substring(0, 2) === 'mt') {
            result['mt'] = urlDecode(param.slice(3));
        }
    });
    if (result['xt'].length === 1)
        result['xt'] = result['xt'][0];
    trackers = lodash_1.uniq(trackers);
    result['tr'] = trackers;
    result['announce'] = trackers;
    result['infoHashBuffer'] = buffer_1.Buffer.from(result['infoHash'], 'hex');
    return result;
}
exports.parseMagnet = parseMagnet;
function encodeMagnet(magnet) {
    return '';
}
exports.encodeMagnet = encodeMagnet;
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
