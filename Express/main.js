const express = require('express');   // express module import
const app = express();                // express 모듈 자체를 호출함 (객체 return)

const fs = require('fs');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
app.use(helmet());    // 보안용

const indexRouter = require('./routes/index');
const topicRouter = require('./routes/topics');


//application-level middlewear
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(compression());
app.get('*', function(request, response, next){
  // get 방식에 한해서 middlewear 실행
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next(); // 이어서 실행될 middlewear 호출
  });
});

app.use('/', indexRouter);        // '/'으로 시작하는 주소들에게 indexRouter를 적용하겠다
app.use('/topic', topicRouter);   // '/topic'으로 시작하는 주소들에게 topicRouter를 적용하겠다


app.use(function(request, response, next){
  response.status(404).send("Sorry, can't find that!");
});

app.use(function(err, request, response, next){     // 인자가 err일 경우, 인자가 4개인 이 middlewear가 실행됨
  //console.error(err.stack);
  response.status(500).send("Something is wrong!");
});


app.listen(3030, function() {
  console.log('Example app listening on port 3030!');
});