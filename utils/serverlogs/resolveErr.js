const axios = require('axios')
const fs = require('fs')
const crypto = require('crypto')
const config = require('./reward-config')
const urlList = []

function generateMD5(data) {
    const md5sum = crypto.createHash('md5')
    const hash = md5sum.update(data).digest('hex')
    return hash
}

function qs(str) {
    const arr1 = str.split('&')
    const res = {}
    arr1.map((item) => {
        const [key, value] = item.split('=')
        res[key] = value
    })

    return res
}

function createSerial(params) {
    const timestamp = new Date().getTime()
    const constNum = 100000000
    params.serialNo = generateMD5(
        params.userId +
            params.activityCode +
            params.roleId +
            timestamp +
            timestamp * constNum +
            Math.floor(Math.random() * constNum)
    )
    return params.serialNo
}

function resolve2() {
    const path = './serverlogs/all'
    const info = {}

    fs.readFile(path, (err, data) => {
        const temp = data.toString().split('\n')
        for (let i = 0; i < temp.length; i += 2) {
            const userId = temp[i].split(' ')[3]
            const rewardCode = temp[i].split(' ')[5]
            const url = temp[i + 1].split(' ')[3].split('?')[1]
            const params = qs(url)
            const obj = config.find((item) => item.rewardCode === rewardCode)
            const title = obj.rewardTitle
            const content = obj.rewardContent
            const packageId = obj.rewardId
            createSerial(params)
            const sendurl = `activityCode=${params.activityCode}&gameCode=${
                params.gameCode
            }&serverCode=${params.serverCode}&roleId=${
                params.roleId
            }&userId=${userId}&packageId=${packageId}&title=${encodeURIComponent(
                title
            )}&content=${encodeURIComponent(content)}&serialNo=${
                params.serialNo
            }&language=${params.language}`
            info[userId] = {
                rewardCode,
                url,
                params,
                sendurl,
            }
            urlList.push(sendurl)
        }
        sendReward()
    })
}
resolve2()

function sendReward() {
    const requestList = []

    for (let i = 0; i < urlList.length; i++) {
        const url = urlList[i]
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

    Promise.all(requestList).then((res) => {
        console.log('成功：', res.filter((item) => item.code === '1000').length)
        console.log('失败：', res.filter((item) => item.code !== '1000').length)
        fs.writeFile('./res.json', JSON.stringify(res), () => {})
    })
}

function test(url) {
    const temp = []
    for (let i = 0; i < config.length; i++) {
        const item = config[i]
        const title = item.rewardTitle
        const content = item.rewardContent
        const packageId = item.rewardId

        const params = {
            userId: '4002018675',
            roleId: '401000000004837',
            activityCode: 'cocmwOneYear',
        }
        createSerial(params)
        const serialNo = params.serialNo
        const url = `activityCode=cocmwOneYear&gameCode=cocmw&serverCode=4&roleId=${params.roleId}&userId=${params.userId}&packageId=${packageId}&title=${title}&content=${content}&serialNo=${serialNo}&language=ko-KR`

        temp.push(
            axios
                .get('https://award.chaseol.com/v2/sendAward.shtml?' + url)
                .then((response) => {
                    console.log(
                        '🚀 ~ file: resolveErr.js:98 ~ response:',
                        response.data
                    )
                    return { url, ...response.data }
                })
                .catch((error) => {
                    console.log('🚀 ~ file: resolveErr.js:109 ~ error:', error)
                    return { url, ...error }
                })
        )
    }
    Promise.all(temp).then((res) => {
        console.log('成功：', res.filter((item) => item.code === '1000').length)
        console.log('失败：', res.filter((item) => item.code !== '1000').length)
        fs.writeFile('./res.json', JSON.stringify(res), () => {})
    })
}
// test()
