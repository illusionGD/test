const ftp = require("basic-ftp")

async function uploadFile() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "101.33.196.228",
            user: "root",
            password: "hollow14250*",
            secure: true
        })
        console.log(await client.list())
        await client.ensureDir('https://101.33.196.228')
        await client.clearWorkingDir()
        await client.uploadFromDir("my/local/directory")
        await client.close()
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}

uploadFile()