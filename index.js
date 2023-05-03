const fs = require("fs");
const http=require('http');

const server=http.createServer((req,res)=>{
    console.log('server created');
    if(req.url==='/'){
        fs.readFile('form.txt','utf8',(err,data)=>{
            if(err){
                console.log(err);
            }
            res.setHeader('Content-type','text/html');
            res.write('<html>');
            res.write('<head><title>React app</title></head>');
            res.write(`<body><h1>${data}</h1></body>`);
            res.write(`<form action=/message method=POST ><input type=text name=msg><button>Add</button></form></body`);
            res.write('</html>');
            return res.end()
        });
        return;
    }else if(req.url==='/home'){
        res.setHeader("Context-type", "text/html");
          res.write("<html>");
          res.write("<head><title>myapplication</title></head>");
          res.write("<body><h1>Welcome home</h1></body>");
          res.write(`</html>`);
          return res.end();
    }else if(req.url==='/message' && req.method==='POST'){
        var body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        return req.on('end',()=>{
            let parseBody=Buffer.concat(body).toString();
            let msgVal=parseBody.split('=')[1];
            fs.writeFileSync('form.txt',msgVal);
            res.statusCode=302;
            res.setHeader('Location','/');
            return res.end()
        })
    }
    res.write("<body><h1>OOps Page not fount 404</h1></body>");
    return res.end()
});
server.listen(8000,()=>{
    console.log('8000 server created');
})
