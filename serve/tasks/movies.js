const rp = require('request-promise-native')

async function fetchDate(id){
  const url = `http://api.douban.com/v2/movie/${id}`

  const res = await rp(url)
  return res
}

;(async () => {

  const movies = [
    { doubanId: 26985127,
      title: '一出好戏',
      rate: 7.3,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2529571873.jpg' 
    },
    { doubanId: 30215922,
      title: '花之屋',
      rate: 7.1,
      poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2531109949.jpg' 
    },
    { doubanId: 26426194,
      title: '巨齿鲨',
      rate: 6.1,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2530572643.jpg' 
    }
  ]
  movies.map(async item => {
    let data = await fetchDate(item.doubanId)
    console.log(data)
  })

})()
