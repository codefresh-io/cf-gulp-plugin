var gulp = require('gulp');
var gulpBuild = require('./gulpStream');
const tar = require('gulp-tar');
var through = require('through2');
var fs      = require('fs');
var util    = require('util');
var _       = require('lodash');
const gzip  = require('gulp-gzip');

gulp.task('default1', function(){
    gulp.src('./*Dock').pipe(tar('./archive.tar')).pipe(gulp.dest('./files/')).pipe(gulpBuild({image:'verchol', tag:'latest'}))
});

/*




*/

gulp.task('default', function(){
    gulp.src('**/*Dockerfile*')/*.pipe(tar('archive1.tar')).pipe(through.obj(function stream(chunk ,enc, cb){

      console.log(`is stream ${_.get(chunk, 'isStream()')} , is buffer ${_.get(chunk, 'isBuffer()')}`);
      console.log(`${util.format(chunk)}`);
      console.log(`history  - ${chunk.history}`);

      var test = {name : chunk.history};

      this.push(chunk);
      cb();

    }))*/.pipe(gulpBuild({image:'verchol', tag:'latest'}));//.pipe(gulp.dest('output'))

    //.pipe(fs.createWriteStream('./files/out.txt'))

});

/*
.pipe(through((chunk ,enc, cb)=>{
  console.log('called');
  cb();

}) )
*/
