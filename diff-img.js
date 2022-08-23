var path = require("path");
var fs = require("fs");
var currentPath = process.cwd();
const outPath = path.join(currentPath, "diff.json");
let i = 0;
// 找出 pre 里面多的图
const pre = fs.readFileSync(
  path.join(currentPath, "code_h5_img.json"),
  "utf-8"
);
const last = fs.readFileSync(path.join(currentPath, "code_h5.json"), "utf-8");
const preText =
  !!pre && pre.toString() ? JSON.parse(pre.toString()) : { list: [] };
const lastText =
  !!last && last.toString() ? JSON.parse(last.toString()) : { list: [] };
var arr = [];
preText.list.forEach(name => {
  if (!lastText.list.includes(name)) {
    arr.push(name);
  }
});
const json = {
  list: [...arr]
};
fs.writeFileSync(outPath, JSON.stringify(json));
