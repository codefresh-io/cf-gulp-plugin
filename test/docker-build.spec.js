var Docker = require('dockerode');
var tar    = require('tar-fs');

debugger;
describe('docker build', ()=>{
  var docker = new Docker();
  it('docker build ', (done)=>{

     var path  = require('path');
     var tarPath = path.resolve('./files/');
     console.log(tarPath);
     var tarStream = tar.pack(tarPath);

     docker.buildImage(tarStream, {
        t: 'imgcwd'
      }, (error, output) =>{
        output.pipe(process.stdout);
        output.on('end', done);
      });
  })


})
