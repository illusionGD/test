const fs = require('fs')
const emlformat = require('eml-format')
// const xlsx = require('node-xlsx')
// const excelFilePath = './活动数据查询.xlsx'
// const sheets = xlsx.parse(excelFilePath)

// const codeList = sheets[0].data.slice(1).map((item) => {
//     return {
//         serial: item[1],
//         userid: item[5],
//     }
// })

const fileList = []
const resMap = {}

fs.readdir('./email-err', (err, files) => {
    files.forEach((path) => {
        fileList.push('./email-err/' + path)
    })
    exportEmailInfo()
})

function exportEmailInfo() {
    fileList.forEach((file) => {
        const eml = fs.readFileSync(file, 'utf-8')
        emlformat.read(eml, function (error, data) {
            if (error) return console.log(error)
            const rewardInfo = JSON.parse(data.html.split('\r\n')[4])
            !resMap[rewardInfo.tableName] && (resMap[rewardInfo.tableName] = [])
            resMap[rewardInfo.tableName].push(rewardInfo.addMap)
            // const {
            //     setMap,
            //     conditionMap
            // } = rewardInfo
            // const {
            //     serial,
            // } = conditionMap
            // const userid1 = setMap.userid
            // const userid2 = codeList.find(item => item.serial === serial).userid
            // fs.appendFile('code.txt', `奖励名: 黃金鑰匙*5   userid: ${userid1}, ${userid2}   serial: ${serial}\n`, function () {});
        })
    })
    fs.writeFile('res/email.json', JSON.stringify(resMap), () => {
        console.log('success')
    })
}
