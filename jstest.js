express = require("express");
jade = require("jade");
JSONMIME = 'application/json'
    
app = express.createServer();
app.use(express.bodyParser());
app.use(app.router);
app.set('view engine', 'jade');
app.set('views', __dirname + '/');
app.set("view options", { layout: false });

writeObj = function (resp,obj) { 
    resp.setHeader('Content-Type',JSONMIME); 
    resp.writeHead(200);
    resp.write(JSON.stringify(obj));
    resp.end(); 
}
randomObj = function (arr) { 

  var index = Math.floor(Math.random()*arr.length)%arr.length;
  return arr[index];
}

service1 = function (req, resp) { 
    var num;
    num = (Math.floor((Math.random()*2))%2+1);
    writeObj(resp,{a:num});
}

service2 = function (req, resp) {  
    var num = Number(req.query.query);
    var arr = [{b:(num+1)},{b:(num+2)},{b:(num+3)}]; 
    writeObj(resp,randomObj(arr));
} 

service3 = function (req,resp) { 
    var x = Number(req.query.q1); 
    var y = Number(req.query.q2); 
    var arr=[{c:(1 + x + y)}, {c:(2 + x + y)}, {c:(3 + x + y)}, {c:(4 + x + y)}];
    writeObj(resp,randomObj(arr)); 
}

base = function(req,resp) { 
    resp.render('index');
}

app.get('/query/1',service1);
app.get('/query/2',service2);
app.get('/query/3',service3); 

app.get('/',base);
app.use('/js', express.static(__dirname + '/js'));

app.listen(9000);


