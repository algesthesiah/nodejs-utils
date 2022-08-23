var path = require("path");
var fs = require("fs");
var currentPath = process.cwd();
const outPath = path.join(currentPath, "code10.json");
let i = 0;
function findFires(pathName) {
  const filenames = fs.readdirSync(pathName);
  var dirs = [];
  filenames.forEach(name => {
    const _data = fs.statSync(path.join(pathName, name));
    if (_data.isFile()) {
      if (name.includes(".vue")) {
        const _data = fs.readFileSync(path.join(pathName, name), "utf-8");
        const imgs = _data.match(/[0-9a-z_-）（]*.png/gi);
        // 读取 vue
        imgs &&
          imgs.forEach(v => {
            dirs.push(v);
          });
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
