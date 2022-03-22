//git clone https://github.com/psp0/pokeOST.git

//클론하면 계정 변경 할것
//git config user.name "psp0"
//git config user.email "tkdvlf9058@g.hongik.ac.kr"

//수정하는 법(새로 repository 파야함)
// git filter-branch -f --env-filter "
//     GIT_AUTHOR_NAME='psp0'
//     GIT_AUTHOR_EMAIL='tkdvlf9058@g.hongik.ac.kr'
//     GIT_COMMITTER_NAME='psp0'
//     GIT_COMMITTER_EMAIL='tkdvlf9058@g.hongik.ac.kr'
//   " HEAD

//git push origin master

//git remote set-url origin https://psp0@github.com/psp0/pokeOST.git
var http = require("http");
var fs = require("fs");
var url = require("url");


var mktemplate ={
    html:function (title, body, list) {
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
    },
    list:function (object, root) {
        var list = "<ul>";
        var count = object.length;
        var i = 0;
        while (i < count) {
            if (root == "") var href = `/?id=${object[i]}`;
            else var href = root;
            list += `<li><a href='${href}'> ${object[i]} </a></li>`;
            i++;
        }
        list += "</ul>";
        return list;
    }
}

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var pathname = url.parse(_url, true).pathname;
    var querydata = url.parse(_url, true).query;
    if (pathname === "/") {
        if (querydata.id === undefined) {
            fs.readdir("./data", function (error, dirlist) {
                var title = "home";
                var list = mktemplate.list(dirlist, "");
                var template = mktemplate.html(title, `<h1>Sound Track</h1>`, list);
                response.writeHead(200);
                response.end(template);
            });
        } //enter root
        else {
            fs.readdir(`./data/${querydata.id}`, function (err, mp3) {
                var title = `${querydata.id}`;
                var list = mktemplate.list(mp3, "./data");
                var template = mktemplate.html(title,`<h6><a href='./'>Back</a></h6>`,list);
                response.writeHead(200);
                response.end(template);
            }); //rd close
        } //enter querysting
    }//first if close
    else {
    response.writeHead(404);
    response.end("Not found");
  } //enter other folders
}); //app close

app.listen(3001);
