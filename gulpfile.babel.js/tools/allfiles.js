exports.getAllFiles = function (dir, callback) {
  var filesArr = [];
  dir = ///$/.test(dir) ? dir : dir + '/';
  (function dir(dirpath, fn) {
    var files = Sys.fs.readdirSync(dirpath);
    exports.async(files, function (item, next) {
      var info = Sys.fs.statSync(dirpath + item);
      if (info.isDirectory()) {
        dir(dirpath + item + '/', function () {
          next();
        });
      } else {
        filesArr.push(dirpath + item);
        callback && callback(dirpath + item);
        next();
      }
    }, function (err) {
      !err && fn && fn();
    });
  })(dir);
  return filesArr;
}