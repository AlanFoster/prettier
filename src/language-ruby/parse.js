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
