var through2 = require('through2');
var fs       = require('fs');
var i = 0;
fs.createReadStream('./files/Dockerfile')
.pipe(through2(
    function (chunk, enc, cb) {
      console.log(`${chunk}`);
      console.log('-----------');
      var lineStr;
      //this.push(chunk);
      var line = [];
      var self = this;
      var chunkStr = new Buffer(chunk).toString();
      var lines = chunkStr.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]/g);
      if (i<lines.length)
      this.push(lines[2]);
      console.log(`line ${lines[i]}, lenght = ${lines.length}, i = ${i}`);
      i++;


     if (i === 16)
      cb() }, // transform is a noop
    function (cb) { // flush function
      this.push('tacking on an extra buffer to the end');
      cb();
    }
  ))
  .pipe(fs.createWriteStream('./files/Dockerfile1.copy'));
