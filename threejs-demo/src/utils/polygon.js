import {
    Line,
    Vector3,
    LineBasicMaterial,
    BufferGeometry,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
} from "three";

/**
 * @description: 创建并添加物体到场景
 * @param {*} type 物体类型，box-几何体，line-线，mesh-面
 * @param {*} mtl   材质对象
 * @param {*} vector 物体长宽高，xyz
 * @param {*} points 点集合，用于画线
 * @param {*} scene 场景对象
 * @return {*}
 */
export function createAndAddPolygon({
    type,
    mtl,
    vector,
    points,
    scene
}) {
    const options = {
        type,
        mtl,
        vector,
        points,
        scene
    }
    const polygon = createPolygon(options)
    addPolygonToScene(polygon, scene)
    return polygon
}

/**
 * @description: 添加物体到场景中
 * @param {*} geometry 物体
 * @param {*} scene 场景
 * @return {*}
 */
export function addPolygonToScene(geometry, scene) {
    scene.add(geometry);
}

/**
 * @description: 创建物体
 * @param {*} options 配置对象
 * @return {*}
 */
export function createPolygon(options) {
    const {
        type,
        vector,
        material
    } = options

    const _geometry = createGeometry(options);
    const _material = createMaterial(type === 'line' ? type : 'mesh', material);

    const cube = createMesh(type === 'line' ? type : 'mesh', _geometry, _material);

    return cube
}

/**
 * @description: 创建几何体对象
 * @param {*} options 配置
 * @return {*}
 */
export function createGeometry(options) {
    const {
        type,
        vector,
        points
    } = options
    const geometryMap = {
        'box': () => (new BoxGeometry(...vector)),
        'line': () => (new BufferGeometry().setFromPoints(points))
    }

    return geometryMap[type]()
}

/**
 * @description: 创建材质对象
 * @param {*} type
 * @param {*} material
 * @return {*}
 */
export function createMaterial(type, material) {
    const materialMap = {
        'line': () => (new LineBasicMaterial(material)),
        'mesh': () => (new MeshBasicMaterial(material))
    }

    return materialMap[type]()
}

/**
 * @description: 创建面对象
 * @param {*} type
 * @param {*} geometry
 * @param {*} material
 * @return {*}
 */
export function createMesh(type, geometry, material) {
    const meshMap = {
        'mesh': () => (new Mesh(geometry, material)),
        'line': () => (new Line(geometry, material))
    }

    return meshMap[type]()
}