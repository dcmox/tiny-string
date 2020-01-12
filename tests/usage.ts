import { generateDictionary, tinyStringCompress, tinyStringDecompress, trueByteSize } from '../tiny-string'

// Post from https://www.reddit.com/r/AskReddit/comments/emqd57/what_brand_are_you_loyal_to_and_why/
const trainingData: string = `
Petzl.
Extremely well-made life support equipment. They are the masters of caving equipment, even though they center their brand on rock climbers now a days (selling to climbers == $$$)). They don't use cheap materials for accessory components like Black Diamond does.
I also really like Raumer for their bolt hangers and bolting hammers.
As a rock climber (bringing them those $$$) I totally agree. You can tell they have a history of work equipment production, the gear is really sturdy and just makes you trust it, compared to other climbing brands (like BD) that try to be the bleeding edge make everything flashy and whatnot. You pay a lot for their sponsorships as well and the end result, at least for hobby climber like me, makes no difference.
Patagonia. I ripped a pair of long johns after ~5 years of wearing them, so I sent them in. Patagonia no longer made that style of Capilene anymore, so instead of sending me a new pair they sent me my money back. I took that money and bought a new fleece. I have sent them jackets with holes and broken zippers and they come back fixed within a few weeks. Phenomenal customer service.
I broke a brand new fiskars axe because I was beating on it with a sledge. Emailed them a picture and said I probably got a little too frisky with the sledge and not to worry about sending a new one, just to maybe advertise that the product shouldn’t be used for heavy wood splitting. I had a new axe delivered in under a month, no questions asked.
It’s not a brand per se, but there is a tire place in my hometown called Just Tires who I will forever sing the praises of. My mom has those expensive “low profile” tires. She went there once wanting to buy two then come back next payday and buy the next two because she couldn’t afford to buy all four. Now the owner sees her tires and they are BAD. He says he cannot in good conscience let my mom drive on bad tires and let’s get pay for two but take all four, trusting her to come back and pay for both. (Which she did)

Fast forward a month and it’s my turn to get tires and he gives me a quote for his cheapest brand. He finds out that he missed the sale of the cheap brand and didn’t have more, puts the GOOD tires on my car and sells them to me for the price he originally told me I’d pay.

I’m always going to go there for new tires.

Edit: removed “crappy” from description of my moms low profile tires. They aren’t crappy themselves but bad for the area we live in. We have too many potholes around for that. Esto 2: the particular shop I went to is in Huntington West Virginia for everyone asking. I can’t reply to everyone asking lol.
`

const redditPost: string = `I just spent about $3000 surgically removing a big ball of WTF from my Maine coon! Came home with a dozen staples down his belly and immediately started trying to eat the plastic wrap I just pulled off his medication bottles. Moron. I’m sorry your kitty didn’t make it. Being stupidly suicidal seems to be a breed characteristic!`

const trainedDictionary: string[] = generateDictionary(trainingData)
console.time('trainedDict')
const trainedDictCompression: string = tinyStringCompress(redditPost, trainedDictionary)
console.timeEnd('trainedDict')

console.time('trainedDict decompress')
const trainedDictDecompression: string = tinyStringDecompress(trainedDictCompression, trainedDictionary)
console.timeEnd('trainedDict decompress')

console.log('Original:', redditPost + '\n')
console.log('Decompressed', trainedDictDecompression + '\n')
console.log('Compressed:', trainedDictCompression,
    Number((1 - trainedDictCompression.length / redditPost.length) * 100).toFixed(2) + '% compressed' + '\n')
console.log('Original length', redditPost.length)
console.log('Compressed length', trainedDictCompression.length)
/* JavaScript .length gets number of characters, not the actual byte size! Each char can be between 1-4 bytes */
console.log('Byte size', trueByteSize(trainedDictCompression))
console.log('==========================================================================================')

const jsonTrainingData: string = `{"id":1,"name":"Ryan Peterson","country":"Northern Mariana Islands","email":"rpeterson@youspan.mil"},
{"id":2,"name":"Judith Mason","country":"Puerto Rico","email":"jmason@quatz.com"},
{"id":3,"name":"Kenneth Berry","country":"Pakistan","email":"kberry@wordtune.mil"},
{"id":4,"name":"Judith Ortiz","country":"Cuba","email":"jortiz@snaptags.edu"},
{"id":5,"name":"Adam Lewis","country":"Poland","email":"alewis@muxo.mil"},
{"id":6,"name":"Angela Spencer","country":"Poland","email":"aspencer@jabbersphere.info"},
{"id":7,"name":"Jason Snyder","country":"Cambodia","email":"jsnyder@voomm.net"},
{"id":8,"name":"Pamela Palmer","country":"Guinea-Bissau","email":"ppalmer@rooxo.name"},
{"id":9,"name":"Mary Graham","country":"Niger","email":"mgraham@fivespan.mil"},
{"id":10,"name":"Christopher Brooks","country":"Trinidad and Tobago","email":"cbrooks@blogtag.name"},
{"id":11,"name":"Anna West","country":"Nepal","email":"awest@twinte.gov"},
{"id":12,"name":"Angela Watkins","country":"Iceland","email":"awatkins@izio.com"},
{"id":13,"name":"Gregory Coleman","country":"Oman","email":"gcoleman@browsebug.net"},
{"id":14,"name":"Andrew Hamilton","country":"Ukraine","email":"ahamilton@rhyzio.info"},
{"id":15,"name":"James Patterson","country":"Poland","email":"jpatterson@skippad.net"},
{"id":16,"name":"Patricia Kelley","country":"Papua New Guinea","email":"pkelley@meetz.biz"},
{"id":17,"name":"Annie Burton","country":"Germany","email":"aburton@linktype.com"},
{"id":18,"name":"Margaret Wilson","country":"Saudia Arabia","email":"mwilson@brainverse.mil"},
{"id":19,"name":"Louise Harper","country":"Poland","email":"lharper@skinder.info"},
{"id":20,"name":"Henry Hunt","country":"Martinique","email":"hhunt@thoughtstorm.org"}`

const jsonSample: string = `{"id":33,"name":"John Doe","country":"United States","email":"bob@blah.org"}`

const jsonTrainedDictionary: string[] = generateDictionary(jsonTrainingData)
console.time('JSON trainedDict')
const jsonTrainedDictCompression: string = tinyStringCompress(jsonSample, jsonTrainedDictionary)
console.timeEnd('JSON trainedDict')

console.time('JSON trainedDict decompress')
const jsonTrainedDictDecompression: string = tinyStringDecompress(jsonTrainedDictCompression, jsonTrainedDictionary)
console.timeEnd('JSON trainedDict decompress')

console.log('Original:', redditPost + '\n')
console.log('Decompressed', jsonTrainedDictDecompression + '\n')
console.log('Compressed:', jsonTrainedDictCompression,
    Number((1 - jsonTrainedDictCompression.length / jsonSample.length) * 100).toFixed(2) + '% compressed' + '\n')
console.log('Original length', jsonSample.length)
console.log('Compressed length', jsonTrainedDictCompression.length)
/* JavaScript .length gets number of characters, not the actual byte size! Each char can be between 1-4 bytes */
console.log('Byte size', trueByteSize(jsonTrainedDictCompression))
