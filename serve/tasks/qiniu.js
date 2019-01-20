const qiniu = require('qiniu')
const nanoid = require('nanoid')
const con = require('../config/index.js')
const log = console.log
// 七牛域名
const domain = 'http://plijt0d5j.bkt.clouddn.com/'

/*
  官方代码，上抓取网络资源到空间
*/
const mac = new qiniu.auth.digest.Mac(con.qiniu.AK, con.qiniu.SK)
const qiniuConfig  = new qiniu.conf.Config();
qiniuConfig.zone = qiniu.zone.Zone_z0
log('初始化七牛-----')
var bucketManager = new qiniu.rs.BucketManager(mac, qiniuConfig);


const upload = async (url, key) => {
  return new Promise((resolve, reject) => {
    /*
      example  https://developer.qiniu.com/kodo/sdk/1289/nodejs#7  =>  资源管理
      从指定 URL 抓取资源，并将该资源存储到指定空间中。每次只抓取一个文件，抓取时可以指定保存空间名和最终资源名
      api   https://developer.qiniu.com/kodo/api/1263/fetch
    */
    bucketManager.fetch(url, con.qiniu.bucket, key, function(err, respBody, respInfo) {
      if (err) {
        console.log(err);
      } else {
        if (respInfo.statusCode == 200) {
          log('上传成功---------')
          resolve(respBody)
        } else {
          reject(respInfo)
        }
      }
    })
  })
}


;(async () => {
  const movie = [{
    doubanId: '27604296',
    video: 'http://vt1.doubanio.com/201901191356/280470d7560dea061bd6cf67e3a67653/view/movie/M/402420027.mp4',
    cover: 'https://img3.doubanio.com/img/trailer/medium/2545480803.jpg?1547537473',
    poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2545486388.jpg'
  }]
  log('准备上传--------')
  movie.map(async (item) => {
    try {
      const videoDate = await upload(item.video, nanoid()+'.mp4')
      const coverDate = await upload(item.cover, nanoid()+'.jpg')
      const posterDate = await upload(item.poster, nanoid()+'.jpg')

      videoDate ? item.videoKey = videoDate.key : ''
      coverDate ? item.coverKey = coverDate.key : ''
      posterDate ? item.posterKey = posterDate.key : ''
    } catch (error) {
      console.log(error)
    }
  })
})()