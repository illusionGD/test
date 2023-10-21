const axios = require('axios')
const urlList = require('./url.json')
const fs = require('fs')
console.log('🚀 ~ file: request.js:3 ~ urlList:', urlList.length)
const requestList = []

for (let i = 0; i < urlList.length; i++) {
    const url = urlList[i]
    // console.log('🚀 ~ file: request.js:9 ~ url:', url)
    // requestList.push(
    //     axios
    //         .get('https://award.chaseol.com/v2/sendAward.shtml?' + url)
    //         .then((response) => {
    //             return { url, ...response.data }
    //         })
    //         .catch((error) => {
    //             return { url, ...error }
    //         })
    // )
}

// Promise.all(requestList).then((res) => {
//     console.log('成功：', res.filter((item) => item.code === '1000').length)
//     console.log('失败：', res.filter((item) => item.code !== '1000').length)
//     fs.writeFile('./res.json', JSON.stringify(res), () => {})
// })
