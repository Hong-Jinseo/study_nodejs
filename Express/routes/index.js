const express = require('express');     // express module import
const router = express.Router();        // express의 method인 router 호출

const template = require('../lib/template.js');

// router.get('/', (req, res) => res.send('Hello World!'));
router.get('/', function(request, response){
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}
      <img src="/images/hello.jpg" style="width:400px; display:block; margin:10px;">`,
      `<a href="/topic/create">create</a>`
    );
    response.send(html);
});

module.exports = router;