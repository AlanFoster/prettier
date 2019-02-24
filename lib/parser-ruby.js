(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ruby"] = factory();
	else
		root["prettierPlugins"] = root["prettierPlugins"] || {}, root["prettierPlugins"]["ruby"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  builders: __webpack_require__(2),
  printer: __webpack_require__(6),
  utils: __webpack_require__(16),
  debug: __webpack_require__(17)
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _require$builders = __webpack_require__(0).builders,
    breakParent = _require$builders.breakParent,
    concat = _require$builders.concat,
    hardline = _require$builders.hardline,
    lineSuffix = _require$builders.lineSuffix;

var concatBody = function concatBody(path, opts, print) {
  return concat(path.map(print, "body"));
};

var empty = function empty() {
  return "";
};

var first = function first(path, opts, print) {
  return path.call(print, "body", 0);
};

var literal = function literal(value) {
  return function () {
    return value;
  };
};

var makeCall = function makeCall(path, opts, print) {
  var operation = path.getValue().body[1];

  if ([".", "&."].includes(operation)) {
    return operation;
  }

  return operation === "::" ? "." : path.call(print, "body", 1);
};

var makeList = function makeList(path, opts, print) {
  return path.map(print, "body");
};

var prefix = function prefix(value) {
  return function (path, opts, print) {
    return concat([value, path.call(print, "body", 0)]);
  };
};

var printComments = function printComments(printed, start, comments) {
  var node = printed;
  comments.forEach(function (comment) {
    if (comment.start < start) {
      node = concat([comment.break ? breakParent : "", comment.body, hardline, node]);
    } else {
      node = concat([node, comment.break ? breakParent : "", lineSuffix(" ".concat(comment.body))]);
    }
  });
  return node;
};

var skipAssignIndent = function skipAssignIndent(node) {
  return ["array", "hash", "heredoc", "regexp_literal"].includes(node.type) || node.type === "call" && skipAssignIndent(node.body[0]) || node.type === "string_literal" && node.body[0].type === "heredoc";
};

var surround = function surround(left, right) {
  return function (path, opts, print) {
    return concat([left, path.call(print, "body", 0), right]);
  };
};

module.exports = {
  concatBody: concatBody,
  empty: empty,
  first: first,
  literal: literal,
  makeCall: makeCall,
  makeList: makeList,
  prefix: prefix,
  printComments: printComments,
  skipAssignIndent: skipAssignIndent,
  surround: surround
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function assertDoc(val) {
  /* istanbul ignore if */
  if (!(typeof val === "string" || val != null && typeof val.type === "string")) {
    throw new Error("Value " + JSON.stringify(val) + " is not a valid document");
  }
}

function concat(parts) {
  if (false) {
    parts.forEach(assertDoc);
  } // We cannot do this until we change `printJSXElement` to not
  // access the internals of a document directly.
  // if(parts.length === 1) {
  //   // If it's a single document, no need to concat it.
  //   return parts[0];
  // }


  return {
    type: "concat",
    parts: parts
  };
}

function indent(contents) {
  if (false) {
    assertDoc(contents);
  }

  return {
    type: "indent",
    contents: contents
  };
}

function align(n, contents) {
  if (false) {
    assertDoc(contents);
  }

  return {
    type: "align",
    contents: contents,
    n: n
  };
}

function group(contents, opts) {
  opts = opts || {};

  if (false) {
    assertDoc(contents);
  }

  return {
    type: "group",
    id: opts.id,
    contents: contents,
    break: !!opts.shouldBreak,
    expandedStates: opts.expandedStates
  };
}

function dedentToRoot(contents) {
  return align(-Infinity, contents);
}

function markAsRoot(contents) {
  return align({
    type: "root"
  }, contents);
}

function dedent(contents) {
  return align(-1, contents);
}

function conditionalGroup(states, opts) {
  return group(states[0], Object.assign(opts || {}, {
    expandedStates: states
  }));
}

function fill(parts) {
  if (false) {
    parts.forEach(assertDoc);
  }

  return {
    type: "fill",
    parts: parts
  };
}

function ifBreak(breakContents, flatContents, opts) {
  opts = opts || {};

  if (false) {
    if (breakContents) {
      assertDoc(breakContents);
    }

    if (flatContents) {
      assertDoc(flatContents);
    }
  }

  return {
    type: "if-break",
    breakContents: breakContents,
    flatContents: flatContents,
    groupId: opts.groupId
  };
}

function lineSuffix(contents) {
  if (false) {
    assertDoc(contents);
  }

  return {
    type: "line-suffix",
    contents: contents
  };
}

var lineSuffixBoundary = {
  type: "line-suffix-boundary"
};
var breakParent = {
  type: "break-parent"
};
var trim = {
  type: "trim"
};
var line = {
  type: "line"
};
var softline = {
  type: "line",
  soft: true
};
var hardline = concat([{
  type: "line",
  hard: true
}, breakParent]);
var literalline = concat([{
  type: "line",
  hard: true,
  literal: true
}, breakParent]);
var cursor = {
  type: "cursor",
  placeholder: Symbol("cursor")
};

function join(sep, arr) {
  var res = [];

  for (var i = 0; i < arr.length; i++) {
    if (i !== 0) {
      res.push(sep);
    }

    res.push(arr[i]);
  }

  return concat(res);
}

function addAlignmentToDoc(doc, size, tabWidth) {
  var aligned = doc;

  if (size > 0) {
    // Use indent to add tabs for all the levels of tabs we need
    for (var i = 0; i < Math.floor(size / tabWidth); ++i) {
      aligned = indent(aligned);
    } // Use align for all the spaces that are needed


    aligned = align(size % tabWidth, aligned); // size is absolute from 0 and not relative to the current
    // indentation, so we use -Infinity to reset the indentation to 0

    aligned = align(-Infinity, aligned);
  }

  return aligned;
}

module.exports = {
  concat: concat,
  join: join,
  line: line,
  softline: softline,
  hardline: hardline,
  literalline: literalline,
  group: group,
  conditionalGroup: conditionalGroup,
  fill: fill,
  lineSuffix: lineSuffix,
  lineSuffixBoundary: lineSuffixBoundary,
  cursor: cursor,
  breakParent: breakParent,
  ifBreak: ifBreak,
  trim: trim,
  indent: indent,
  align: align,
  addAlignmentToDoc: addAlignmentToDoc,
  markAsRoot: markAsRoot,
  dedentToRoot: dedentToRoot,
  dedent: dedent
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(4);

var print = __webpack_require__(5);

module.exports = {
  languages: [{
    name: "Ruby",
    parsers: ["ruby"],
    extensions: [".rb", ".rake", ".gemspec"],
    linguistLanguageId: 303,
    vscodeLanguageIds: ["ruby"]
  }],
  parsers: {
    ruby: {
      parse: parse,
      astFormat: "ruby"
    }
  },
  printers: {
    ruby: {
      print: print
    }
  },
  options: {
    addTrailingCommas: {
      type: "boolean",
      category: "Global",
      default: false,
      description: "Adds a trailing comma to array literals, hash literals, and method calls."
    },
    inlineConditionals: {
      type: "boolean",
      category: "Global",
      default: true,
      description: "When it fits on one line, allows if and unless statements to use the modifier form."
    },
    inlineLoops: {
      type: "boolean",
      category: "Global",
      default: true,
      description: "When it fits on one line, allows while and until statements to use the modifier form."
    },
    preferHashLabels: {
      type: "boolean",
      category: "Global",
      default: true,
      description: "When possible, uses the shortened hash key syntax, as opposed to hash rockets."
    },
    preferSingleQuotes: {
      type: "boolean",
      category: "Global",
      default: true,
      description: "When double quotes are not necessary for interpolation, prefers the use of single quotes for string literals."
    }
  },
  defaultOptions: {
    printWidth: 80,
    tabWidth: 2
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

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
module.exports = function (text, parsers, opts) {
  var xhr = new XMLHttpRequest(); // xhr.open("POST", "http://localhost:8080", false);

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var _require$builders = __webpack_require__(0).builders,
    breakParent = _require$builders.breakParent,
    concat = _require$builders.concat,
    hardline = _require$builders.hardline,
    lineSuffix = _require$builders.lineSuffix;

var _require = __webpack_require__(1),
    printComments = _require.printComments;

var nodes = __webpack_require__(18);

module.exports = function (path, opts, print) {
  var _path$getValue = path.getValue(),
      type = _path$getValue.type,
      body = _path$getValue.body,
      comments = _path$getValue.comments,
      start = _path$getValue.start;

  if (type in nodes) {
    var printed = nodes[type](path, opts, print);

    if (comments) {
      return printComments(printed, start, comments);
    }

    return printed;
  }

  if (type[0] === "@") {
    return body;
  }

  throw new Error("Unsupported node encountered: ".concat(type, "\n").concat(JSON.stringify(body, null, 2)));
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(7),
    getStringWidth = _require.getStringWidth;

var _require2 = __webpack_require__(15),
    convertEndOfLineToChars = _require2.convertEndOfLineToChars;

var _require3 = __webpack_require__(2),
    concat = _require3.concat,
    fill = _require3.fill,
    cursor = _require3.cursor;
/** @type {{[groupId: PropertyKey]: MODE}} */


var groupModeMap;
var MODE_BREAK = 1;
var MODE_FLAT = 2;

function rootIndent() {
  return {
    value: "",
    length: 0,
    queue: []
  };
}

function makeIndent(ind, options) {
  return generateInd(ind, {
    type: "indent"
  }, options);
}

function makeAlign(ind, n, options) {
  return n === -Infinity ? ind.root || rootIndent() : n < 0 ? generateInd(ind, {
    type: "dedent"
  }, options) : !n ? ind : n.type === "root" ? Object.assign({}, ind, {
    root: ind
  }) : typeof n === "string" ? generateInd(ind, {
    type: "stringAlign",
    n: n
  }, options) : generateInd(ind, {
    type: "numberAlign",
    n: n
  }, options);
}

function generateInd(ind, newPart, options) {
  var queue = newPart.type === "dedent" ? ind.queue.slice(0, -1) : ind.queue.concat(newPart);
  var value = "";
  var length = 0;
  var lastTabs = 0;
  var lastSpaces = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = queue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var part = _step.value;

      switch (part.type) {
        case "indent":
          flush();

          if (options.useTabs) {
            addTabs(1);
          } else {
            addSpaces(options.tabWidth);
          }

          break;

        case "stringAlign":
          flush();
          value += part.n;
          length += part.n.length;
          break;

        case "numberAlign":
          lastTabs += 1;
          lastSpaces += part.n;
          break;

        /* istanbul ignore next */

        default:
          throw new Error("Unexpected type '".concat(part.type, "'"));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  flushSpaces();
  return Object.assign({}, ind, {
    value: value,
    length: length,
    queue: queue
  });

  function addTabs(count) {
    value += "\t".repeat(count);
    length += options.tabWidth * count;
  }

  function addSpaces(count) {
    value += " ".repeat(count);
    length += count;
  }

  function flush() {
    if (options.useTabs) {
      flushTabs();
    } else {
      flushSpaces();
    }
  }

  function flushTabs() {
    if (lastTabs > 0) {
      addTabs(lastTabs);
    }

    resetLast();
  }

  function flushSpaces() {
    if (lastSpaces > 0) {
      addSpaces(lastSpaces);
    }

    resetLast();
  }

  function resetLast() {
    lastTabs = 0;
    lastSpaces = 0;
  }
}

function trim(out) {
  if (out.length === 0) {
    return 0;
  }

  var trimCount = 0; // Trim whitespace at the end of line

  while (out.length > 0 && typeof out[out.length - 1] === "string" && out[out.length - 1].match(/^[ \t]*$/)) {
    trimCount += out.pop().length;
  }

  if (out.length && typeof out[out.length - 1] === "string") {
    var trimmed = out[out.length - 1].replace(/[ \t]*$/, "");
    trimCount += out[out.length - 1].length - trimmed.length;
    out[out.length - 1] = trimmed;
  }

  return trimCount;
}

function fits(next, restCommands, width, options, mustBeFlat) {
  var restIdx = restCommands.length;
  var cmds = [next]; // `out` is only used for width counting because `trim` requires to look
  // backwards for space characters.

  var out = [];

  while (width >= 0) {
    if (cmds.length === 0) {
      if (restIdx === 0) {
        return true;
      }

      cmds.push(restCommands[restIdx - 1]);
      restIdx--;
      continue;
    }

    var x = cmds.pop();
    var ind = x[0];
    var mode = x[1];
    var doc = x[2];

    if (typeof doc === "string") {
      out.push(doc);
      width -= getStringWidth(doc);
    } else {
      switch (doc.type) {
        case "concat":
          for (var i = doc.parts.length - 1; i >= 0; i--) {
            cmds.push([ind, mode, doc.parts[i]]);
          }

          break;

        case "indent":
          cmds.push([makeIndent(ind, options), mode, doc.contents]);
          break;

        case "align":
          cmds.push([makeAlign(ind, doc.n, options), mode, doc.contents]);
          break;

        case "trim":
          width += trim(out);
          break;

        case "group":
          if (mustBeFlat && doc.break) {
            return false;
          }

          cmds.push([ind, doc.break ? MODE_BREAK : mode, doc.contents]);

          if (doc.id) {
            groupModeMap[doc.id] = cmds[cmds.length - 1][1];
          }

          break;

        case "fill":
          for (var _i = doc.parts.length - 1; _i >= 0; _i--) {
            cmds.push([ind, mode, doc.parts[_i]]);
          }

          break;

        case "if-break":
          {
            var groupMode = doc.groupId ? groupModeMap[doc.groupId] : mode;

            if (groupMode === MODE_BREAK) {
              if (doc.breakContents) {
                cmds.push([ind, mode, doc.breakContents]);
              }
            }

            if (groupMode === MODE_FLAT) {
              if (doc.flatContents) {
                cmds.push([ind, mode, doc.flatContents]);
              }
            }

            break;
          }

        case "line":
          switch (mode) {
            // fallthrough
            case MODE_FLAT:
              if (!doc.hard) {
                if (!doc.soft) {
                  out.push(" ");
                  width -= 1;
                }

                break;
              }

              return true;

            case MODE_BREAK:
              return true;
          }

          break;
      }
    }
  }

  return false;
}

function printDocToString(doc, options) {
  groupModeMap = {};
  var width = options.printWidth;
  var newLine = convertEndOfLineToChars(options.endOfLine);
  var pos = 0; // cmds is basically a stack. We've turned a recursive call into a
  // while loop which is much faster. The while loop below adds new
  // cmds to the array instead of recursively calling `print`.

  var cmds = [[rootIndent(), MODE_BREAK, doc]];
  var out = [];
  var shouldRemeasure = false;
  var lineSuffix = [];

  while (cmds.length !== 0) {
    var x = cmds.pop();
    var ind = x[0];
    var mode = x[1];
    var _doc = x[2];

    if (typeof _doc === "string") {
      out.push(_doc);
      pos += getStringWidth(_doc);
    } else {
      switch (_doc.type) {
        case "cursor":
          out.push(cursor.placeholder);
          break;

        case "concat":
          for (var i = _doc.parts.length - 1; i >= 0; i--) {
            cmds.push([ind, mode, _doc.parts[i]]);
          }

          break;

        case "indent":
          cmds.push([makeIndent(ind, options), mode, _doc.contents]);
          break;

        case "align":
          cmds.push([makeAlign(ind, _doc.n, options), mode, _doc.contents]);
          break;

        case "trim":
          pos -= trim(out);
          break;

        case "group":
          switch (mode) {
            case MODE_FLAT:
              if (!shouldRemeasure) {
                cmds.push([ind, _doc.break ? MODE_BREAK : MODE_FLAT, _doc.contents]);
                break;
              }

            // fallthrough

            case MODE_BREAK:
              {
                shouldRemeasure = false;
                var next = [ind, MODE_FLAT, _doc.contents];
                var rem = width - pos;

                if (!_doc.break && fits(next, cmds, rem, options)) {
                  cmds.push(next);
                } else {
                  // Expanded states are a rare case where a document
                  // can manually provide multiple representations of
                  // itself. It provides an array of documents
                  // going from the least expanded (most flattened)
                  // representation first to the most expanded. If a
                  // group has these, we need to manually go through
                  // these states and find the first one that fits.
                  if (_doc.expandedStates) {
                    var mostExpanded = _doc.expandedStates[_doc.expandedStates.length - 1];

                    if (_doc.break) {
                      cmds.push([ind, MODE_BREAK, mostExpanded]);
                      break;
                    } else {
                      for (var _i2 = 1; _i2 < _doc.expandedStates.length + 1; _i2++) {
                        if (_i2 >= _doc.expandedStates.length) {
                          cmds.push([ind, MODE_BREAK, mostExpanded]);
                          break;
                        } else {
                          var state = _doc.expandedStates[_i2];
                          var cmd = [ind, MODE_FLAT, state];

                          if (fits(cmd, cmds, rem, options)) {
                            cmds.push(cmd);
                            break;
                          }
                        }
                      }
                    }
                  } else {
                    cmds.push([ind, MODE_BREAK, _doc.contents]);
                  }
                }

                break;
              }
          }

          if (_doc.id) {
            groupModeMap[_doc.id] = cmds[cmds.length - 1][1];
          }

          break;
        // Fills each line with as much code as possible before moving to a new
        // line with the same indentation.
        //
        // Expects doc.parts to be an array of alternating content and
        // whitespace. The whitespace contains the linebreaks.
        //
        // For example:
        //   ["I", line, "love", line, "monkeys"]
        // or
        //   [{ type: group, ... }, softline, { type: group, ... }]
        //
        // It uses this parts structure to handle three main layout cases:
        // * The first two content items fit on the same line without
        //   breaking
        //   -> output the first content item and the whitespace "flat".
        // * Only the first content item fits on the line without breaking
        //   -> output the first content item "flat" and the whitespace with
        //   "break".
        // * Neither content item fits on the line without breaking
        //   -> output the first content item and the whitespace with "break".

        case "fill":
          {
            var _rem = width - pos;

            var parts = _doc.parts;

            if (parts.length === 0) {
              break;
            }

            var content = parts[0];
            var contentFlatCmd = [ind, MODE_FLAT, content];
            var contentBreakCmd = [ind, MODE_BREAK, content];
            var contentFits = fits(contentFlatCmd, [], _rem, options, true);

            if (parts.length === 1) {
              if (contentFits) {
                cmds.push(contentFlatCmd);
              } else {
                cmds.push(contentBreakCmd);
              }

              break;
            }

            var whitespace = parts[1];
            var whitespaceFlatCmd = [ind, MODE_FLAT, whitespace];
            var whitespaceBreakCmd = [ind, MODE_BREAK, whitespace];

            if (parts.length === 2) {
              if (contentFits) {
                cmds.push(whitespaceFlatCmd);
                cmds.push(contentFlatCmd);
              } else {
                cmds.push(whitespaceBreakCmd);
                cmds.push(contentBreakCmd);
              }

              break;
            } // At this point we've handled the first pair (context, separator)
            // and will create a new fill doc for the rest of the content.
            // Ideally we wouldn't mutate the array here but coping all the
            // elements to a new array would make this algorithm quadratic,
            // which is unusable for large arrays (e.g. large texts in JSX).


            parts.splice(0, 2);
            var remainingCmd = [ind, mode, fill(parts)];
            var secondContent = parts[0];
            var firstAndSecondContentFlatCmd = [ind, MODE_FLAT, concat([content, whitespace, secondContent])];
            var firstAndSecondContentFits = fits(firstAndSecondContentFlatCmd, [], _rem, options, true);

            if (firstAndSecondContentFits) {
              cmds.push(remainingCmd);
              cmds.push(whitespaceFlatCmd);
              cmds.push(contentFlatCmd);
            } else if (contentFits) {
              cmds.push(remainingCmd);
              cmds.push(whitespaceBreakCmd);
              cmds.push(contentFlatCmd);
            } else {
              cmds.push(remainingCmd);
              cmds.push(whitespaceBreakCmd);
              cmds.push(contentBreakCmd);
            }

            break;
          }

        case "if-break":
          {
            var groupMode = _doc.groupId ? groupModeMap[_doc.groupId] : mode;

            if (groupMode === MODE_BREAK) {
              if (_doc.breakContents) {
                cmds.push([ind, mode, _doc.breakContents]);
              }
            }

            if (groupMode === MODE_FLAT) {
              if (_doc.flatContents) {
                cmds.push([ind, mode, _doc.flatContents]);
              }
            }

            break;
          }

        case "line-suffix":
          lineSuffix.push([ind, mode, _doc.contents]);
          break;

        case "line-suffix-boundary":
          if (lineSuffix.length > 0) {
            cmds.push([ind, mode, {
              type: "line",
              hard: true
            }]);
          }

          break;

        case "line":
          switch (mode) {
            case MODE_FLAT:
              if (!_doc.hard) {
                if (!_doc.soft) {
                  out.push(" ");
                  pos += 1;
                }

                break;
              } else {
                // This line was forced into the output even if we
                // were in flattened mode, so we need to tell the next
                // group that no matter what, it needs to remeasure
                // because the previous measurement didn't accurately
                // capture the entire expression (this is necessary
                // for nested groups)
                shouldRemeasure = true;
              }

            // fallthrough

            case MODE_BREAK:
              if (lineSuffix.length) {
                cmds.push([ind, mode, _doc]);
                [].push.apply(cmds, lineSuffix.reverse());
                lineSuffix = [];
                break;
              }

              if (_doc.literal) {
                if (ind.root) {
                  out.push(newLine, ind.root.value);
                  pos = ind.root.length;
                } else {
                  out.push(newLine);
                  pos = 0;
                }
              } else {
                pos -= trim(out);
                out.push(newLine + ind.value);
                pos = ind.length;
              }

              break;
          }

          break;

        default:
      }
    }
  }

  var cursorPlaceholderIndex = out.indexOf(cursor.placeholder);

  if (cursorPlaceholderIndex !== -1) {
    var otherCursorPlaceholderIndex = out.indexOf(cursor.placeholder, cursorPlaceholderIndex + 1);
    var beforeCursor = out.slice(0, cursorPlaceholderIndex).join("");
    var aroundCursor = out.slice(cursorPlaceholderIndex + 1, otherCursorPlaceholderIndex).join("");
    var afterCursor = out.slice(otherCursorPlaceholderIndex + 1).join("");
    return {
      formatted: beforeCursor + aroundCursor + afterCursor,
      cursorNodeStart: beforeCursor.length,
      cursorNodeText: aroundCursor
    };
  }

  return {
    formatted: out.join("")
  };
}

module.exports = {
  printDocToString: printDocToString
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringWidth = __webpack_require__(8);

var escapeStringRegexp = __webpack_require__(13);

var getLast = __webpack_require__(14); // eslint-disable-next-line no-control-regex


var notAsciiRegex = /[^\x20-\x7F]/;

function isExportDeclaration(node) {
  if (node) {
    switch (node.type) {
      case "ExportDefaultDeclaration":
      case "ExportDefaultSpecifier":
      case "DeclareExportDeclaration":
      case "ExportNamedDeclaration":
      case "ExportAllDeclaration":
        return true;
    }
  }

  return false;
}

function getParentExportDeclaration(path) {
  var parentNode = path.getParentNode();

  if (path.getName() === "declaration" && isExportDeclaration(parentNode)) {
    return parentNode;
  }

  return null;
}

function getPenultimate(arr) {
  if (arr.length > 1) {
    return arr[arr.length - 2];
  }

  return null;
}

function skip(chars) {
  return function (text, index, opts) {
    var backwards = opts && opts.backwards; // Allow `skip` functions to be threaded together without having
    // to check for failures (did someone say monads?).

    if (index === false) {
      return false;
    }

    var length = text.length;
    var cursor = index;

    while (cursor >= 0 && cursor < length) {
      var c = text.charAt(cursor);

      if (chars instanceof RegExp) {
        if (!chars.test(c)) {
          return cursor;
        }
      } else if (chars.indexOf(c) === -1) {
        return cursor;
      }

      backwards ? cursor-- : cursor++;
    }

    if (cursor === -1 || cursor === length) {
      // If we reached the beginning or end of the file, return the
      // out-of-bounds cursor. It's up to the caller to handle this
      // correctly. We don't want to indicate `false` though if it
      // actually skipped valid characters.
      return cursor;
    }

    return false;
  };
}

var skipWhitespace = skip(/\s/);
var skipSpaces = skip(" \t");
var skipToLineEnd = skip(",; \t");
var skipEverythingButNewLine = skip(/[^\r\n]/);

function skipInlineComment(text, index) {
  if (index === false) {
    return false;
  }

  if (text.charAt(index) === "/" && text.charAt(index + 1) === "*") {
    for (var i = index + 2; i < text.length; ++i) {
      if (text.charAt(i) === "*" && text.charAt(i + 1) === "/") {
        return i + 2;
      }
    }
  }

  return index;
}

function skipTrailingComment(text, index) {
  if (index === false) {
    return false;
  }

  if (text.charAt(index) === "/" && text.charAt(index + 1) === "/") {
    return skipEverythingButNewLine(text, index);
  }

  return index;
} // This one doesn't use the above helper function because it wants to
// test \r\n in order and `skip` doesn't support ordering and we only
// want to skip one newline. It's simple to implement.


function skipNewline(text, index, opts) {
  var backwards = opts && opts.backwards;

  if (index === false) {
    return false;
  }

  var atIndex = text.charAt(index);

  if (backwards) {
    if (text.charAt(index - 1) === "\r" && atIndex === "\n") {
      return index - 2;
    }

    if (atIndex === "\n" || atIndex === "\r" || atIndex === "\u2028" || atIndex === "\u2029") {
      return index - 1;
    }
  } else {
    if (atIndex === "\r" && text.charAt(index + 1) === "\n") {
      return index + 2;
    }

    if (atIndex === "\n" || atIndex === "\r" || atIndex === "\u2028" || atIndex === "\u2029") {
      return index + 1;
    }
  }

  return index;
}

function hasNewline(text, index, opts) {
  opts = opts || {};
  var idx = skipSpaces(text, opts.backwards ? index - 1 : index, opts);
  var idx2 = skipNewline(text, idx, opts);
  return idx !== idx2;
}

function hasNewlineInRange(text, start, end) {
  for (var i = start; i < end; ++i) {
    if (text.charAt(i) === "\n") {
      return true;
    }
  }

  return false;
} // Note: this function doesn't ignore leading comments unlike isNextLineEmpty


function isPreviousLineEmpty(text, node, locStart) {
  var idx = locStart(node) - 1;
  idx = skipSpaces(text, idx, {
    backwards: true
  });
  idx = skipNewline(text, idx, {
    backwards: true
  });
  idx = skipSpaces(text, idx, {
    backwards: true
  });
  var idx2 = skipNewline(text, idx, {
    backwards: true
  });
  return idx !== idx2;
}

function isNextLineEmptyAfterIndex(text, index) {
  var oldIdx = null;
  var idx = index;

  while (idx !== oldIdx) {
    // We need to skip all the potential trailing inline comments
    oldIdx = idx;
    idx = skipToLineEnd(text, idx);
    idx = skipInlineComment(text, idx);
    idx = skipSpaces(text, idx);
  }

  idx = skipTrailingComment(text, idx);
  idx = skipNewline(text, idx);
  return hasNewline(text, idx);
}

function isNextLineEmpty(text, node, locEnd) {
  return isNextLineEmptyAfterIndex(text, locEnd(node));
}

function getNextNonSpaceNonCommentCharacterIndexWithStartIndex(text, idx) {
  var oldIdx = null;

  while (idx !== oldIdx) {
    oldIdx = idx;
    idx = skipSpaces(text, idx);
    idx = skipInlineComment(text, idx);
    idx = skipTrailingComment(text, idx);
    idx = skipNewline(text, idx);
  }

  return idx;
}

function getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd) {
  return getNextNonSpaceNonCommentCharacterIndexWithStartIndex(text, locEnd(node));
}

function getNextNonSpaceNonCommentCharacter(text, node, locEnd) {
  return text.charAt(getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd));
}

function hasSpaces(text, index, opts) {
  opts = opts || {};
  var idx = skipSpaces(text, opts.backwards ? index - 1 : index, opts);
  return idx !== index;
}

function setLocStart(node, index) {
  if (node.range) {
    node.range[0] = index;
  } else {
    node.start = index;
  }
}

function setLocEnd(node, index) {
  if (node.range) {
    node.range[1] = index;
  } else {
    node.end = index;
  }
}

var PRECEDENCE = {};
[["|>"], ["||", "??"], ["&&"], ["|"], ["^"], ["&"], ["==", "===", "!=", "!=="], ["<", ">", "<=", ">=", "in", "instanceof"], [">>", "<<", ">>>"], ["+", "-"], ["*", "/", "%"], ["**"]].forEach(function (tier, i) {
  tier.forEach(function (op) {
    PRECEDENCE[op] = i;
  });
});

function getPrecedence(op) {
  return PRECEDENCE[op];
}

var equalityOperators = {
  "==": true,
  "!=": true,
  "===": true,
  "!==": true
};
var multiplicativeOperators = {
  "*": true,
  "/": true,
  "%": true
};
var bitshiftOperators = {
  ">>": true,
  ">>>": true,
  "<<": true
};

function shouldFlatten(parentOp, nodeOp) {
  if (getPrecedence(nodeOp) !== getPrecedence(parentOp)) {
    return false;
  } // ** is right-associative
  // x ** y ** z --> x ** (y ** z)


  if (parentOp === "**") {
    return false;
  } // x == y == z --> (x == y) == z


  if (equalityOperators[parentOp] && equalityOperators[nodeOp]) {
    return false;
  } // x * y % z --> (x * y) % z


  if (nodeOp === "%" && multiplicativeOperators[parentOp] || parentOp === "%" && multiplicativeOperators[nodeOp]) {
    return false;
  } // x * y / z --> (x * y) / z
  // x / y * z --> (x / y) * z


  if (nodeOp !== parentOp && multiplicativeOperators[nodeOp] && multiplicativeOperators[parentOp]) {
    return false;
  } // x << y << z --> (x << y) << z


  if (bitshiftOperators[parentOp] && bitshiftOperators[nodeOp]) {
    return false;
  }

  return true;
}

function isBitwiseOperator(operator) {
  return !!bitshiftOperators[operator] || operator === "|" || operator === "^" || operator === "&";
} // Tests if an expression starts with `{`, or (if forbidFunctionClassAndDoExpr
// holds) `function`, `class`, or `do {}`. Will be overzealous if there's
// already necessary grouping parentheses.


function startsWithNoLookaheadToken(node, forbidFunctionClassAndDoExpr) {
  node = getLeftMost(node);

  switch (node.type) {
    case "FunctionExpression":
    case "ClassExpression":
    case "DoExpression":
      return forbidFunctionClassAndDoExpr;

    case "ObjectExpression":
      return true;

    case "MemberExpression":
      return startsWithNoLookaheadToken(node.object, forbidFunctionClassAndDoExpr);

    case "TaggedTemplateExpression":
      if (node.tag.type === "FunctionExpression") {
        // IIFEs are always already parenthesized
        return false;
      }

      return startsWithNoLookaheadToken(node.tag, forbidFunctionClassAndDoExpr);

    case "CallExpression":
      if (node.callee.type === "FunctionExpression") {
        // IIFEs are always already parenthesized
        return false;
      }

      return startsWithNoLookaheadToken(node.callee, forbidFunctionClassAndDoExpr);

    case "ConditionalExpression":
      return startsWithNoLookaheadToken(node.test, forbidFunctionClassAndDoExpr);

    case "UpdateExpression":
      return !node.prefix && startsWithNoLookaheadToken(node.argument, forbidFunctionClassAndDoExpr);

    case "BindExpression":
      return node.object && startsWithNoLookaheadToken(node.object, forbidFunctionClassAndDoExpr);

    case "SequenceExpression":
      return startsWithNoLookaheadToken(node.expressions[0], forbidFunctionClassAndDoExpr);

    case "TSAsExpression":
      return startsWithNoLookaheadToken(node.expression, forbidFunctionClassAndDoExpr);

    default:
      return false;
  }
}

function getLeftMost(node) {
  if (node.left) {
    return getLeftMost(node.left);
  }

  return node;
}

function getAlignmentSize(value, tabWidth, startIndex) {
  startIndex = startIndex || 0;
  var size = 0;

  for (var i = startIndex; i < value.length; ++i) {
    if (value[i] === "\t") {
      // Tabs behave in a way that they are aligned to the nearest
      // multiple of tabWidth:
      // 0 -> 4, 1 -> 4, 2 -> 4, 3 -> 4
      // 4 -> 8, 5 -> 8, 6 -> 8, 7 -> 8 ...
      size = size + tabWidth - size % tabWidth;
    } else {
      size++;
    }
  }

  return size;
}

function getIndentSize(value, tabWidth) {
  var lastNewlineIndex = value.lastIndexOf("\n");

  if (lastNewlineIndex === -1) {
    return 0;
  }

  return getAlignmentSize( // All the leading whitespaces
  value.slice(lastNewlineIndex + 1).match(/^[ \t]*/)[0], tabWidth);
}

function getPreferredQuote(raw, preferredQuote) {
  // `rawContent` is the string exactly like it appeared in the input source
  // code, without its enclosing quotes.
  var rawContent = raw.slice(1, -1);
  var double = {
    quote: '"',
    regex: /"/g
  };
  var single = {
    quote: "'",
    regex: /'/g
  };
  var preferred = preferredQuote === "'" ? single : double;
  var alternate = preferred === single ? double : single;
  var result = preferred.quote; // If `rawContent` contains at least one of the quote preferred for enclosing
  // the string, we might want to enclose with the alternate quote instead, to
  // minimize the number of escaped quotes.

  if (rawContent.includes(preferred.quote) || rawContent.includes(alternate.quote)) {
    var numPreferredQuotes = (rawContent.match(preferred.regex) || []).length;
    var numAlternateQuotes = (rawContent.match(alternate.regex) || []).length;
    result = numPreferredQuotes > numAlternateQuotes ? alternate.quote : preferred.quote;
  }

  return result;
}

function printString(raw, options, isDirectiveLiteral) {
  // `rawContent` is the string exactly like it appeared in the input source
  // code, without its enclosing quotes.
  var rawContent = raw.slice(1, -1); // Check for the alternate quote, to determine if we're allowed to swap
  // the quotes on a DirectiveLiteral.

  var canChangeDirectiveQuotes = !rawContent.includes('"') && !rawContent.includes("'");
  var enclosingQuote = options.parser === "json" ? '"' : options.__isInHtmlAttribute ? "'" : getPreferredQuote(raw, options.singleQuote ? "'" : '"'); // Directives are exact code unit sequences, which means that you can't
  // change the escape sequences they use.
  // See https://github.com/prettier/prettier/issues/1555
  // and https://tc39.github.io/ecma262/#directive-prologue

  if (isDirectiveLiteral) {
    if (canChangeDirectiveQuotes) {
      return enclosingQuote + rawContent + enclosingQuote;
    }

    return raw;
  } // It might sound unnecessary to use `makeString` even if the string already
  // is enclosed with `enclosingQuote`, but it isn't. The string could contain
  // unnecessary escapes (such as in `"\'"`). Always using `makeString` makes
  // sure that we consistently output the minimum amount of escaped quotes.


  return makeString(rawContent, enclosingQuote, !(options.parser === "css" || options.parser === "less" || options.parser === "scss" || options.parentParser === "html" || options.parentParser === "vue" || options.parentParser === "angular" || options.parentParser === "lwc"));
}

function makeString(rawContent, enclosingQuote, unescapeUnnecessaryEscapes) {
  var otherQuote = enclosingQuote === '"' ? "'" : '"'; // Matches _any_ escape and unescaped quotes (both single and double).

  var regex = /\\([\s\S])|(['"])/g; // Escape and unescape single and double quotes as needed to be able to
  // enclose `rawContent` with `enclosingQuote`.

  var newContent = rawContent.replace(regex, function (match, escaped, quote) {
    // If we matched an escape, and the escaped character is a quote of the
    // other type than we intend to enclose the string with, there's no need for
    // it to be escaped, so return it _without_ the backslash.
    if (escaped === otherQuote) {
      return escaped;
    } // If we matched an unescaped quote and it is of the _same_ type as we
    // intend to enclose the string with, it must be escaped, so return it with
    // a backslash.


    if (quote === enclosingQuote) {
      return "\\" + quote;
    }

    if (quote) {
      return quote;
    } // Unescape any unnecessarily escaped character.
    // Adapted from https://github.com/eslint/eslint/blob/de0b4ad7bd820ade41b1f606008bea68683dc11a/lib/rules/no-useless-escape.js#L27


    return unescapeUnnecessaryEscapes && /^[^\\nrvtbfux\r\n\u2028\u2029"'0-7]$/.test(escaped) ? escaped : "\\" + escaped;
  });
  return enclosingQuote + newContent + enclosingQuote;
}

function printNumber(rawNumber) {
  return rawNumber.toLowerCase() // Remove unnecessary plus and zeroes from scientific notation.
  .replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(\d)/, "$1$2$3") // Remove unnecessary scientific notation (1e0).
  .replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1") // Make sure numbers always start with a digit.
  .replace(/^([+-])?\./, "$10.") // Remove extraneous trailing decimal zeroes.
  .replace(/(\.\d+?)0+(?=e|$)/, "$1") // Remove trailing dot.
  .replace(/\.(?=e|$)/, "");
}

function getMaxContinuousCount(str, target) {
  var results = str.match(new RegExp("(".concat(escapeStringRegexp(target), ")+"), "g"));

  if (results === null) {
    return 0;
  }

  return results.reduce(function (maxCount, result) {
    return Math.max(maxCount, result.length / target.length);
  }, 0);
}

function getStringWidth(text) {
  if (!text) {
    return 0;
  } // shortcut to avoid needless string `RegExp`s, replacements, and allocations within `string-width`


  if (!notAsciiRegex.test(text)) {
    return text.length;
  }

  return stringWidth(text);
}

function hasIgnoreComment(path) {
  var node = path.getValue();
  return hasNodeIgnoreComment(node);
}

function hasNodeIgnoreComment(node) {
  return node && node.comments && node.comments.length > 0 && node.comments.some(function (comment) {
    return comment.value.trim() === "prettier-ignore";
  });
}

function matchAncestorTypes(path, types, index) {
  index = index || 0;
  types = types.slice();

  while (types.length) {
    var parent = path.getParentNode(index);
    var type = types.shift();

    if (!parent || parent.type !== type) {
      return false;
    }

    index++;
  }

  return true;
}

function addCommentHelper(node, comment) {
  var comments = node.comments || (node.comments = []);
  comments.push(comment);
  comment.printed = false; // For some reason, TypeScript parses `// x` inside of JSXText as a comment
  // We already "print" it via the raw text, we don't need to re-print it as a
  // comment

  if (node.type === "JSXText") {
    comment.printed = true;
  }
}

function addLeadingComment(node, comment) {
  comment.leading = true;
  comment.trailing = false;
  addCommentHelper(node, comment);
}

function addDanglingComment(node, comment) {
  comment.leading = false;
  comment.trailing = false;
  addCommentHelper(node, comment);
}

function addTrailingComment(node, comment) {
  comment.leading = false;
  comment.trailing = true;
  addCommentHelper(node, comment);
}

function isWithinParentArrayProperty(path, propertyName) {
  var node = path.getValue();
  var parent = path.getParentNode();

  if (parent == null) {
    return false;
  }

  if (!Array.isArray(parent[propertyName])) {
    return false;
  }

  var key = path.getName();
  return parent[propertyName][key] === node;
}

function replaceEndOfLineWith(text, replacement) {
  var parts = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = text.split("\n")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var part = _step.value;

      if (parts.length !== 0) {
        parts.push(replacement);
      }

      parts.push(part);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return parts;
}

module.exports = {
  replaceEndOfLineWith: replaceEndOfLineWith,
  getStringWidth: getStringWidth,
  getMaxContinuousCount: getMaxContinuousCount,
  getPrecedence: getPrecedence,
  shouldFlatten: shouldFlatten,
  isBitwiseOperator: isBitwiseOperator,
  isExportDeclaration: isExportDeclaration,
  getParentExportDeclaration: getParentExportDeclaration,
  getPenultimate: getPenultimate,
  getLast: getLast,
  getNextNonSpaceNonCommentCharacterIndexWithStartIndex: getNextNonSpaceNonCommentCharacterIndexWithStartIndex,
  getNextNonSpaceNonCommentCharacterIndex: getNextNonSpaceNonCommentCharacterIndex,
  getNextNonSpaceNonCommentCharacter: getNextNonSpaceNonCommentCharacter,
  skip: skip,
  skipWhitespace: skipWhitespace,
  skipSpaces: skipSpaces,
  skipToLineEnd: skipToLineEnd,
  skipEverythingButNewLine: skipEverythingButNewLine,
  skipInlineComment: skipInlineComment,
  skipTrailingComment: skipTrailingComment,
  skipNewline: skipNewline,
  isNextLineEmptyAfterIndex: isNextLineEmptyAfterIndex,
  isNextLineEmpty: isNextLineEmpty,
  isPreviousLineEmpty: isPreviousLineEmpty,
  hasNewline: hasNewline,
  hasNewlineInRange: hasNewlineInRange,
  hasSpaces: hasSpaces,
  setLocStart: setLocStart,
  setLocEnd: setLocEnd,
  startsWithNoLookaheadToken: startsWithNoLookaheadToken,
  getAlignmentSize: getAlignmentSize,
  getIndentSize: getIndentSize,
  getPreferredQuote: getPreferredQuote,
  printString: printString,
  printNumber: printNumber,
  hasIgnoreComment: hasIgnoreComment,
  hasNodeIgnoreComment: hasNodeIgnoreComment,
  makeString: makeString,
  matchAncestorTypes: matchAncestorTypes,
  addLeadingComment: addLeadingComment,
  addDanglingComment: addDanglingComment,
  addTrailingComment: addTrailingComment,
  isWithinParentArrayProperty: isWithinParentArrayProperty
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stripAnsi = __webpack_require__(9);

var isFullwidthCodePoint = __webpack_require__(11);

var emojiRegex = __webpack_require__(12)();

module.exports = function (input) {
  input = input.replace(emojiRegex, '  ');

  if (typeof input !== 'string' || input.length === 0) {
    return 0;
  }

  input = stripAnsi(input);
  var width = 0;

  for (var i = 0; i < input.length; i++) {
    var code = input.codePointAt(i); // Ignore control characters

    if (code <= 0x1F || code >= 0x7F && code <= 0x9F) {
      continue;
    } // Ignore combining characters


    if (code >= 0x300 && code <= 0x36F) {
      continue;
    } // Surrogates


    if (code > 0xFFFF) {
      i++;
    }

    width += isFullwidthCodePoint(code) ? 2 : 1;
  }

  return width;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ansiRegex = __webpack_require__(10);

module.exports = function (input) {
  return typeof input === 'string' ? input.replace(ansiRegex(), '') : input;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (options) {
  options = Object.assign({
    onlyFirst: false
  }, options);
  var pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)", '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|');
  return new RegExp(pattern, options.onlyFirst ? undefined : 'g');
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable yoda */

module.exports = function (x) {
  if (Number.isNaN(x)) {
    return false;
  } // code points are derived from:
  // http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt


  if (x >= 0x1100 && (x <= 0x115f || // Hangul Jamo
  x === 0x2329 || // LEFT-POINTING ANGLE BRACKET
  x === 0x232a || // RIGHT-POINTING ANGLE BRACKET
  // CJK Radicals Supplement .. Enclosed CJK Letters and Months
  0x2e80 <= x && x <= 0x3247 && x !== 0x303f || // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
  0x3250 <= x && x <= 0x4dbf || // CJK Unified Ideographs .. Yi Radicals
  0x4e00 <= x && x <= 0xa4c6 || // Hangul Jamo Extended-A
  0xa960 <= x && x <= 0xa97c || // Hangul Syllables
  0xac00 <= x && x <= 0xd7a3 || // CJK Compatibility Ideographs
  0xf900 <= x && x <= 0xfaff || // Vertical Forms
  0xfe10 <= x && x <= 0xfe19 || // CJK Compatibility Forms .. Small Form Variants
  0xfe30 <= x && x <= 0xfe6b || // Halfwidth and Fullwidth Forms
  0xff01 <= x && x <= 0xff60 || 0xffe0 <= x && x <= 0xffe6 || // Kana Supplement
  0x1b000 <= x && x <= 0x1b001 || // Enclosed Ideographic Supplement
  0x1f200 <= x && x <= 0x1f251 || // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
  0x20000 <= x && x <= 0x3fffd)) {
    return true;
  }

  return false;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  // https://mths.be/emoji
  return /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  return str.replace(matchOperatorsRe, '\\$&');
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (arr) {
  return arr.length > 0 ? arr[arr.length - 1] : null;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function guessEndOfLine(text) {
  var index = text.indexOf("\r");

  if (index >= 0) {
    return text.charAt(index + 1) === "\n" ? "crlf" : "cr";
  }

  return "lf";
}

function convertEndOfLineToChars(value) {
  switch (value) {
    case "cr":
      return "\r";

    case "crlf":
      return "\r\n";

    default:
      return "\n";
  }
}

module.exports = {
  guessEndOfLine: guessEndOfLine,
  convertEndOfLineToChars: convertEndOfLineToChars
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Using a unique object to compare by reference.

var traverseDocOnExitStackMarker = {};

function traverseDoc(doc, onEnter, onExit, shouldTraverseConditionalGroups) {
  var docsStack = [doc];

  while (docsStack.length !== 0) {
    var _doc = docsStack.pop();

    if (_doc === traverseDocOnExitStackMarker) {
      onExit(docsStack.pop());
      continue;
    }

    var shouldRecurse = true;

    if (onEnter) {
      if (onEnter(_doc) === false) {
        shouldRecurse = false;
      }
    }

    if (onExit) {
      docsStack.push(_doc);
      docsStack.push(traverseDocOnExitStackMarker);
    }

    if (shouldRecurse) {
      // When there are multiple parts to process,
      // the parts need to be pushed onto the stack in reverse order,
      // so that they are processed in the original order
      // when the stack is popped.
      if (_doc.type === "concat" || _doc.type === "fill") {
        for (var ic = _doc.parts.length, i = ic - 1; i >= 0; --i) {
          docsStack.push(_doc.parts[i]);
        }
      } else if (_doc.type === "if-break") {
        if (_doc.flatContents) {
          docsStack.push(_doc.flatContents);
        }

        if (_doc.breakContents) {
          docsStack.push(_doc.breakContents);
        }
      } else if (_doc.type === "group" && _doc.expandedStates) {
        if (shouldTraverseConditionalGroups) {
          for (var _ic = _doc.expandedStates.length, _i = _ic - 1; _i >= 0; --_i) {
            docsStack.push(_doc.expandedStates[_i]);
          }
        } else {
          docsStack.push(_doc.contents);
        }
      } else if (_doc.contents) {
        docsStack.push(_doc.contents);
      }
    }
  }
}

function mapDoc(doc, cb) {
  if (doc.type === "concat" || doc.type === "fill") {
    var parts = doc.parts.map(function (part) {
      return mapDoc(part, cb);
    });
    return cb(Object.assign({}, doc, {
      parts: parts
    }));
  } else if (doc.type === "if-break") {
    var breakContents = doc.breakContents && mapDoc(doc.breakContents, cb);
    var flatContents = doc.flatContents && mapDoc(doc.flatContents, cb);
    return cb(Object.assign({}, doc, {
      breakContents: breakContents,
      flatContents: flatContents
    }));
  } else if (doc.contents) {
    var contents = mapDoc(doc.contents, cb);
    return cb(Object.assign({}, doc, {
      contents: contents
    }));
  }

  return cb(doc);
}

function findInDoc(doc, fn, defaultValue) {
  var result = defaultValue;
  var hasStopped = false;

  function findInDocOnEnterFn(doc) {
    var maybeResult = fn(doc);

    if (maybeResult !== undefined) {
      hasStopped = true;
      result = maybeResult;
    }

    if (hasStopped) {
      return false;
    }
  }

  traverseDoc(doc, findInDocOnEnterFn);
  return result;
}

function isEmpty(n) {
  return typeof n === "string" && n.length === 0;
}

function isLineNextFn(doc) {
  if (typeof doc === "string") {
    return false;
  }

  if (doc.type === "line") {
    return true;
  }
}

function isLineNext(doc) {
  return findInDoc(doc, isLineNextFn, false);
}

function willBreakFn(doc) {
  if (doc.type === "group" && doc.break) {
    return true;
  }

  if (doc.type === "line" && doc.hard) {
    return true;
  }

  if (doc.type === "break-parent") {
    return true;
  }
}

function willBreak(doc) {
  return findInDoc(doc, willBreakFn, false);
}

function breakParentGroup(groupStack) {
  if (groupStack.length > 0) {
    var parentGroup = groupStack[groupStack.length - 1]; // Breaks are not propagated through conditional groups because
    // the user is expected to manually handle what breaks.

    if (!parentGroup.expandedStates) {
      parentGroup.break = true;
    }
  }

  return null;
}

function propagateBreaks(doc) {
  var alreadyVisitedSet = new Set();
  var groupStack = [];

  function propagateBreaksOnEnterFn(doc) {
    if (doc.type === "break-parent") {
      breakParentGroup(groupStack);
    }

    if (doc.type === "group") {
      groupStack.push(doc);

      if (alreadyVisitedSet.has(doc)) {
        return false;
      }

      alreadyVisitedSet.add(doc);
    }
  }

  function propagateBreaksOnExitFn(doc) {
    if (doc.type === "group") {
      var group = groupStack.pop();

      if (group.break) {
        breakParentGroup(groupStack);
      }
    }
  }

  traverseDoc(doc, propagateBreaksOnEnterFn, propagateBreaksOnExitFn,
  /* shouldTraverseConditionalGroups */
  true);
}

function removeLinesFn(doc) {
  // Force this doc into flat mode by statically converting all
  // lines into spaces (or soft lines into nothing). Hard lines
  // should still output because there's too great of a chance
  // of breaking existing assumptions otherwise.
  if (doc.type === "line" && !doc.hard) {
    return doc.soft ? "" : " ";
  } else if (doc.type === "if-break") {
    return doc.flatContents || "";
  }

  return doc;
}

function removeLines(doc) {
  return mapDoc(doc, removeLinesFn);
}

function stripTrailingHardline(doc) {
  // HACK remove ending hardline, original PR: #1984
  if (doc.type === "concat" && doc.parts.length !== 0) {
    var lastPart = doc.parts[doc.parts.length - 1];

    if (lastPart.type === "concat") {
      if (lastPart.parts.length === 2 && lastPart.parts[0].hard && lastPart.parts[1].type === "break-parent") {
        return {
          type: "concat",
          parts: doc.parts.slice(0, -1)
        };
      }

      return {
        type: "concat",
        parts: doc.parts.slice(0, -1).concat(stripTrailingHardline(lastPart))
      };
    }
  }

  return doc;
}

module.exports = {
  isEmpty: isEmpty,
  willBreak: willBreak,
  isLineNext: isLineNext,
  traverseDoc: traverseDoc,
  mapDoc: mapDoc,
  propagateBreaks: propagateBreaks,
  removeLines: removeLines,
  stripTrailingHardline: stripTrailingHardline
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function flattenDoc(doc) {
  if (doc.type === "concat") {
    var res = [];

    for (var i = 0; i < doc.parts.length; ++i) {
      var doc2 = doc.parts[i];

      if (typeof doc2 !== "string" && doc2.type === "concat") {
        [].push.apply(res, flattenDoc(doc2).parts);
      } else {
        var flattened = flattenDoc(doc2);

        if (flattened !== "") {
          res.push(flattened);
        }
      }
    }

    return Object.assign({}, doc, {
      parts: res
    });
  } else if (doc.type === "if-break") {
    return Object.assign({}, doc, {
      breakContents: doc.breakContents != null ? flattenDoc(doc.breakContents) : null,
      flatContents: doc.flatContents != null ? flattenDoc(doc.flatContents) : null
    });
  } else if (doc.type === "group") {
    return Object.assign({}, doc, {
      contents: flattenDoc(doc.contents),
      expandedStates: doc.expandedStates ? doc.expandedStates.map(flattenDoc) : doc.expandedStates
    });
  } else if (doc.contents) {
    return Object.assign({}, doc, {
      contents: flattenDoc(doc.contents)
    });
  }

  return doc;
}

function printDoc(doc) {
  if (typeof doc === "string") {
    return JSON.stringify(doc);
  }

  if (doc.type === "line") {
    if (doc.literal) {
      return "literalline";
    }

    if (doc.hard) {
      return "hardline";
    }

    if (doc.soft) {
      return "softline";
    }

    return "line";
  }

  if (doc.type === "break-parent") {
    return "breakParent";
  }

  if (doc.type === "trim") {
    return "trim";
  }

  if (doc.type === "concat") {
    return "[" + doc.parts.map(printDoc).join(", ") + "]";
  }

  if (doc.type === "indent") {
    return "indent(" + printDoc(doc.contents) + ")";
  }

  if (doc.type === "align") {
    return doc.n === -Infinity ? "dedentToRoot(" + printDoc(doc.contents) + ")" : doc.n < 0 ? "dedent(" + printDoc(doc.contents) + ")" : doc.n.type === "root" ? "markAsRoot(" + printDoc(doc.contents) + ")" : "align(" + JSON.stringify(doc.n) + ", " + printDoc(doc.contents) + ")";
  }

  if (doc.type === "if-break") {
    return "ifBreak(" + printDoc(doc.breakContents) + (doc.flatContents ? ", " + printDoc(doc.flatContents) : "") + ")";
  }

  if (doc.type === "group") {
    if (doc.expandedStates) {
      return "conditionalGroup(" + "[" + doc.expandedStates.map(printDoc).join(",") + "])";
    }

    return (doc.break ? "wrappedGroup" : "group") + "(" + printDoc(doc.contents) + ")";
  }

  if (doc.type === "fill") {
    return "fill" + "(" + doc.parts.map(printDoc).join(", ") + ")";
  }

  if (doc.type === "line-suffix") {
    return "lineSuffix(" + printDoc(doc.contents) + ")";
  }

  if (doc.type === "line-suffix-boundary") {
    return "lineSuffixBoundary";
  }

  throw new Error("Unknown doc type " + doc.type);
}

module.exports = {
  printDocToDebug: function printDocToDebug(doc) {
    return printDoc(flattenDoc(doc));
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require$builders = __webpack_require__(0).builders,
    align = _require$builders.align,
    breakParent = _require$builders.breakParent,
    concat = _require$builders.concat,
    dedent = _require$builders.dedent,
    dedentToRoot = _require$builders.dedentToRoot,
    group = _require$builders.group,
    hardline = _require$builders.hardline,
    ifBreak = _require$builders.ifBreak,
    indent = _require$builders.indent,
    join = _require$builders.join,
    line = _require$builders.line,
    lineSuffix = _require$builders.lineSuffix,
    literalline = _require$builders.literalline,
    markAsRoot = _require$builders.markAsRoot,
    softline = _require$builders.softline,
    trim = _require$builders.trim;

var _require = __webpack_require__(1),
    concatBody = _require.concatBody,
    empty = _require.empty,
    first = _require.first,
    literal = _require.literal,
    makeCall = _require.makeCall,
    makeList = _require.makeList,
    prefix = _require.prefix,
    printComments = _require.printComments,
    skipAssignIndent = _require.skipAssignIndent,
    surround = _require.surround;

module.exports = Object.assign({}, __webpack_require__(19), __webpack_require__(20), __webpack_require__(21), __webpack_require__(22), __webpack_require__(23), __webpack_require__(24), __webpack_require__(25), __webpack_require__(26), __webpack_require__(27), __webpack_require__(28), {
  "@int": function int(path, opts, print) {
    var _path$getValue = path.getValue(),
        body = _path$getValue.body;

    return /^0[0-9]/.test(body) ? "0o".concat(body.slice(1)) : body;
  },
  "@__end__": function __end__(path, opts, print) {
    var _path$getValue2 = path.getValue(),
        body = _path$getValue2.body;

    return concat([trim, "__END__", literalline, body]);
  },
  arg_paren: function arg_paren(path, _ref, print) {
    var addTrailingCommas = _ref.addTrailingCommas;

    if (path.getValue().body[0] === null) {
      return "";
    }

    var args = path.getValue().body[0];
    var hasBlock = args.type === "args_add_block" && args.body[1];
    return group(concat(["(", indent(concat([softline, join(concat([",", line]), path.call(print, "body", 0)), addTrailingCommas && !hasBlock ? ifBreak(",", "") : ""])), concat([softline, ")"])]));
  },
  args: makeList,
  args_add_block: function args_add_block(path, opts, print) {
    var parts = path.call(print, "body", 0);

    if (path.getValue().body[1]) {
      parts.push(concat(["&", path.call(print, "body", 1)]));
    }

    return parts;
  },
  args_add_star: function args_add_star(path, opts, print) {
    var _path$map = path.map(print, "body"),
        _path$map2 = _toArray(_path$map),
        before = _path$map2[0],
        star = _path$map2[1],
        after = _path$map2.slice(2);

    var parts = _toConsumableArray(before).concat([concat(["*", star])], _toConsumableArray(after));

    return parts;
  },
  assoc_new: function assoc_new(path, _ref2, print) {
    var preferHashLabels = _ref2.preferHashLabels;
    var parts = [];

    var _path$map3 = path.map(print, "body"),
        _path$map4 = _slicedToArray(_path$map3, 2),
        printedLabel = _path$map4[0],
        printedValue = _path$map4[1];

    switch (path.getValue().body[0].type) {
      case "@label":
        if (preferHashLabels) {
          parts.push(printedLabel);
        } else {
          parts.push(":".concat(printedLabel.slice(0, printedLabel.length - 1), " =>"));
        }

        break;

      case "symbol_literal":
        if (preferHashLabels && path.getValue().body[0].body.length === 1) {
          var _path$getValue$body$ = path.getValue().body[0],
              comments = _path$getValue$body$.comments,
              start = _path$getValue$body$.start;
          var node = concat([path.call(print, "body", 0, "body", 0, "body", 0), ":"]);

          if (comments) {
            parts.push(printComments(node, start, comments));
          } else {
            parts.push(node);
          }
        } else {
          parts.push(concat([printedLabel, " =>"]));
        }

        break;

      default:
        parts.push(concat([printedLabel, " =>"]));
        break;
    }

    if (skipAssignIndent(path.getValue().body[1])) {
      parts.push(" ", printedValue);
    } else {
      parts.push(indent(concat([line, printedValue])));
    }

    return group(concat(parts));
  },
  assoc_splat: prefix("**"),
  assoclist_from_args: function assoclist_from_args(path, opts, print) {
    return group(join(concat([",", line]), path.map(print, "body", 0)));
  },
  assign: function assign(path, opts, print) {
    var _path$map5 = path.map(print, "body"),
        _path$map6 = _slicedToArray(_path$map5, 2),
        printedTarget = _path$map6[0],
        printedValue = _path$map6[1];

    if (["mrhs_add_star", "mrhs_new_from_args"].includes(path.getValue().body[1].type)) {
      printedValue = group(join(concat([",", line]), printedValue));
    }

    if (skipAssignIndent(path.getValue().body[1])) {
      return group(concat([printedTarget, " = ", printedValue]));
    }

    return group(concat([printedTarget, " =", indent(concat([line, printedValue]))]));
  },
  assign_error: function assign_error(path, opts, print) {
    throw new Error("Can't set variable");
  },
  bare_assoc_hash: function bare_assoc_hash(path, opts, print) {
    return group(join(concat([",", line]), path.map(print, "body", 0)));
  },
  begin: function begin(path, opts, print) {
    return group(concat(["begin", indent(concat([hardline, concat(path.map(print, "body"))])), group(concat([hardline, "end"]))]));
  },
  binary: function binary(path, opts, print) {
    var operator = path.getValue().body[1];
    var useNoSpace = operator === "**";
    return group(concat([concat([path.call(print, "body", 0), useNoSpace ? "" : " "]), operator, indent(concat([useNoSpace ? softline : line, path.call(print, "body", 2)]))]));
  },
  block_var: function block_var(path, opts, print) {
    return concat(["|", path.call(print, "body", 0), "| "]);
  },
  blockarg: function blockarg(path, opts, print) {
    return concat(["&", path.call(print, "body", 0)]);
  },
  bodystmt: function bodystmt(path, opts, print) {
    var _path$getValue$body = _slicedToArray(path.getValue().body, 4),
        statements = _path$getValue$body[0],
        rescue = _path$getValue$body[1],
        elseClause = _path$getValue$body[2],
        ensure = _path$getValue$body[3];

    var parts = [path.call(print, "body", 0)];

    if (rescue) {
      parts.push(dedent(concat([hardline, path.call(print, "body", 1)])));
    }

    if (elseClause) {
      // Before Ruby 2.6, this piece of bodystmt was an explicit "else" node
      var stmts = elseClause.type === "else" ? path.call(print, "body", 2, "body", 0) : path.call(print, "body", 2);
      parts.push(concat([dedent(concat([hardline, "else"])), hardline, stmts]));
    }

    if (ensure) {
      parts.push(dedent(concat([hardline, path.call(print, "body", 3)])));
    }

    return group(concat(parts));
  },
  break: function _break(path, opts, print) {
    var content = path.getValue().body[0];

    if (content.body.length === 0) {
      return "break";
    }

    if (content.body[0].body[0].type === "paren") {
      return concat(["break ", path.call(print, "body", 0, "body", 0, "body", 0, "body", 0)]);
    }

    return concat(["break ", join(", ", path.call(print, "body", 0))]);
  },
  call: function call(path, opts, print) {
    var name = path.getValue().body[2]; // You can call lambdas with a special syntax that looks like func.(*args).
    // In this case, "call" is returned for the 3rd child node.

    if (name !== "call") {
      name = path.call(print, "body", 2);
    }

    return group(concat([path.call(print, "body", 0), indent(concat([softline, makeCall(path, opts, print), name]))]));
  },
  case: function _case(path, opts, print) {
    var parts = ["case "];

    if (path.getValue().body[0]) {
      parts.push(path.call(print, "body", 0));
    }

    parts.push(group(concat([hardline, path.call(print, "body", 1)])), group(concat([hardline, "end"])));
    return group(concat(parts));
  },
  class: function _class(path, opts, print) {
    var _path$getValue$body2 = _slicedToArray(path.getValue().body, 3),
        _constant = _path$getValue$body2[0],
        superclass = _path$getValue$body2[1],
        statements = _path$getValue$body2[2];

    var parts = ["class ", path.call(print, "body", 0)];

    if (superclass) {
      parts.push(" < ", path.call(print, "body", 1));
    } // If the body is empty, we can replace with a ;


    var stmts = statements.body[0].body;

    if (stmts.length === 1 && stmts[0].type === "void_stmt") {
      return group(concat([concat(parts), ifBreak(line, "; "), "end"]));
    }

    return group(concat([concat(parts), indent(concat([hardline, path.call(print, "body", 2)])), concat([hardline, "end"])]));
  },
  class_name_error: function class_name_error(path, opts, print) {
    throw new Error("class/module name must be CONSTANT");
  },
  command: function command(path, opts, print) {
    var command = path.call(print, "body", 0);
    var args = join(concat([",", line]), path.call(print, "body", 1)); // Hate, hate, hate this but can't figure out how to fix it.

    return group(ifBreak(concat([command, " ", align(command.length + 1, args)]), concat([command, " ", args])));
  },
  command_call: function command_call(path, opts, print) {
    var parts = [path.call(print, "body", 0), makeCall(path, opts, print), path.call(print, "body", 2)];

    if (!path.getValue().body[3]) {
      return concat(parts);
    }

    parts.push(" ");
    var args = join(concat([",", line]), path.call(print, "body", 3));
    return group(ifBreak(concat(parts.concat([align(parts.reduce(function (sum, part) {
      return sum + part.length;
    }, 0), args)])), concat(parts.concat([args]))));
  },
  const_path_field: function const_path_field(path, opts, print) {
    return join("::", path.map(print, "body"));
  },
  const_path_ref: function const_path_ref(path, opts, print) {
    return join("::", path.map(print, "body"));
  },
  const_ref: first,
  defined: function defined(path, opts, print) {
    return group(concat(["defined?(", indent(concat([softline, path.call(print, "body", 0)])), concat([softline, ")"])]));
  },
  dot2: function dot2(path, opts, print) {
    return concat([path.call(print, "body", 0), "..", path.getValue().body[1] ? path.call(print, "body", 1) : ""]);
  },
  dot3: function dot3(path, opts, print) {
    return concat([path.call(print, "body", 0), "...", path.getValue().body[1] ? path.call(print, "body", 1) : ""]);
  },
  dyna_symbol: function dyna_symbol(path, opts, print) {
    return concat([":\"", concat(path.call(print, "body", 0)), "\""]);
  },
  else: function _else(path, opts, print) {
    var stmts = path.getValue().body[0];
    return concat([stmts.body.length === 1 && stmts.body[0].type === "command" ? breakParent : "", "else", indent(concat([softline, path.call(print, "body", 0)]))]);
  },
  embdoc: function embdoc(path, opts, print) {
    return concat([trim, path.getValue().body]);
  },
  ensure: function ensure(path, opts, print) {
    return group(concat(["ensure", indent(concat([hardline, concat(path.map(print, "body"))]))]));
  },
  excessed_comma: empty,
  fcall: concatBody,
  field: function field(path, opts, print) {
    return group(concat([path.call(print, "body", 0), concat([makeCall(path, opts, print), path.call(print, "body", 2)])]));
  },
  hash: function hash(path, _ref3, print) {
    var addTrailingCommas = _ref3.addTrailingCommas;

    if (path.getValue().body[0] === null) {
      return '{}';
    }

    return group(concat(["{", indent(concat([line, concat(path.map(print, "body")), addTrailingCommas ? ifBreak(",", "") : ""])), concat([line, "}"])]));
  },
  lambda: function lambda(path, opts, print) {
    var params = path.getValue().body[0];
    var paramsConcat = "";

    if (params.type === "params") {
      paramsConcat = path.call(print, "body", 0);
    } else {
      params = params.body[0];
      paramsConcat = path.call(print, "body", 0, "body", 0);
    }

    var noParams = params.body.every(function (type) {
      return !type;
    });
    var commandNode = path.getParentNode(2);
    var inlineLambda = concat(["->", noParams ? "" : concat(["(", paramsConcat, ")"]), " { ", path.call(print, "body", 1), " }"]);

    if (commandNode && ["command", "command_call"].includes(commandNode.type)) {
      return group(ifBreak(concat(["lambda {", noParams ? "" : concat([" |", paramsConcat, "|"]), indent(concat([line, path.call(print, "body", 1)])), concat([line, "}"])]), inlineLambda));
    }

    return group(ifBreak(concat(["lambda do", noParams ? "" : concat([" |", paramsConcat, "|"]), indent(concat([softline, path.call(print, "body", 1)])), concat([softline, "end"])]), inlineLambda));
  },
  massign: function massign(path, opts, print) {
    var right = path.call(print, "body", 1);

    if (["mrhs_add_star", "mrhs_new_from_args"].includes(path.getValue().body[1].type)) {
      right = group(join(concat([",", line]), right));
    }

    return group(concat([group(join(concat([",", line]), path.call(print, "body", 0))), " =", indent(concat([line, right]))]));
  },
  method_add_arg: function method_add_arg(path, opts, print) {
    if (path.getValue().body[1].type === "args_new") {
      return path.call(print, "body", 0);
    }

    return group(concat(path.map(print, "body")));
  },
  method_add_block: function method_add_block(path, opts, print) {
    return concat(path.map(print, "body"));
  },
  methref: function methref(path, opts, print) {
    return join(".:", path.map(print, "body"));
  },
  mlhs: makeList,
  mlhs_add_post: function mlhs_add_post(path, opts, print) {
    return _toConsumableArray(path.call(print, "body", 0)).concat(_toConsumableArray(path.call(print, "body", 1)));
  },
  mlhs_add_star: function mlhs_add_star(path, opts, print) {
    return _toConsumableArray(path.call(print, "body", 0)).concat([path.getValue().body[1] ? concat(["*", path.call(print, "body", 1)]) : "*"]);
  },
  mlhs_paren: function mlhs_paren(path, opts, print) {
    if (["massign", "mlhs_paren"].includes(path.getParentNode().type)) {
      // If we're nested in brackets as part of the left hand side of an assignment
      // (a, b, c) = 1, 2, 3
      // ignore the current node and just go straight to the content
      return path.call(print, "body", 0);
    }

    return group(concat(["(", indent(concat([softline, join(concat([",", line]), path.call(print, "body", 0))])), concat([softline, ")"])]));
  },
  mrhs: makeList,
  mrhs_add_star: function mrhs_add_star(path, opts, print) {
    return _toConsumableArray(path.call(print, "body", 0)).concat([concat(["*", path.call(print, "body", 1)])]);
  },
  mrhs_new_from_args: function mrhs_new_from_args(path, opts, print) {
    var parts = path.call(print, "body", 0);

    if (path.getValue().body.length > 1) {
      parts.push(path.call(print, "body", 1));
    }

    return parts;
  },
  module: function module(path, opts, print) {
    var declaration = group(concat(["module ", path.call(print, "body", 0)])); // If the body is empty, we can replace with a ;

    var stmts = path.getValue().body[1].body[0].body;

    if (stmts.length === 1 && stmts[0].type === "void_stmt") {
      return group(concat([declaration, ifBreak(line, "; "), "end"]));
    }

    return group(concat([declaration, indent(concat([hardline, path.call(print, "body", 1)])), concat([hardline, "end"])]));
  },
  next: function next(path, opts, print) {
    var args = path.getValue().body[0].body[0];

    if (!args) {
      return "next";
    }

    if (args.body[0].type === "paren") {
      // Ignoring the parens node and just going straight to the content
      return concat(["next ", path.call(print, "body", 0, "body", 0, "body", 0, "body", 0)]);
    }

    return concat(["next ", join(", ", path.call(print, "body", 0))]);
  },
  opassign: function opassign(path, opts, print) {
    return group(concat([path.call(print, "body", 0), " ", path.call(print, "body", 1), indent(concat([line, path.call(print, "body", 2)]))]));
  },
  paren: function paren(path, opts, print) {
    if (!path.getValue().body[0]) {
      return "()";
    }

    var content = path.call(print, "body", 0);

    if (["args", "args_add_star", "args_add_block"].includes(path.getValue().body[0].type)) {
      content = join(concat([",", line]), content);
    }

    return group(concat(["(", indent(concat([softline, content])), concat([softline, ")"])]));
  },
  program: function program(path, opts, print) {
    return markAsRoot(concat([join(literalline, path.map(print, "body")), literalline]));
  },
  redo: literal("redo"),
  rescue: function rescue(path, opts, print) {
    var _path$getValue$body3 = _slicedToArray(path.getValue().body, 4),
        exception = _path$getValue$body3[0],
        variable = _path$getValue$body3[1],
        _statements = _path$getValue$body3[2],
        addition = _path$getValue$body3[3];

    var parts = ["rescue"];

    if (exception || variable) {
      if (exception) {
        if (Array.isArray(exception)) {
          parts.push(" ", path.call(print, "body", 0, 0));
        } else {
          parts.push(" ", align("rescue ".length, group(join(concat([",", line]), path.call(print, "body", 0)))));
        }
      }

      if (variable) {
        parts.push(group(concat([" => ", path.call(print, "body", 1)])));
      }
    } else {
      parts.push(" StandardError");
    }

    parts.push(indent(concat([hardline, path.call(print, "body", 2)])));

    if (addition) {
      parts.push(concat([hardline, path.call(print, "body", 3)]));
    }

    return group(concat(parts));
  },
  rescue_mod: function rescue_mod(path, opts, print) {
    return group(concat(["begin", indent(concat([hardline, path.call(print, "body", 0)])), hardline, "rescue StandardError", indent(concat([hardline, path.call(print, "body", 1)])), hardline, "end"]));
  },
  retry: literal("retry"),
  return: function _return(path, opts, print) {
    var args = path.getValue().body[0].body[0];

    if (!args) {
      return "return";
    }

    if (args.body[0] && args.body[0].type === "paren") {
      // Ignoring the parens node and just going straight to the content
      return concat(["return ", path.call(print, "body", 0, "body", 0, "body", 0, "body", 0)]);
    }

    return concat(["return ", join(", ", path.call(print, "body", 0))]);
  },
  return0: literal("return"),
  sclass: function sclass(path, opts, print) {
    return group(concat([concat(["class << ", path.call(print, "body", 0)]), indent(concat([hardline, path.call(print, "body", 1)])), concat([hardline, "end"])]));
  },
  stmts: function stmts(path, opts, print) {
    var parts = [];
    var line = null;
    path.getValue().body.forEach(function (stmt, index) {
      if (stmt.type === "void_stmt") {
        return;
      }

      var printed = path.call(print, "body", index);

      if (line === null) {
        parts.push(printed);
      } else if (stmt.start - line > 1) {
        parts.push(hardline, hardline, printed);
      } else if (stmt.start !== line || path.getParentNode().type !== "string_embexpr") {
        parts.push(hardline, printed);
      } else {
        parts.push("; ", printed);
      }

      line = stmt.end;
    });
    return concat(parts);
  },
  super: function _super(path, opts, print) {
    var args = path.getValue().body[0];

    if (args.type === "arg_paren") {
      // In case there are explicitly no arguments but they are using parens,
      // we assume they are attempting to override the initializer and pass no
      // arguments up.
      if (args.body[0] === null) {
        return "super()";
      }

      return concat(["super", path.call(print, "body", 0)]);
    }

    return concat(["super ", join(", ", path.call(print, "body", 0))]);
  },
  symbol: prefix(":"),
  symbol_literal: concatBody,
  top_const_field: prefix("::"),
  top_const_ref: prefix("::"),
  unary: function unary(path, opts, print) {
    var operator = path.getValue().body[0];
    return concat([operator === "not" ? "not " : operator[0], path.call(print, "body", 1)]);
  },
  undef: function undef(path, opts, print) {
    return group(concat(["undef ", align("undef ".length, join(concat([",", line]), path.map(print, "body", 0)))]));
  },
  var_field: concatBody,
  var_ref: first,
  vcall: first,
  when: function when(path, opts, print) {
    var _path$getValue$body4 = _slicedToArray(path.getValue().body, 3),
        _predicates = _path$getValue$body4[0],
        _statements = _path$getValue$body4[1],
        addition = _path$getValue$body4[2];

    var stmts = path.call(print, "body", 1);
    var parts = [group(concat(["when ", join(", ", path.call(print, "body", 0))]))];

    if (!stmts.parts.every(function (part) {
      return !part;
    })) {
      parts.push(indent(concat([hardline, stmts])));
    }

    if (addition) {
      parts.push(concat([hardline, path.call(print, "body", 2)]));
    }

    return group(concat(parts));
  },
  yield: function _yield(path, opts, print) {
    if (path.getValue().body[0].type === "paren") {
      return concat(["yield", path.call(print, "body", 0)]);
    }

    return concat(["yield ", join(", ", path.call(print, "body", 0))]);
  },
  yield0: literal("yield"),
  zsuper: literal("super")
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require$builders = __webpack_require__(0).builders,
    concat = _require$builders.concat,
    join = _require$builders.join;

var usingSymbols = function usingSymbols(path) {
  var _path$getValue$body$m = path.getValue().body.map(function (node) {
    return node.body[0].type;
  }),
      _path$getValue$body$m2 = _slicedToArray(_path$getValue$body$m, 2),
      left = _path$getValue$body$m2[0],
      right = _path$getValue$body$m2[1];

  return left === "symbol" && right === "symbol";
};

var identFromSymbol = function identFromSymbol(path, print, index) {
  return path.call(print, "body", index, "body", 0, "body", 0);
};

var aliasError = function aliasError(path, opts, print) {
  throw new Error("can't make alias for the number variables");
};

var aliasVars = function aliasVars(path, opts, print) {
  if (usingSymbols(path)) {
    return join(" ", [identFromSymbol(path, print, 0), identFromSymbol(path, print, 1)]);
  }

  return join(" ", path.map(print, "body"));
};

var alias = function alias(path, opts, print) {
  return concat(["alias ", aliasVars(path, opts, print)]);
};

module.exports = {
  alias: alias,
  alias_error: aliasError,
  var_alias: alias
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require$builders = __webpack_require__(0).builders,
    concat = _require$builders.concat,
    group = _require$builders.group,
    ifBreak = _require$builders.ifBreak,
    indent = _require$builders.indent,
    join = _require$builders.join,
    line = _require$builders.line,
    softline = _require$builders.softline;

var isStringArray = function isStringArray(args) {
  return args.body.every(function (arg) {
    return arg.type === "string_literal" && arg.body[0].body.length === 1 && !arg.body[0].body[0].body.includes(" ");
  });
};

var isSymbolArray = function isSymbolArray(args) {
  return args.body.every(function (arg) {
    return arg.type === "symbol_literal";
  });
};

var makeArray = function makeArray(start) {
  return function (path, opts, print) {
    return [start].concat(_toConsumableArray(path.map(print, "body")));
  };
};

var getSpecialArrayParts = function getSpecialArrayParts(path, print, args) {
  return args.body.map(function (_arg, index) {
    return path.call(print, "body", 0, "body", index, "body", 0, "body", 0);
  });
};

var printAref = function printAref(path, opts, print) {
  return group(concat([path.call(print, "body", 0), "[", indent(concat([softline, join(concat([",", line]), path.call(print, "body", 1))])), concat([softline, "]"])]));
};

var printSpecialArray = function printSpecialArray(_ref) {
  var _ref2 = _toArray(_ref),
      first = _ref2[0],
      rest = _ref2.slice(1);

  return group(concat([first, "[", indent(concat([softline, join(line, rest)])), concat([softline, "]"])]));
};

module.exports = {
  aref: function aref(path, opts, print) {
    if (!path.getValue().body[1]) {
      return concat([path.call(print, "body", 0), "[]"]);
    }

    return printAref(path, opts, print);
  },
  aref_field: printAref,
  array: function array(path, _ref3, print) {
    var addTrailingCommas = _ref3.addTrailingCommas;
    var args = path.getValue().body[0];

    if (args === null) {
      return '[]';
    }

    if (isStringArray(args)) {
      return printSpecialArray(["%w"].concat(_toConsumableArray(getSpecialArrayParts(path, print, args))));
    }

    if (isSymbolArray(args)) {
      return printSpecialArray(["%i"].concat(_toConsumableArray(getSpecialArrayParts(path, print, args))));
    }

    if (["args", "args_add_star"].includes(args.type)) {
      return group(concat(["[", indent(concat([softline, join(concat([",", line]), path.call(print, "body", 0)), addTrailingCommas ? ifBreak(",", "") : ""])), concat([softline, "]"])]));
    }

    return printSpecialArray(path.call(print, "body", 0));
  },
  qsymbols: makeArray("%i"),
  qwords: makeArray("%w"),
  symbols: makeArray("%I"),
  words: makeArray("%W")
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require$builders = __webpack_require__(0).builders,
    breakParent = _require$builders.breakParent,
    concat = _require$builders.concat,
    group = _require$builders.group,
    ifBreak = _require$builders.ifBreak,
    indent = _require$builders.indent,
    line = _require$builders.line,
    softline = _require$builders.softline;

var isCall = function isCall(node) {
  return ["::", "."].includes(node) || node.type === "@period";
}; // If you have a simple block that only calls a method on the single required
// parameter that is passed to it, then you can replace that block with the
// simpler `Symbol#to_proc`. Meaning, it would go from:
//
//     [1, 2, 3].map { |i| i.to_s }
//
// to:
//
//     [1, 2, 3].map(&:to_s)
//
// This additionally works with `do` blocks as well.


var toProcTransform = function toProcTransform(path, opts, print) {
  var _path$getValue$body = _slicedToArray(path.getValue().body, 2),
      variables = _path$getValue$body[0],
      blockContents = _path$getValue$body[1]; // Ensure that there are variables being passed to this block.


  var params = variables && variables.body[0];

  if (!params || params.type !== "params") {
    return;
  } // Ensure there is one and only one parameter, and that it is required.


  var _params$body = _toArray(params.body),
      reqParams = _params$body[0],
      other = _params$body.slice(1);

  if (!Array.isArray(reqParams) || reqParams.length !== 1 || other.some(Boolean)) {
    return;
  }

  var statements;

  if (blockContents.type === "bodystmt") {
    // We’re in a `do` block
    var _blockContents$body = _toArray(blockContents.body),
        blockStatements = _blockContents$body[0],
        rescueElseEnsure = _blockContents$body.slice(1); // You can’t use the to_proc shortcut if you’re rescuing


    if (rescueElseEnsure.some(Boolean)) {
      return;
    }

    statements = blockStatements;
  } else {
    // We’re in a brace block
    statements = blockContents;
  } // Ensure the block contains only one statement


  if (statements.body.length !== 1) {
    return;
  } // Ensure that statement is a call


  var _statements$body = _slicedToArray(statements.body, 1),
      statement = _statements$body[0];

  if (statement.type !== "call") {
    return;
  } // Ensure the call is a method of the block argument


  var _statement$body = _slicedToArray(statement.body, 4),
      varRef = _statement$body[0],
      call = _statement$body[1],
      method = _statement$body[2],
      args = _statement$body[3];

  if (varRef.type === "var_ref" && varRef.body[0].body === reqParams[0].body && isCall(call) && method.type === "@ident" && !args) {
    if (["command", "command_call"].includes(path.getParentNode().body[0].type)) {
      return ", &:".concat(method.body);
    }

    return "(&:".concat(method.body, ")");
  }
};

var printBlock = function printBlock(path, opts, print) {
  var toProcResponse = toProcTransform(path, opts, print);

  if (toProcResponse) {
    return toProcResponse;
  }

  var _path$getValue$body2 = _slicedToArray(path.getValue().body, 2),
      variables = _path$getValue$body2[0],
      statements = _path$getValue$body2[1];

  var stmts = statements.type === "stmts" ? statements.body : statements.body[0].body;
  var doBlockBody = "";

  if (stmts.length !== 1 || stmts[0].type !== "void_stmt") {
    doBlockBody = indent(concat([softline, path.call(print, "body", 1)]));
  }

  var doBlock = concat([" do", variables ? concat([" ", path.call(print, "body", 0)]) : "", doBlockBody, concat([softline, "end"])]); // We can hit this next pattern if within the block the only statement is a
  // comment.

  if (stmts.length > 1 && stmts.filter(function (stmt) {
    return stmt.type !== "@comment";
  }).length === 1) {
    return concat([breakParent, doBlock]);
  } // If the parent node is a command node, then there are no parentheses around
  // the arguments to that command, so we need to break the block


  if (["command", "command_call"].includes(path.getParentNode().body[0].type)) {
    return concat([breakParent, doBlock]);
  }

  var braceBlock = concat([" { ", variables ? path.call(print, "body", 0) : "", path.call(print, "body", 1), " }"]);
  return group(ifBreak(doBlock, braceBlock));
};

module.exports = {
  brace_block: printBlock,
  do_block: printBlock
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require$builders = __webpack_require__(0).builders,
    align = _require$builders.align,
    breakParent = _require$builders.breakParent,
    concat = _require$builders.concat,
    hardline = _require$builders.hardline,
    group = _require$builders.group,
    ifBreak = _require$builders.ifBreak,
    indent = _require$builders.indent,
    softline = _require$builders.softline;

var printWithAddition = function printWithAddition(keyword, path, print) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$breaking = _ref.breaking,
      breaking = _ref$breaking === void 0 ? false : _ref$breaking;

  return concat(["".concat(keyword, " "), align(keyword.length - 1, path.call(print, "body", 0)), indent(concat([softline, path.call(print, "body", 1)])), concat([softline, path.call(print, "body", 2)]), concat([softline, "end"]), breaking ? breakParent : ""]);
};

var printTernaryConditions = function printTernaryConditions(keyword, truthyValue, falsyValue) {
  var parts = [truthyValue, " : ", falsyValue];
  return keyword === "if" ? parts : parts.reverse();
};

var printConditional = function printConditional(keyword) {
  return function (path, _ref2, print) {
    var inlineConditionals = _ref2.inlineConditionals;

    var _path$getValue$body = _slicedToArray(path.getValue().body, 3),
        _predicate = _path$getValue$body[0],
        stmts = _path$getValue$body[1],
        addition = _path$getValue$body[2]; // If the addition is not an elsif or an else, then it's the second half of a
    // ternary expression


    if (addition && addition.type !== "elsif" && addition.type !== "else") {
      var parts = [path.call(print, "body", 0), " ? "];
      var truthyValue = path.call(print, "body", 1);
      var falsyValue = path.call(print, "body", 2);
      return group(ifBreak(concat(["".concat(keyword, " "), path.call(print, "body", 0), indent(concat([softline, path.call(print, "body", 1)])), concat([softline, "else"]), indent(concat([softline, path.call(print, "body", 2)])), concat([softline, "end"])]), concat(parts.concat(printTernaryConditions(keyword, truthyValue, falsyValue)))));
    } // If there is an else and only an else, attempt to shorten to a ternary


    if (addition && addition.type === "else") {
      var _parts = [path.call(print, "body", 0), " ? "];

      var _truthyValue = path.call(print, "body", 1);

      var _falsyValue = path.call(print, "body", 2, "body", 0);

      if (stmts.body.length === 1 && ["command", "command_call"].includes(stmts.body[0].type)) {
        return printWithAddition(keyword, path, print, {
          breaking: true
        });
      }

      return group(ifBreak(printWithAddition(keyword, path, print), concat([stmts.body.every(function (_ref3) {
        var type = _ref3.type;
        return ["void_stmt", "@comment"].includes(type);
      }) ? breakParent : ""].concat(_parts, _toConsumableArray(printTernaryConditions(keyword, _truthyValue, _falsyValue))))));
    } // If there's an additional clause, we know we can't go for the inline option


    if (addition) {
      return group(printWithAddition(keyword, path, print, {
        breaking: true
      }));
    } // If it's short enough, favor the inline conditional


    return group(ifBreak(concat(["".concat(keyword, " "), align(keyword.length - 1, path.call(print, "body", 0)), indent(concat([softline, path.call(print, "body", 1)])), concat([softline, "end"])]), concat([inlineConditionals ? "" : breakParent, path.call(print, "body", 1), " ".concat(keyword, " "), path.call(print, "body", 0)])));
  };
};

module.exports = {
  elsif: function elsif(path, opts, print) {
    var _path$getValue$body2 = _slicedToArray(path.getValue().body, 3),
        _predicate = _path$getValue$body2[0],
        _statements = _path$getValue$body2[1],
        addition = _path$getValue$body2[2];

    var parts = [group(concat(["elsif ", align("elsif".length - 1, path.call(print, "body", 0))])), indent(concat([hardline, path.call(print, "body", 1)]))];

    if (addition) {
      parts.push(group(concat([hardline, path.call(print, "body", 2)])));
    }

    return group(concat(parts));
  },
  if: printConditional("if"),
  ifop: printConditional("if"),
  if_mod: printConditional("if"),
  unless: printConditional("unless"),
  unless_mod: printConditional("unless")
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var _require$builders = __webpack_require__(0).builders,
    concat = _require$builders.concat,
    group = _require$builders.group,
    indent = _require$builders.indent,
    line = _require$builders.line,
    lineSuffixBoundary = _require$builders.lineSuffixBoundary;

var printHook = function printHook(name) {
  return function (path, opts, print) {
    return group(concat(["".concat(name, " {"), indent(concat([line, path.call(print, "body", 0)])), concat([line, "}"])]));
  };
};

module.exports = {
  BEGIN: printHook("BEGIN"),
  END: printHook("END")
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var _require$builders = __webpack_require__(0).builders,
    breakParent = _require$builders.breakParent,
    concat = _require$builders.concat,
    group = _require$builders.group,
    hardline = _require$builders.hardline,
    ifBreak = _require$builders.ifBreak,
    indent = _require$builders.indent,
    softline = _require$builders.softline;

var printLoop = function printLoop(keyword) {
  return function (path, _ref, print) {
    var inlineLoops = _ref.inlineLoops;
    return group(ifBreak(concat([concat(["".concat(keyword, " "), path.call(print, "body", 0)]), indent(concat([softline, path.call(print, "body", 1)])), concat([softline, "end"])]), concat([inlineLoops ? "" : breakParent, path.call(print, "body", 1), " ".concat(keyword, " "), path.call(print, "body", 0)])));
  };
};

var printFor = function printFor(path, opts, print) {
  return group(concat([path.call(print, "body", 1), ".each do |", path.call(print, "body", 0), "|", indent(concat([hardline, path.call(print, "body", 2)])), concat([hardline, "end"])]));
};

module.exports = {
  while: printLoop("while"),
  while_mod: printLoop("while"),
  until: printLoop("until"),
  until_mod: printLoop("until"),
  for: printFor
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require$builders = __webpack_require__(0).builders,
    concat = _require$builders.concat,
    group = _require$builders.group,
    hardline = _require$builders.hardline,
    indent = _require$builders.indent;

var printMethod = function printMethod(offset) {
  return function (path, opts, print) {
    var _path$getValue$body$s = path.getValue().body.slice(offset),
        _path$getValue$body$s2 = _slicedToArray(_path$getValue$body$s, 3),
        name = _path$getValue$body$s2[0],
        params = _path$getValue$body$s2[1],
        body = _path$getValue$body$s2[2];

    var declaration = ["def "]; // In this case, we're printing a method that's defined as a singleton, so we
    // need to include the target and the operator

    if (offset > 0) {
      declaration.push(path.call(print, "body", 0), path.call(print, "body", 1));
    } // In case there are no parens but there are arguments


    var parens = params.type === "params" && params.body.some(function (paramType) {
      return paramType;
    });
    declaration.push(path.call(print, "body", offset), parens ? "(" : "", path.call(print, "body", offset + 1), parens ? ")" : ""); // If the body is empty, we can replace with a ;

    var stmts = body.body[0].body;

    if (stmts.length === 1 && stmts[0].type === "void_stmt") {
      return group(concat(declaration.concat(["; end"])));
    }

    return group(concat([group(concat(declaration)), indent(concat([hardline, path.call(print, "body", offset + 2)])), group(concat([hardline, "end"]))]));
  };
};

module.exports = {
  def: printMethod(0),
  defs: printMethod(2)
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require$builders = __webpack_require__(0).builders,
    concat = _require$builders.concat,
    group = _require$builders.group,
    join = _require$builders.join,
    line = _require$builders.line;

var printGenericRestParam = function printGenericRestParam(symbol) {
  return function (path, opts, print) {
    return path.getValue().body[0] ? concat([symbol, path.call(print, "body", 0)]) : symbol;
  };
};

var printParams = function printParams(path, opts, print) {
  var _path$getValue$body = _slicedToArray(path.getValue().body, 7),
      reqs = _path$getValue$body[0],
      optls = _path$getValue$body[1],
      rest = _path$getValue$body[2],
      post = _path$getValue$body[3],
      kwargs = _path$getValue$body[4],
      kwarg_rest = _path$getValue$body[5],
      block = _path$getValue$body[6];

  var parts = [];

  if (reqs) {
    parts = parts.concat(path.map(print, "body", 0));
  }

  if (optls) {
    parts = parts.concat(optls.map(function (_, index) {
      return concat([path.call(print, "body", 1, index, 0), " = ", path.call(print, "body", 1, index, 1)]);
    }));
  }

  if (rest) {
    parts.push(path.call(print, "body", 2));
  }

  if (post) {
    parts = parts.concat(path.map(print, "body", 3));
  }

  if (kwargs) {
    parts = parts.concat(kwargs.map(function (_ref, index) {
      var _ref2 = _slicedToArray(_ref, 2),
          kwarg = _ref2[0],
          value = _ref2[1];

      if (!value) {
        return path.call(print, "body", 4, index, 0);
      }

      return group(join(" ", path.map(print, "body", 4, index)));
    }));
  }

  if (kwarg_rest) {
    parts.push(path.call(print, "body", 5));
  }

  if (block) {
    parts.push(path.call(print, "body", 6));
  }

  return group(join(concat([",", line]), parts));
};

var paramError = function paramError() {
  throw new Error("formal argument cannot be a global variable");
};

module.exports = {
  kwrest_param: printGenericRestParam("**"),
  rest_param: printGenericRestParam("*"),
  params: printParams,
  param_error: paramError
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require$builders = __webpack_require__(0).builders,
    concat = _require$builders.concat,
    group = _require$builders.group,
    indent = _require$builders.indent,
    softline = _require$builders.softline;

var _require = __webpack_require__(1),
    makeList = _require.makeList;

module.exports = {
  regexp: makeList,
  regexp_literal: function regexp_literal(path, opts, print) {
    var _path$map = path.map(print, "body"),
        _path$map2 = _slicedToArray(_path$map, 2),
        contents = _path$map2[0],
        ending = _path$map2[1];

    var useBraces = contents.some(function (content) {
      return typeof content === "string" && content.includes("/");
    });
    return concat([useBraces ? "%r{" : "/"].concat(_toConsumableArray(contents), [useBraces ? "}" : "/", ending.slice(1)]));
  }
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require$builders = __webpack_require__(0).builders,
    concat = _require$builders.concat,
    group = _require$builders.group,
    hardline = _require$builders.hardline,
    indent = _require$builders.indent,
    join = _require$builders.join,
    line = _require$builders.line,
    literalline = _require$builders.literalline,
    softline = _require$builders.softline;

var _require = __webpack_require__(1),
    concatBody = _require.concatBody,
    empty = _require.empty,
    makeList = _require.makeList,
    surround = _require.surround;

var escapePattern = __webpack_require__(29);

var isSingleQuotable = function isSingleQuotable(stringPart) {
  return stringPart.type === "@tstring_content" && !stringPart.body.includes("'") && !escapePattern.test(stringPart.body);
};

var quotePattern = new RegExp("\\\\([\\s\\S])|(['\"])", "g");

var makeString = function makeString(content, enclosingQuote) {
  var otherQuote = enclosingQuote === '"' ? "'" : '"'; // Escape and unescape single and double quotes as needed to be able to
  // enclose `content` with `enclosingQuote`.

  return content.replace(quotePattern, function (match, escaped, quote) {
    if (escaped === otherQuote) {
      return escaped;
    }

    if (quote === enclosingQuote) {
      return "\\" + quote;
    }

    if (quote) {
      return quote;
    }

    return "\\" + escaped;
  });
};

module.exports = {
  "@CHAR": function CHAR(path, _ref, print) {
    var preferSingleQuotes = _ref.preferSingleQuotes;

    var _path$getValue = path.getValue(),
        body = _path$getValue.body;

    if (body.length !== 2) {
      return body;
    }

    var quote = preferSingleQuotes ? "\'" : "\"";
    return body.length === 2 ? concat([quote, body.slice(1), quote]) : body;
  },
  heredoc: function heredoc(path, opts, print) {
    var _path$getValue2 = path.getValue(),
        beging = _path$getValue2.beging,
        ending = _path$getValue2.ending;

    return concat([beging, concat([literalline].concat(_toConsumableArray(path.map(print, "body")))), ending]);
  },
  string: makeList,
  string_concat: function string_concat(path, opts, print) {
    return group(concat([path.call(print, "body", 0), " \\", indent(concat([hardline, path.call(print, "body", 1)]))]));
  },
  string_dvar: surround("#{", "}"),
  string_embexpr: function string_embexpr(path, opts, print) {
    var stmts = path.getValue().body[0].body;
    var isHeredoc = stmts.length === 1 && (stmts[0].type === "heredoc" || stmts[0].body[0] && stmts[0].body[0].type === "heredoc");
    return concat(["#{", path.call(print, "body", 0), concat([isHeredoc ? hardline : "", "}"])]);
  },
  string_literal: function string_literal(path, _ref2, print) {
    var preferSingleQuotes = _ref2.preferSingleQuotes;
    var string = path.getValue().body[0]; // If this string is actually a heredoc, bail out and return to the print
    // function for heredocs

    if (string.type === "heredoc") {
      return path.call(print, "body", 0);
    } // If the string is empty, it will not have any parts, so just print out the
    // quotes corresponding to the config


    if (string.body.length === 0) {
      return preferSingleQuotes ? "''" : "\"\"";
    } // Determine the quote to use. If we prefer single quotes and there are no
    // embedded expressions and there aren't any single quotes in the string
    // already, we can safely switch to single quotes.


    var quote = "\"";

    if (preferSingleQuotes && string.body.every(isSingleQuotable)) {
      quote = "\'";
    }

    var parts = [];
    string.body.forEach(function (part, index) {
      if (part.type === "@tstring_content") {
        // In this case, the part of the string is just regular string content
        parts.push(makeString(part.body, quote));
      } else {
        // In this case, the part of the string is an embedded expression
        parts.push(path.call(print, "body", 0, "body", index));
      }
    });
    return concat([quote].concat(parts, [quote]));
  },
  word_add: concatBody,
  word_new: empty,
  xstring: makeList,
  xstring_literal: function xstring_literal(path, opts, print) {
    return group(concat(["`", indent(concat([softline, join(softline, path.call(print, "body", 0))])), concat([softline, "`"])]));
  }
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * String literal syntax documentation from Ruby source (2.7.0-dev)
 *
 * Double-quote strings allow escaped characters such as <tt>\n</tt> for
 * newline, <tt>\t</tt> for tab, etc.  The full list of supported escape
 * sequences are as follows:
 *
 *   \a             bell, ASCII 07h (BEL)
 *   \b             backspace, ASCII 08h (BS)
 *   \t             horizontal tab, ASCII 09h (TAB)
 *   \n             newline (line feed), ASCII 0Ah (LF)
 *   \v             vertical tab, ASCII 0Bh (VT)
 *   \f             form feed, ASCII 0Ch (FF)
 *   \r             carriage return, ASCII 0Dh (CR)
 *   \e             escape, ASCII 1Bh (ESC)
 *   \s             space, ASCII 20h (SPC)
 *   \\             backslash, \
 *   \nnn           octal bit pattern, where nnn is 1-3 octal digits ([0-7])
 *   \xnn           hexadecimal bit pattern, where nn is 1-2 hexadecimal digits ([0-9a-fA-F])
 *   \unnnn         Unicode character, where nnnn is exactly 4 hexadecimal digits ([0-9a-fA-F])
 *   \u{nnnn ...}   Unicode character(s), where each nnnn is 1-6 hexadecimal digits ([0-9a-fA-F])
 *   \cx or \C-x    control character, where x is an ASCII printable character
 *   \M-x           meta character, where x is an ASCII printable character
 *   \M-\C-x        meta control character, where x is an ASCII printable character
 *   \M-\cx         same as above
 *   \c\M-x         same as above
 *   \c? or \C-?    delete, ASCII 7Fh (DEL)
 *
 * In addition to disabling interpolation, single-quoted strings also disable all
 * escape sequences except for the single-quote (<tt>\'</tt>) and backslash
 * (<tt>\\\\</tt>).
 */
var patterns = ["[abtnvfres\\\\]", // simple
"\\d{3}", // octal bits
"x[0-9a-fA-F]{2}", // hex bit
"u[0-9a-fA-F]{4}", // unicode char
"u\\{[0-9a-fA-F ]+\\}", // unicode chars
"c[ -~]|C\\-[ -~]", // control
"M\\-[ -~]", // meta
"M\\-\\\\C\\-[ -~]|M\\-\\\\c[ -~]|c\\\\M\\-[ -~]", // meta control
"c\\?|C\\-\\?" // delete
];
module.exports = new RegExp("\\\\(".concat(patterns.join("|"), ")"));

/***/ })
/******/ ]);
});