const badCode = "const s;";

eval(badCode);

window.addEventListener('load', () => {
    document.querySelector('.btn').addEventListener('click', () => {
        const badCode = "const s;";

        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1)
            }, 1000)

        }).then(res => {
            eval(badCode);
        })
        eval(badCode);
    })
})