// const { spawnSync } = require("child_process");
// const path = require("path");
//
// const ripper = (text, parsers, opts) => {
//   const child = spawnSync("ruby", [path.join(__dirname, "./ripper.rb")], { input: text });
//
//   const error = child.stderr.toString();
//   if (error) {
//     throw new Error(error);
//   }
//
//   const response = child.stdout.toString();
//   return JSON.parse(response);
// };
//
// module.exports = {
//   parsers: {
//     ruby: {
//       parse: ripper,
//       astFormat: "ruby"
//     }
//   }
// };

module.exports = (text, parsers, opts) => {
  var xhr = new XMLHttpRequest();
  // xhr.open("POST", "http://localhost:8080", false);
  xhr.open("POST", "https://prettier-remote-ast-spike.herokuapp.com/", false);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({
    code: text,
    lang: "ruby",
    opts: opts
  }));

  if (xhr.status === 201) {
    return JSON.parse(xhr.responseText).ast;
  } else if (xhr.status === 422) {
    throw new Error(JSON.parse(xhr.responseText).error);
  } else {
    return new Error("Unexpected server response");
  }
};
