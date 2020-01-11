import assert from 'assert'
import * as testSuite from '../tiny-string'

const jsonTrainingData = `
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

const jsonSample = `{"id":33,"name":"John Doe","country":"United States","email":"bob@blah.org"}`

describe('tiny-string test suite', () => {
    it('should compress and decompress a string correctly', () => {
        const jsonTrainedDictionary = testSuite.generateDictionary(jsonTrainingData)
        const compressed = testSuite.tinyStringCompress(jsonSample, jsonTrainedDictionary)
        const decompressed = testSuite.tinyStringDecompress(compressed, jsonTrainedDictionary)
        assert.equal(jsonSample, decompressed, 'Decompressed string does not match!')
        assert.equal(compressed.length < jsonSample.length, true, 'Compression did not work!')
    })
})
