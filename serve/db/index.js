const mongoose = require('mongoose');    //引用mongoose模块
module.exports = {
  connect: () => {
    return new Promise((resolve, reject) => {
      mongoose.connect('mongodb://localhost/crawlerMovie', {
        useCreateIndex: true,
        useNewUrlParser: true
      });
      const db = mongoose.connection;
      db.on('error', function (err) {
        reject(err)
      });
      db.once('open', function() {
        console.log('数据库连接成功')
        resolve()
      });
    })
  },
  initSchema: () => {
    require('./schema/users')
    require('./schema/movieList')
    require('./schema/categoty')
  }
}