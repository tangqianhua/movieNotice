const puppeteer = require('puppeteer')
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
  page.on('console', msg => {
    for (let i = 0; i < msg.args().length; ++i)
      console.log(`${i}: ${msg.args()[i]}`); 
  });

  /*
    到指定页面的网址
  */
  await page.goto('https://movie.douban.com/tag/#/?sort=R&range=6,10&tags=', {waitUntil: 'networkidle2'})


  /*
    截图并保存到当前路径，名称为example.png
  */
  await page.screenshot({path: 'example.png'})
  console.log('截图')
  /*
    等待指定的选择器匹配的元素出现在页面中
  */
  await sleep(3000)
  await page.waitForSelector('.more')
  
  /*
    此方法找到一个匹配 selector 选择器的元素，
    如果需要会把此元素滚动到可视，然后通过 page.mouse 点击它。
    如果选择器没有匹配任何元素，此方法将会报错
  */
  await page.click('.more')
  /*
    要在页面实例上下文中执行的方法
  */
  const result = await page.evaluate(() => {
    var $ = window.$
    var items = $('.list-wp a')
    var content = []
    if (items.length) {
      items.each((index, domEle) => {
        const self = $(domEle)
        const doubanId = self.find('div').data('id')
        const title = self.find('.title').text()
        const rate = self.find('.rate').text()
        const poster = self.find('img').attr('src').replace('s_ratio', 'l_ratio')
        content.push({
          doubanId,
          title,
          poster,

        })
      })
    }
    return content
  })

  await brower.close()

  /*
    将内容发送给子进程
  */
  process.send({ result })
  process.exit(0)
})()