var Bacon = require('baconjs');

var stream = Bacon.fromArray([1,2,3,4,5]).map((value)=>{
  console.log('map->' + value);
  return value++;
});

stream.onValue((value)=>{
  console.log("!!!" + value);});
