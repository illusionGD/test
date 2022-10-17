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