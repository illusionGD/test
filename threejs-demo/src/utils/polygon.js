import {
    Line,
    Vector3,
    LineBasicMaterial,
    BufferGeometry,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
} from "three";

export function createAndAddPolygon({
    type,
    gty,
    mtl,
    scene
}) {
    const cube = createPolygon({
        type,
        gty,
        mtl
    })
    addPolygonToScene(cube, scene)
    return true
}

export function addPolygonToScene(polygon, scene) {
    scene.add(polygon);
}

export function createPolygon(options) {
    const {
        type,
        position,
        material
    } = options
    const _geometry = createGeometry(options);
    const _material = createMaterial(type === 'line' ? type : 'mesh', material);

    const cube = createMesh(type === 'line' ? type : 'mesh', _geometry, _material);

    return cube
}

export function createGeometry(options) {
    const {
        type,
        position,
        points
    } = options
    const geometryMap = {
        'box': () => (new BoxGeometry(...position)),
        'line': () => (new BufferGeometry().setFromPoints(points))
    }

    return geometryMap[type]()
}

export function createMaterial(type, material) {
    const materialMap = {
        'line': () => (new LineBasicMaterial(material)),
        'mesh': () => (new MeshBasicMaterial(material))
    }

    return materialMap[type]()
}

export function createMesh(type, geometry, material) {
    const meshMap = {
        'mesh': () => (new Mesh(geometry, material)),
        'line': () => (new Line(geometry, material))
    }

    return meshMap[type]()
}