var path = require("path");
var fs = require("fs");
var currentPath = process.cwd();
const outPath = path.join(currentPath, "code.json");
let i = 0;
function findFires(pathName) {
  const filenames = fs.readdirSync(pathName);
  var dirs = [];
  filenames.forEach(name => {
    const _data = fs.statSync(path.join(pathName, name));
    if (_data.isFile()) {
      if (name.includes(".png")) {
// 读取 vue
        dirs.push(name);
      }
    }
    if (_data.isDirectory()) {
      findFires(path.join(pathName, name));
    }
  });

  const data = fs.readFileSync(outPath, "utf-8");
  const preText =
    !!data && data.toString() ? JSON.parse(data.toString()) : { list: [] };
  const json = {
    list: [...preText.list, ...dirs]
  };
  fs.writeFileSync(outPath, JSON.stringify(json));
}
findFires(path.join("src"));
