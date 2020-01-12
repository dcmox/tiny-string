/* MIT License

Copyright (c) 2020 Daniel Moxon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

export const defaultDictionary: string[] = [' the', 'and ', ' and', 'ing ', 'the ', ' for', ' to ', 'for ', 'hey ', ' th', 'the', 'nd ', 'and', 'he ', 'ing',
' a ', ' to', ' an', 'ng ', ' fo', 'for', 'er ', 'to ', 'or ', 's a', 'es ', 't t', 'e a', 'y a', ' I ', 'ent', 'ey ', 'r t', ' of', 'ed ',
'res', ' se', 'ire', 'hey', 'e ', ' t', ' a', 'th', 'he', 't ', 's ', 'd ', 'y ', 'r ', 'er', 'in', 're', ' b', 'an', 'nd', ' m', 'o ', ' s',
'or', 'on', ' f', ' c', 'en', 'ng', 'to', 'es', 'a ', '. ', 'se', ' h', ' p', ' w', ' o', 'ti', 'me', 'fo', 'st', 'g ', 've', 'n ', 'le', 'ne',
'li', 'ir', 'ha', ' l', 'nt', 'ar', ' n', 'ed', 'll', 'ea', 'I ', ' i', ', ', 'ou', 'at', 'al', 'om', 'ke', ' I', 'of', 'ro', 'w ', 'mo', 'ot',
'ma', ' e', 'ey', 'as', 'ho', 'be', 'ay', 'us', 'is', 'it', '.↵', 'em', 'rs', 'ce', 'br', 'ra', 'no', ' d', 'ri', 'm ', 'pa', 'el']

/* Larger dictionary size means better true compression. */
export const generateDictionary = (data: string, sLen: number = 6, MBYTES: number = 896): string[] => {
    let dict: any = []
    for (let i = 0; i < data.length - sLen; i++) {
        for (let j = 2; j < sLen; j++) {
            const slot: string = data.substring(i, i + j)
            if (!dict.some((item: any) => item.slot === slot)) {
                dict.push({slot, count: data.split(slot).length - 1})
            }
        }
    }
    dict = dict.sort((a: any, b: any) => a.count > b.count ? -1 : 1)
    if (dict.length > MBYTES) { dict = dict.slice(0, MBYTES) }
    dict = dict.map((item: any) => item.slot).sort((a: any, b: any) => a.length > b.length ? -1 : 1)
    return dict
}

export const trueByteSize = (data: string): number =>
    encodeURI(data).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1

export const tinyStringCompress = (data: string, dict: string[] = defaultDictionary): string => {
    let compressed: string = data
    dict.forEach((slot: string, i: number) => {
        compressed = compressed.split(slot).join(String.fromCharCode(i + 128))
    })
    return compressed
}

export const tinyStringDecompress = (data: string, dict: string[] = defaultDictionary): string => {
    let compressed: string = data
    dict.forEach((slot: string, i: number) => {
        compressed = compressed.split(String.fromCharCode(i + 128)).join(slot)
    })
    return compressed
}
