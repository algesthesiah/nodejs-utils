var path = require('path');
var fs = require('fs');
var currentPath = process.cwd();
const outPath = path.join(currentPath, 'del.json');
let i = 0;
const data = fs.readFileSync(outPath, 'utf-8');
const preText = !!data && data.toString() ? JSON.parse(data.toString()) : { list: [] };
function findFires(pathName) {
  const filenames = fs.readdirSync(pathName);
  var dirs = [];
  filenames.forEach(name => {
    const _data = fs.statSync(path.join(pathName, name));
    if (_data.isFile()) {
      if (name.includes('.png')) {
        dirs.push(name);
        if (preText.list.includes(name)) {
          fs.unlink(path.join(pathName, name), function (error) {
            if (error) {
              console.log(error);
              return false;
            }
          });
        }
      }
    }
    if (_data.isDirectory()) {
      findFires(path.join(pathName, name));
    }
  });
}
findFires(path.join('h5'));
