const readline = require('readline')
const fs = require('fs')
const paths = [
    './serverlogs/cocmw-one-year-0829-01.log',
    './serverlogs/cocmw-one-year-0829-02.log',
    './serverlogs/cocmw-one-year-0830-01.log',
    './serverlogs/cocmw-one-year-0830-02.log',
]

const info = {}
let i = 0
const urlList = []

paths.forEach((path) => {
    const fileStream = fs.createReadStream(path)
    const rl = readline.createInterface({
        input: fileStream,
    })

    rl.on('line', (line) => {
        const pa = line.split('?')[1]
        const params = qs(pa)
        if (!urlList.find((item) => item.includes(params.serialNo))) {
            urlList.push(pa.split(' ')[0])
        }
        params.language = params.language.split(' ')[0]
        !info[params.userId] && (info[params.userId] = [])
        info[params.userId].push(params)
    })

    rl.on('close', () => {
        i++
        if (i >= paths.length) {
            console.log('读取文件结束。')
            console.log(Object.keys(info).length + '个用户')
            fs.writeFile(
                './serverlogs/data.json',
                JSON.stringify(info),
                () => {}
            )
            fs.writeFile(
                './serverlogs/url.json',
                JSON.stringify(urlList),
                () => {}
            )
        }
    })
})
function qs(str) {
    const arr1 = str.split('&')
    const res = {}
    arr1.map((item) => {
        const [key, value] = item.split('=')
        res[key] = value
    })

    return res
}
