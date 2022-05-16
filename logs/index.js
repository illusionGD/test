const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('./[213服务器]activity-nest-cn-out.log')
});

let sum = 0;
let isLogs = false
const res = []
console.log(isLogs);
const lotteryAPi = '/common/public/lottery'
const giveFragApi = '/cnzm/collect-frag/giveFrag'

rl.on('line', (line) => {
    // console.log(line);
    const arr = line.split(' ');
    if (/^18:[0-1][0-4]/.test(arr[1])) {
        isLogs = true
        // console.log('访问时间：%s %s，访问地址：%s', arr[0], arr[1], arr[13]);
    }
    if (isLogs && line.includes(`Request original url: ${giveFragApi}`)) {
        sum += 1;
        res.push(line.trim());
        isLogs = false
    }
});

rl.on('close', () => {
    console.log(sum);
    const data = JSON.stringify(res)
    fs.writeFileSync('./give2.json', data)
});