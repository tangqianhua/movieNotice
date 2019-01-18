const childProcess = require('child_process')
const { resolve } = require('path')

;(async () => {
  /*
    获取视频列表
  */ 
  const parentProcessUrl = resolve(__dirname, '../crawler/moviesList.js')

  /*
    利用子进程开启父进程
  */
  const child = childProcess.fork(parentProcessUrl)

  let invoked = false
  child.on('error', err => {
    if (invoked) return 
    invoked = true
    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return 
    invoked = true
    let err = code === 0 ? null : new Error('exit code ' + code)
    console.log('err', err)
  })

  /*
    拿到父进程返回的数据
  */
  child.on('message', data => {
    const { result } = data
  })

})()