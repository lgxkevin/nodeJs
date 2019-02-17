
const fs = require('fs');

const requestHandler = (req,res) =>{
    const url = req.url;
    const method = req.method;
    if (url==='/'){
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name = "message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end();
    }
    if(url==="/message" && method==="POST"){
        const body = []
        //listen to certain events
        req.on('data',(chunk)=>{
            //cant work with chunk
            console.log(chunk)
            body.push(chunk);
        });
        req.on('end', ()=>{
            //use buffer to convert chunk to string
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1]
            fs.writeFileSync('message.txt',message,error=>{
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end()
            })
        })
        //302: re-direction
    }
    
    console.log(req.url,req.headers,req.method)
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>Hello World!</title></head>')
    res.write('<body><h1>Hello from node.js</h1></body>')
    res.write('</html>')
    res.end();
}

// module.exports = requestHandler;
module.exports = {
    handler: requestHandler,
    sometext: 'some hard coded text!'
}
