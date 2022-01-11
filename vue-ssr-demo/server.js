const express = require('express');
const Vue = require('vue')
const app = express();
const renderer = require('vue-server-renderer').createRenderer();

app.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.send(html)
  })
})

app.listen(8080, ()=> {
  console.log('8080 finish')
})
