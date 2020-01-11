export const defaultDictionary: string[] = [' the', 'and ', ' and', 'ing ', 'the ', ' for', ' to ', 'for ', 'hey ', ' th', 'the', 'nd ', 'and', 'he ', 'ing',
' a ', ' to', ' an', 'ng ', ' fo', 'for', 'er ', 'to ', 'or ', 's a', 'es ', 't t', 'e a', 'y a', ' I ', 'ent', 'ey ', 'r t', ' of', 'ed ',
'res', ' se', 'ire', 'hey', 'e ', ' t', ' a', 'th', 'he', 't ', 's ', 'd ', 'y ', 'r ', 'er', 'in', 're', ' b', 'an', 'nd', ' m', 'o ', ' s',
'or', 'on', ' f', ' c', 'en', 'ng', 'to', 'es', 'a ', '. ', 'se', ' h', ' p', ' w', ' o', 'ti', 'me', 'fo', 'st', 'g ', 've', 'n ', 'le', 'ne',
'li', 'ir', 'ha', ' l', 'nt', 'ar', ' n', 'ed', 'll', 'ea', 'I ', ' i', ', ', 'ou', 'at', 'al', 'om', 'ke', ' I', 'of', 'ro', 'w ', 'mo', 'ot',
'ma', ' e', 'ey', 'as', 'ho', 'be', 'ay', 'us', 'is', 'it', '.↵', 'em', 'rs', 'ce', 'br', 'ra', 'no', ' d', 'ri', 'm ', 'pa', 'el']

export const generateDictionary = (data: string, sLen: number = 5): string[] => {
    let dict: any = []
    const mLen: number = 128
    for (let i = 0; i < data.length - mLen; i++) {
        for (let j = 2; j < sLen; j++) {
            const slot: string = data.substring(i, i + j)
            if (!dict.some((item: any) => item.slot === slot)) {
                dict.push({slot, count: data.split(slot).length - 1})
            }
        }
    }
    dict = dict.sort((a: any, b: any) => a.count > b.count ? -1 : 1)
    if (dict.length > mLen) {
        dict = dict.slice(0, mLen)
            .map((item: any) => item.slot)
            .sort((a: any, b: any) => a.length > b.length ? -1 : 1)
    }
    return dict
}

export const tinyStringCompress = (data: string, dict: string[]): string => {
    let compressed: string = data
    dict.forEach((slot: string, i: number) => {
        compressed = compressed.split(slot).join(String.fromCharCode(128 + i))
    })
    return compressed
}

export const tinyStringDecompress = (data: string, dict: string[]): string => {
    let compressed: string = data
    dict.forEach((slot: string, i: number) => {
        compressed = compressed.split(String.fromCharCode(128 + i)).join(slot)
    })
    return compressed
}
