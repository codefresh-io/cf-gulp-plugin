
var     through = require('through2');
var JSONStream  = require('json-stream');
var _           = require('lodash');
var util        = require('util');
const path      = require('path');
var gulpTar     = require('gulp-tar');
var tar         = require('tar-fs');
var gulp        = require('gulp');
var debug       = require('debug')('cf-gulp-plugin');
const gzip      = require('gulp-gzip');
const assert    = require('assert');


var all = {}
all.buildImage = function (fileDir, data, done){
  debugger;
  debug('start building docker image');
  var Docker = require('dockerode');
  var docker = new Docker();

  console.log(`image  : ${data.image}`);
  var image = 'test';
  var s  = tar.pack(fileDir);

   docker.buildImage(s, {t: image}, function (err, stream){
          if (err){
             debug(`Error occured during build ${err}`)
             throw err;
          }
          console.log('start building image , stream recieved');
          var jsonStream = JSONStream();  //jshint ignore:line
          stream.pipe(jsonStream);
          jsonStream.on('data', function(data) {
            console.log(data);
            if (data.errorDetail){
                var errStr = JSON.stringify(data);
                throw errStr;
            }
          });
          stream.on('error', (err)=>{
            console.log(`build error occured ${err}`);
            throw err;
            done(err, tar);
          });
          stream.on('end', ()=>{
            console.log('build ended');
            done(null, tar);
          });
        });
}

function tar(folder){
  var tar = require('tar-fs');
  var fs = require('fs');
  return tar.pack(folder);
}

all.buildStream = function(file, encoding, done) {
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


     return all.buildImage(file, {image:'test'}, ()=>{
       done(null, file);
     });

    //tar(file).pipe(buildImage()).on('end', done);

};
all.tarStream = function(chunk, enconding , done){
  var filePath = chunk.history[0];
  var fileDir = path.dirname(filePath);
  tar(fileDir).on('end', ()=>{

    done(null, fileDir);
  })

}
var i=0;
all.microStream = function(root){
  var microService;
  var streams = [];

  return through.obj((chunk, enconding , done)=>{
            console.log('print chunk');
            var filePath = chunk.history[0];
            var fileDir = path.dirname(filePath);

            debug(`micro service dir is : ${fileDir}`  + fileDir);
            i++;
              //var dest = path.resolve('./output/'  + archive);
              var imageName = 'image' + i;

              all.buildImage(fileDir, {image: imageName} , ()=>{
                console.log('image was built');
                //this.push(fileDir);
                done(null, fileDir);
              });


            });

}
all.printStream = function(){
  return through.obj((chunk, enconding , done)=>{
       console.log('print chunk');
       console.log(`${JSON.stringify(chunk.history[0])}`);
       var filePath = chunk.history[0];
       var fileDir = path.dirname(filePath);
       done(null, chunk);

  })
}
all.Plugin = function(image, tag){
  var self = {}
  self = image;

     return all.microStream().on('end', ()=>{
       console.log('micro stream end');
     })
     /*printStream().gulpTar(pipe(through.obj(DockerPlugin.bind(self), (cb)=>{
         cb();

    })).on('data', function (data) {

  })*/
}


module.exports = all;
