const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const other_page = fs.readFileSync('./other.ejs', 'utf-8');
const style_css = fs.readFileSync('./style.css', 'utf-8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

function getFromClient(request, response) {
    var url_parts = url.parse(request.url);
    switch (url_parts.pathname) {

        case '/':
            var content = ejs.render(index_page, {
                title: "Indexページ",
                content: "これはテンプレートを使ったサンプルページです。",
            });
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.write(content);
            response.end();
            break;

        case '/other.ejs':
            var content = ejs.render(other_page, {
                title: "Index",
                content: "これは新しく用意したページです。",
            });
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.write(content);
            response.end();
            break;

        case '/style.css':
            response.writeHead(200, {
                'Content-Type': 'text/css'
            });
            response.write(style_css);
            response.end();
            break;

        default:
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            response.end('no page...');
            break;
    }

    // var content = ejs.render(index_page,{
    //     title:"Indexページ",
    //     content:"これはテンプレートを使ったサンプルページです。",
    // });
    // response.writeHead(200, {
    //     'Content-Type': 'text/html'
    // });
    // response.write(content);
    // response.end();

    // fs.readFile('./index.html', 'utf-8',
    //     (error, data) => {
    //         response.writeHead(200, {
    //             'Content-Type': 'text/html'
    //         });
    //         response.write(data);
    //         response.end();
    //     });
}

// var server = http.createServer(
//     (request, response) => {
//         // response.end('Hello Node.js!');
//         // response.end('<html><body><h1>Hello</h1><p>Welcome to Node.js</p></body></html>');
//         // response.setHeader('Content-Type','text/html');
//         // response.write('<!DOCTYPE html><html lang="ja">');
//         // response.write('<head><meta charset="utf-8">');
//         // response.write('<title>Hello</title></head>');
//         // response.write('<body><h1>Hello Node.js!</h1>');
//         // response.write('<p>This is Node.js sample page.</p>');
//         // response.write('<p>これはNode.jsのサンプルページです。</p>','utf-8');
//         // response.write('</body></html>');
//         // response.end();
//         fs.readFile('./index.html','utf-8',
//         (error,data)=>{
//             response.writeHead(200,{'Content-Type':'text/html'});
//             response.write(data);
//             response.end();
//         });
//     }
// );