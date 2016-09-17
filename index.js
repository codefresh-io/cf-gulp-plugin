var stream = require('stream');
var util = require('util');
var from = require('from')
var request = require('request')
  , JSONStream = require('JSONStream')


var d = new Date(1472996901);
console.log(d);
process.exit(1);


// node v0.10+ use native Transform, else polyfill
var Transform = stream.Transform


function Upper(options) {
  // allow use without new
  if (!(this instanceof Upper)) {
    return new Upper(options);
  }

  // init Transform
  Transform.call(this, options);
}
util.inherits(Upper, Transform);

Upper.prototype._transform = function (chunk, enc, cb) {
  //var upperChunk = chunk.toString().toUpperCase();
  this.push(JSON.stringify(testData));
  //while(true);
  cb();
};

var through = require('through')

var stream1=through(function write(data) {
    this.queue(data) //data *must* not be null
  },
  function end () { //optional
    this.queue(null)
  })
var testData = {"total_rows":129,"offset":0,"rows":[
  { "id":"change1_0.6995461115147918"
  , "key":"change1_0.6995461115147918"
  , "value":{"rev":"1-e240bae28c7bb3667f02760f6398d508"}
  , "doc":{
      "_id":  "change1_0.6995461115147918"
    , "_rev": "1-e240bae28c7bb3667f02760f6398d508","hello":1}
  },
  { "id":"change2_0.6995461115147918"
  , "key":"change2_0.6995461115147918"
  , "value":{"rev":"1-13677d36b98c0c075145bb8975105153"}
  , "doc":{
      "_id":"change2_0.6995461115147918"
    , "_rev":"1-13677d36b98c0c075145bb8975105153"
    , "hello":2
    }
  },
]};

var stream =
  from(function getChunk(count, next) {
    //do some sort of data
    this.emit('data',
     "testData"
  )
    i++;
    if(i === 10)
      this.emit('end')

    //ready to handle the next chunk
    next();
    //or, if it's sync:
  //  return true;
  })

// try it out
var upper = new Upper();
var stream2 = JSONStream.parse(['rows', true, 'doc'], (value)=>{
  console.log(value);
});

 stream.pipe(upper).pipe(stream2).pipe(process.stdout)// output to stdout

//upper.write('hello world\n  '); // input line 1
//upper.write('another line');  // input line 2
//upper.end();

var i = 0;
setTimeout(()=>{
  console.log('timeout ' + i);
  i++;
}, 1000);
