var plugin  = require('../gulpStream');
var tar     = require('tar-fs');
var through = require('through2');

describe('plugin tests', ()=>{
  it('test micro stream', (done)=>{
      plugin.microStream().on('data', (data)=>{
        console.log('data event in mocah test' + data.history[0]);
      }).on('end', done);
  })
  it.only('test only docker build', (done)=>{
    var path  = require('path');
    var fileDir = path.resolve('./files/');
    var stream = tar.pack(fileDir);
    plugin.buildImage(stream,{image:'test'} , ()=>{
      done();
    });

  })
});
