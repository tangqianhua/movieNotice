const childProcess = require('child_process')
const { resolve } = require('path')

;(async () => {
  const parentProcessUrl = resolve(__dirname, '../crawler/index.js')
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

    child.on('message', data => {
      console.log('data')
    })

})()