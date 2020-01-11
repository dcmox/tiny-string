"use strict";
exports.__esModule = true;
exports.defaultDictionary = [' the', 'and ', ' and', 'ing ', 'the ', ' for', ' to ', 'for ', 'hey ', ' th', 'the', 'nd ', 'and', 'he ', 'ing',
    ' a ', ' to', ' an', 'ng ', ' fo', 'for', 'er ', 'to ', 'or ', 's a', 'es ', 't t', 'e a', 'y a', ' I ', 'ent', 'ey ', 'r t', ' of', 'ed ',
    'res', ' se', 'ire', 'hey', 'e ', ' t', ' a', 'th', 'he', 't ', 's ', 'd ', 'y ', 'r ', 'er', 'in', 're', ' b', 'an', 'nd', ' m', 'o ', ' s',
    'or', 'on', ' f', ' c', 'en', 'ng', 'to', 'es', 'a ', '. ', 'se', ' h', ' p', ' w', ' o', 'ti', 'me', 'fo', 'st', 'g ', 've', 'n ', 'le', 'ne',
    'li', 'ir', 'ha', ' l', 'nt', 'ar', ' n', 'ed', 'll', 'ea', 'I ', ' i', ', ', 'ou', 'at', 'al', 'om', 'ke', ' I', 'of', 'ro', 'w ', 'mo', 'ot',
    'ma', ' e', 'ey', 'as', 'ho', 'be', 'ay', 'us', 'is', 'it', '.↵', 'em', 'rs', 'ce', 'br', 'ra', 'no', ' d', 'ri', 'm ', 'pa', 'el'];
exports.generateDictionary = function (data, sLen) {
    if (sLen === void 0) { sLen = 5; }
    var dict = [];
    var mLen = 128;
    for (var i = 0; i < data.length - mLen; i++) {
        var _loop_1 = function (j) {
            var slot = data.substring(i, i + j);
            if (!dict.some(function (item) { return item.slot === slot; })) {
                dict.push({ slot: slot, count: data.split(slot).length - 1 });
            }
        };
        for (var j = 2; j < sLen; j++) {
            _loop_1(j);
        }
    }
    dict = dict.sort(function (a, b) { return a.count > b.count ? -1 : 1; });
    if (dict.length > mLen) {
        dict = dict.slice(0, mLen)
            .map(function (item) { return item.slot; })
            .sort(function (a, b) { return a.length > b.length ? -1 : 1; });
    }
    return dict;
};
exports.tinyStringCompress = function (data, dict) {
    var compressed = data;
    dict.forEach(function (slot, i) {
        compressed = compressed.split(slot).join(String.fromCharCode(128 + i));
    });
    return compressed;
};
exports.tinyStringDecompress = function (data, dict) {
    var compressed = data;
    dict.forEach(function (slot, i) {
        compressed = compressed.split(String.fromCharCode(128 + i)).join(slot);
    });
    return compressed;
};
