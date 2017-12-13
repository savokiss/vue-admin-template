
var gulp = require('gulp')
var fs = require('fs')
var os = require('os')
var SSH = require('gulp-ssh')
var path = require('path')

const DIR_NAME = 'your/dir/here'

// 测试环境
var sshConfig = {
  host: 'you.host.here',
  port: 22,
  username: 'www',
  privateKey: fs.readFileSync(path.resolve(os.homedir(), '.ssh/id_rsa'))
}

var gulpSSH = new SSH({
  ignoreErrors: false,
  sshConfig: sshConfig
})

// 上传测试服务器
gulp.task('upload:test', function () {
  return gulp.src('./dist/**/*.*')
    .pipe(gulpSSH.dest(`/data/www/${DIR_NAME}/`))
})
