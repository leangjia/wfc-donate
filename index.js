var express = require('express');
var app = express();
var path = require('path');
var bitcoin = require('bitcoin');
var StringBuffer = require("stringbuffer");
var redism=require("redis");
var uuidv1 = require('uuid/v1');
var timeout =3600;
var serport=8089;
var client = new bitcoin.Client({
  host: 'localhost',
  port: 9665,
  user: '1234',
  pass: '1234',
  timeout: 30000
});
function setcor(res) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
}
app.use(express.static(path.resolve(__dirname, './dist')))

app.get('/', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
    res.send(html)
})
//根据addr地址验证此地址是否是合法的wfc地址
app.get('/checkaddr/:addr', function(req, res){
 setcor(res);
 var wdaddr=req.params.addr;
 client.validateAddress(wdaddr, function(err, txid, resHeaders) {
                    if (txid.isvalid) {
                            var err = {};
                            err.code = 200;
                            err.msg = "WFC地址正确"
                            res.json(err);
                    } else {
                        var err = {};
                        err.code = 901;
                        err.msg = "WFC地址不正确"
                        res.json(err);
                    }
  });
})
var server = app.listen(serport, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});
