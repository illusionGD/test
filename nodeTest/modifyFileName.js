const fs = require('fs')
const path = require('path')

const batch = [
    {
        directory:
            'E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-fly', // 指定目录路径
        newName: 'role-fly-', // 新文件名
    },
    {
        directory:
            'E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-gl', // 指定目录路径
        newName: 'role-gl-', // 新文件名
    },
    {
        directory:
            'E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-hl', // 指定目录路径
        newName: 'role-hl-', // 新文件名
    },
    {
        directory:
            'E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-jlk', // 指定目录路径
        newName: 'role-jlk-', // 新文件名
    },
    {
        directory:
            'E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-lly', // 指定目录路径
        newName: 'role-lly-', // 新文件名
    },
    {
        directory:
            'E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-yg', // 指定目录路径
        newName: 'role-yg-', // 新文件名
    },
    {
        directory:
            'E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-yrly', // 指定目录路径
        newName: 'role-yrly-', // 新文件名
    },
    {
        directory:
            'E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-zxz', // 指定目录路径
        newName: 'role-zxz-', // 新文件名
    },

    // {
    //     directory: 'E:/web/切图/马赛克官网/序列帧输出/【最新情報】執行者-攻擊', // 指定目录路径
    //     newName: 'role-zxz-attack', // 新文件名
    // },
    // {
    //     directory:
    //         'E:/web/切图/马赛克官网/序列帧输出/【遊戲特征】捷利卡-wait_guide', // 指定目录路径
    //     newName: 'role-jlk-wait', // 新文件名
    // },
    // {
    //     directory: 'E:/web/切图/马赛克官网/序列帧输出/【特典】執行者-跑動', // 指定目录路径
    //     newName: 'role-zxz-run', // 新文件名
    // },
]

batch.forEach((item) => {
    const { directory, newName } = item
    fs.readdir(directory, (err, files) => {
        if (err) throw err
        files.forEach((file, index) => {
            const oldPath = path.join(directory, file)
            const { dir, name, ext } = path.parse(oldPath)
            const newPath = path.format({
                dir,
                name: newName + `${index}`,
                ext,
            })
            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err
                console.log(`${oldPath} renamed to ${newPath}`)
            })
        })
    })
})
