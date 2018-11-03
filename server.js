var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var loginInfo = {};

var connection = mysql.createConnection({
    host: '52.79.250.40',
    user: 'root',
    password: '1234',
    port: 3306,
    database: 'WinterCoding'
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname+'/public'));

server.listen(3001, function() {
  console.log('Socket IO server listening on port 3001');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/login.html');
});

io.on('connection', function(socket){
    console.log('user connected');
    
    socket.on('disconnect',function(){
        console.log('user disconnected');
        socket.disconnect();
    });
    
    app.post('/trylogin',function(req,res){
        var query = "select password from user where id='"+req.body.id+"'";
        connection.query(query,function(err,row,field){
        if(!err){
            if(row.length==0 || req.body.pass!==row[0].password){
                console.log('Wrong ID or Password');
                io.emit('login fail');
            }
            else{
                console.log('login success');
                io.emit('login success');
                var ip = req.ip;
                loginInfo[ip] = req.body.id;
            }
        }
        else
            console.log(err);
        });
    });
    
    app.get('/index.html',function(req,res){
        res.sendFile(__dirname + '/index.html');
    })
    
    socket.on('index start',function(data){
        socket.emit('user info setting',{userid: loginInfo[socket.handshake.address]});
    });
    
    socket.on('get todolist',function(data){
        var query = "select * from todolist where id='"+data.userid+"' order by priority asc";
        connection.query(query,function(err,row,field){
        if(!err){
            var query2 = "select NOW() as now";
            connection.query(query2,function(err,row2,field){
                if(!err){
                    console.log('send todolist');
                    socket.emit('send todolist',{
                        queryData : row,
                        curTime : row2
                    });
                }
                else
                    console.log(err);
            });
        }
        else
            console.log(err);
        });
    });
    
    socket.on('checked control',function(data){
        var query = '';
        if(data.checked==='checked'){
            query = "update todolist set checked=1 where id='"+data.userid+"' and title='"+data.title+"'";
        }
        else{
            query = "update todolist set checked=0 where id='"+data.userid+"' and title='"+data.title+"'";
        }
        connection.query(query,function(err,row,field){
        if(!err){
            console.log('update checked');
        }
        else
            console.log(err);
        });
    });
    
    socket.on('delete node',function(data){
        var query = "delete from todolist where id='"+data.userid+"' and title='"+data.title+"'";
        connection.query(query,function(err,row,field){
        if(!err){
            console.log('delete list');
        }
        else
            console.log(err);
        });
    });
    
    socket.on('insert node',function(data){
        var query = "select COUNT(*) as cnt from todolist where id='"+data.userid+"'";
        connection.query(query,function(err,row,field){
        if(!err){
            var cnt = row[0].cnt+1
            var query2 = "insert into todolist(id,priority,title) values('"+data.userid+"',"+cnt+",'"+data.title+"')";
            connection.query(query2,function(err,row,field){
            if(!err){
                console.log('insert list');
            }
            else
                console.log(err);
            });
        }
        else
            console.log(err);
        });
    });
    
    socket.on('detail node',function(data){
        var query = "select * from todolist where id='"+data.userid+"' and title='"+data.title+"'";
        connection.query(query,function(err,row,field){
        if(!err){
            console.log('show detail node');
            socket.emit('show detail node',row);
        }
        else
            console.log(err);
        });
    });
    
    socket.on('detail change',function(data){
        var query = '';
        if(data.dtime!=''){
            query = "update todolist set title='"+data.title+"', contents='"+data.contents+"', stime='"+data.stime+"', etime='"+data.dtime+"' where id='"+data.userid+"' and title='"+data.pretitle+"'";
        }
        else{
            query = "update todolist set title='"+data.title+"', contents='"+data.contents+"', stime='"+data.stime+"' where id='"+data.userid+"' and title='"+data.pretitle+"'";
        }
        connection.query(query,function(err,row,field){
        if(!err){
            console.log('detail change success');
            socket.emit('detail change success',{
                title: data.title,
                stime: data.stime,
                dtime: data.dtime
            });
        }
        else
            console.log(err);
        });
    });
    
    socket.on('priority change',function(data){
        //console.log(data.priority);
        for(var i=0; i<data.priority.length; i++){
            var query = "update todolist set priority="+(i+1)+" where id='"+data.userid+"' and title='"+data.priority[i]+"'";
            connection.query(query,function(err,row,field){
                if(err){
                    console.log(err);
                }
            });
        }
        console.log("priority change success");
    });
});