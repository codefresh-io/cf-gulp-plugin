
var     through = require('through2');
var JSONStream  = require('json-stream');
var _           = require('lodash');
var util        = require('util');
var build = require('docker-build')


function buildImage(tar, data, done){

  var Docker = require('dockerode');
  var docker = new Docker();
   console.log(`tar file - ${util.format(tar)} , image  : ${data.image}`);

   docker.buildImage(tar, {t: data.image}, function (err, stream){
          if (err)
            throw err;
          var jsonStream = JSONStream();  //jshint ignore:line
          stream.pipe(jsonStream);
          jsonStream.on('data', function(data) {console.log(data);});
          stream.on('end', ()=>{
            console.log('build ended');
            done(err, tar);
          });
        });
}

function tar(folder){
  var tar = require('tar-fs');
  var fs = require('fs');
  return tar.pack(folder);
}

function NoopPlugin(file, encoding, done) {
    debugger;
    console.log(`is stream ${_.get(file, 'isStream()')} , is buffer ${_.get(file, 'isBuffer()')}`);
    console.log(`file - ${util.format(file)}`);
    console.log(`image - ${util.format(this)}`);

    var b = new Buffer('test line');
    var b1 = new Buffer('test line1');
    var buffer = Buffer.concat([b, b1]);


    //this.push(JSON.stringify(file));
    var fs =  require('fs');
    //file.history
    var path  = require('path');
    //var filePath = path.resolve(file.history[0]);


     return buildImage(file, this, done);

    //tar(file).pipe(buildImage()).on('end', done);

};
var printStream = function(){
  return through.obj((chunk, enconding , done)=>{
       console.log('print chunk');
       console.log(`${JSON.stringify(chunk.history[0])}`);
       done(null, chunk);

  })
}
function gulpPlugin(image, tag){
  var self = {}
  self = image;

     return printStream();
    //return tar('./output/archive2.tar')

    /*.pipe(through.obj(NoopPlugin.bind(self), (cb)=>{
         cb();

    })).on('data', function (data) {

  })*/
}

module.exports = gulpPlugin;
