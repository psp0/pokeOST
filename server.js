var http = require("http");
var fs = require("fs");
var url = require("url");

function templateHTML(title, body, list) {
  return `
  <!DOCTYPE html>
  <html lang="kr">
    <head>
      <meta charset = "UTF-8">
      <title>PokeOST ${title}</title>
      <script src = "map.js"></script>
    </head>  
    <body>
      ${body}
      ${list}
    </body>
  </html>  
  `;
}

function templateList(object,root) {
  var list = "<ul>";
  var count = object.length;
  var i = 0;
  
  while (i < count) {
    if (root == '') var href = `/?id=${object[i]}`; 
    else var href = root;
    list += `<li><a href='${href}'> ${object[i]} </a></li>`;
    i++;
    }  
  list += "</ul>";
  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var pathname = url.parse(_url, true).pathname;
  var querydata = url.parse(_url, true).query;

  //enter root
  if (pathname === "/") {

    if (querydata.id === undefined) {
      fs.readdir("./data", function (error, dirlist) {
        var title = "home";
        var list = templateList(dirlist,'');
        var template = templateHTML(title, `<h1>Sound Track</h1>`, list);
        response.writeHead(200);
        response.end(template);
      });
    } //enter root
    else {
      fs.readdir(`./data/${querydata.id}`, function (err, mp3) {
        var title = `${querydata.id}`;
        var list = templateList(mp3,'./data');
        var template = templateHTML(title,`<h6><a href='./'>Back</a></h6>`,list);
        response.writeHead(200);
        response.end(template);
      }); //rd close
    } //enter querysting

  } //first if close
  else {
    response.writeHead(404);
    response.end("Not found");
  }//enter other folders

}); //app close

app.listen(3001);
