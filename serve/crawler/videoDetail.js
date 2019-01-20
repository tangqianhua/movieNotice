const puppeteer = require('puppeteer')

const doubanId = '27604296'
const videoUrl =  `https://movie.douban.com/subject/${doubanId}/`
;(async () => {
  const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
  })

  /**
   * 用指定选项启动一个Chromium浏览器实例
   */ 
  const brower = await puppeteer.launch()

  /*
    创建一个页面.
  */
  const page = await brower.newPage()
  console.log('页面初始化成功')
  /*
    到指定页面的网址
  */
  await page.goto(videoUrl, {waitUntil: 'networkidle2'})
  console.log('视频信息页面跳转成功')

  /*
    截图并保存到当前路径，名称为example.png
  */
  /*
    等待指定的选择器匹配的元素出现在页面中
  */
  await sleep(3000)
  /*
    要在页面实例上下文中执行的方法
  */
  const result = await page.evaluate(() => {
    const $ = window.$

    /*
      获取视频标签
    */
    const items = $('.related-pic-video')

    /*
      播放视频的链接
    */
    const link = items.attr('href')

    /*
      视频的图片
    */
    const cover = items.attr('style').split('url(')[1].split(')')[0]
    
    return {
      link,
      cover
    }
  })

  console.log('视频跳转链接跟图片')

  let videoInfo = ''
  if (result.link) {
    await page.goto(result.link, {waitUntil: 'networkidle2'})
    await sleep(3000)

    videoInfo = await page.evaluate(() => {
      const $ = window.$
      const item = $('source')
      if (item) {
        const source = item.attr('src')
        return {source}
      }
      return ''
    })
  }
  const data = {
    doubanId,
    video: videoInfo.source,
    cover: result.cover
  }

  await brower.close()

  /*
    将内容发送给子进程
  */
  process.send(data)
  process.exit(0)
})()