const fs = require("fs");
const path = require("path");
const config = require("../../../config.json");

function findPosts(startDir) {
  const res = []
  function iterate(dir) {
    fs.readdirSync(dir)
    .map(post => {
      var realPath = path.resolve(path.join(dir, post));
      if (fs.lstatSync(realPath).isDirectory()) {
        iterate(realPath);
      } else {
        if (post.endsWith(".md")) {
          var newPost = path.join(dir, post);
          newPost = newPost.replace(path.resolve(startDir), "");
          newPost = newPost.replace("\\", "/");
          res.push(newPost);
        }
      }
    });
  }
  iterate(path.resolve(startDir), "");
  console.log(res);
}

const posts = findPosts(config.build.contentDir);

console.log(posts);