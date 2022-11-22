function computeVector(targetX, targetY, selfX, selfY) {
    const disX = targetX - selfX;
    const disY = targetY - selfY;
    const dis = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));

    return {
        x: disX / dis,
        y: disY / dis
    }
}

function computeRotation(targetX, targetY, selfX, selfY) {
    const disX = targetX - selfX;
    const disY = targetY - selfY;
    const dis = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
    let angle = 1;
    if (disY < 0) {
        angle = -1;
    }

    if (disX === 0 || dis === 0) {
        return angle * Math.PI / 2;
    }

    return angle * Math.acos((Math.pow(disX, 2) + Math.pow(dis, 2) - Math.pow(disY, 2)) / (2 * disX * dis))
}

function quad(t, p1, cp, p2) {
    const x = Math.pow(1 - t, 2) * p1.x + 2 * (1 - t) * t * cp.x + Math.pow(t, 2) * p2.x;
    const y = Math.pow(1 - t, 2) * p1.y + 2 * (1 - t) * t * cp.y + Math.pow(t, 2) * p2.y;
    return {
        x,
        y
    };
}

/**
 * @description: 求图片的缩放比例
 * @param {*} width
 */
function scaleAdaptation(width) {
    const val = screenW / width;
    if (val > 1) {
        return 1 / val;
    }
    return val;
}

function rem2px(num) {
    const font = document.documentElement.style.fontSize
    return num * parseFloat(font);
}

function justQuadrant(r) {
    if (r > 0 && r < Math.PI / 2) {
        return 4;
    } else if (r > 0 && r > Math.PI / 2) {
        return 3;
    } else if (r < 0 && Math.abs(r) > Math.PI / 2) {
        return 2;
    } else {
        return 1;
    }
}

function getConfig(type) {
    const localConfig = getLocalStorage(type) || {};

    if (type === 'baseConfig') {
        return {
            point0: 3,
            point1: 3,
            point2: 3,
            timeCount: 30,
            stickY: 2.5,
            ...localConfig
        }
    } else if (type === 'roleConfig') {
        return {
            moveSpeed: 200,
            bulletDis: 500,
            bulletSpeed: 700,
            life: 10,
            roleScale: 0.7,
            scaleAnTime: 400,
            ...localConfig
        }
    } else if (type === 'fireConfig') {
        return {
            petFireSpeed: 500,
            petFireDis: 100,
            petFireCount: 5,
            petFireCreateDis: 1000,
            fireScale: 0.2,
            ...localConfig
        }
    } else if (type === 'tornadoConfig') {
        return {
            tornadosRotationSpeed: 0.04,
            tornadosCount: 6,
            tornadoScale: 0.3,
            ...localConfig
        }
    } else if (type === 'knifeConfig') {
        return {
            knifeCount: 6,
            knifeCreateDis: 300,
            knifeSpeed: 500,
            knifeScale: 0.2,
            ...localConfig
        }
    } else if (type === 'enemyConfig') {
        return {
            moveSpeed: 100,
            createDis: 800,
            createNum: 1,
            maxCount: 80,
            life: 1,
            juryTime: 500,
            deadTime: 200,
            deadDis: 4,
            createScope: 2,
            ...localConfig
        }
    } else if (type === 'enemyConfig2') {
        return {
            moveSpeed: 150,
            createDis: 800,
            createNum: 5,
            maxCount: 80,
            life: 1,
            ...localConfig
        }
    } else if (type === 'enemyConfig3') {
        return {
            moveSpeed: 300,
            createDis: 800,
            createNum: 10,
            maxCount: 80,
            life: 2,
            ...localConfig
        }
    } else {
        return localConfig
    }
    if (!localConfig) {}

    return localConfig;
}

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, val) {
    if (val) {
        localStorage.setItem(key, JSON.stringify(val));
    }
}

const trackGA = window.sendTrackEvent || function () {

}