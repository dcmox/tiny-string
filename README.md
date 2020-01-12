# tiny-string
Compress a string down to a smaller length using this library. Use training data to improve the performance depending on the type of data you want to compress.

## Dictionary slot length
When generating a dictionary, you can specify the slot length as the second parameter, eg:
```typescript
let dict = generateDictionary(trainingData, 5) // slot length of 5
```
Note: The larger the slot length, the more computationally expensive it will be for generating a dictionary. If you choose a slot size larger than 6, it is recommended that you cache the dictionary for re-use.

## Dictionary size
You can adjust the dictionary size of this algorithm using the 3rd parameter. Default has been increased from 128 to 896. The first 128 ASCII characters are reserved for the standard character set. String length can be reduced 40-65% with compression. True compression size (total byte size of string) will be much less (even the well known Smaz algorithm fails to note this).

Example:
```typescript
let dict = generateDictionary(trainingData, 6, 2048) // slot length of 6 with 2048 entries and encoding range of 128-2176 (2048+128)
```

## Sample usage
```typescript
const jsonTrainingData: string = `
{"id":1,"name":"Ryan Peterson","country":"Northern Mariana Islands","email":"rpeterson@youspan.mil"},
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
{"id":20,"name":"Henry Hunt","country":"Martinique","email":"hhunt@thoughtstorm.org"}
`

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
console.log('Original length', jsonSample.length + '\n')
console.log('Compressed length', jsonTrainedDictCompression.length + '\n')
```