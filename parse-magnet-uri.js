"use strict";
const buffer_1 = require("buffer");
const lodash_1 = require("lodash");
function parseMagnet(magnet) {
    let result = {
        xt: [],
        xl: null,
        as: null,
        xs: [],
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
        else if (param.substring(0, 2) === 'xs') {
            result['xs'].push(urlDecode(param.slice(3)));
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
    if (result['xs'].length === 0)
        result['xs'] = null;
    else if (result['xs'].length === 1)
        result['xs'] = result['xs'][0];
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
    let input = [];
    if (magnet.xt) {
        if (Array.isArray(magnet.xt)) {
            magnet.xt.forEach((x) => {
                input.push('xt=' + x);
            });
        }
        else {
            input.push('xt=' + magnet.xt);
        }
    }
    if (magnet.xl) {
        input.push('xl=' + magnet.xl.toString());
    }
    if (magnet.as) {
        input.push('as=' + urlEncode(magnet.as));
    }
    if (magnet.dn) {
        input.push('dn=' + urlEncode(magnet.dn));
    }
    if (magnet.kt) {
        input.push('kt=' + magnet.kt.join('+'));
    }
    if (magnet.mt) {
        input.push('mt=' + urlEncode(magnet.mt));
    }
    if (magnet.tr) {
        magnet.tr.forEach((tr) => {
            input.push('tr=' + urlEncode(tr));
        });
    }
    if (magnet.infoHash) {
        input.push('xt=' + 'urn:btih:' + magnet.infoHash);
    }
    if (magnet.name) {
        input.push('dn=' + urlEncode(magnet.dn));
    }
    if (magnet.announce) {
        magnet.announce.forEach((tr) => {
            input.push('tr=' + urlEncode(tr));
        });
    }
    if (magnet.xs) {
        if (Array.isArray(magnet.xs)) {
            magnet.xs.forEach((s) => {
                input.push('xs=' + urlEncode(s));
            });
        }
        else {
            input.push('xs=' + urlEncode(magnet.xs));
        }
    }
    input = lodash_1.uniq(input);
    let result = input.join('&');
    result = 'magnet:?' + result;
    return result;
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
    url = url.replace(/%3A/g, ':');
    url = url.replace(/%3B/g, ';');
    url = url.replace(/%3D/g, '=');
    url = url.replace(/%3F/g, '?');
    url = url.replace(/%40/g, '@');
    url = url.replace(/%5B/g, '[');
    url = url.replace(/%5D/g, ']');
    return url;
}
function urlEncode(url) {
    url = url.replace(/\ /g, '+');
    url = url.replace(/\:/g, '%3A');
    url = url.replace(/\//g, '%2F');
    url = url.replace(/\!/g, '%21');
    url = url.replace(/\#/g, '%23');
    url = url.replace(/\$/g, '%24');
    url = url.replace(/\&/g, '%26');
    url = url.replace(/\'/g, '%27');
    url = url.replace(/\(/g, '%28');
    url = url.replace(/\)/g, '%29');
    url = url.replace(/\*/g, '%2A');
    url = url.replace(/\+/g, '%2B');
    url = url.replace(/\,/g, '%2C');
    url = url.replace(/\:/g, '%3A');
    url = url.replace(/\;/g, '%3B');
    url = url.replace(/\=/g, '%3D');
    url = url.replace(/\?/g, '%3F');
    url = url.replace(/\@/g, '%40');
    url = url.replace(/\[/g, '%5B');
    url = url.replace(/\]/g, '%5B');
    return url;
}
