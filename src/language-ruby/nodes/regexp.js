const { concat, group, indent, softline } =  require("../../doc").builders;
const { makeList } = require("../utils");

module.exports = {
  regexp: makeList,
  regexp_literal: (path, opts, print) => {
    const [contents, ending] = path.map(print, "body");
    const useBraces = contents.some(content => typeof content === "string" && content.includes("/"));

    return concat([
      useBraces ? "%r{" : "/",
      ...contents,
      useBraces ? "}" : "/",
      ending.slice(1)
    ]);
  }
};
