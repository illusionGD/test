export interface RespondData_Type {
    code?: string,
    message?: string,
    data?: any
}

export interface InterValTimer_type {
    flag: boolean | undefined
}

export interface Particle_type {
    /**宽 */
    w: number
    /**高 */
    h: number
    /**x坐标 */
    x: number
    /**y坐标 */
    y: number
    /**x方向位移单位 */
    vx: number
    /**y方向位移单位 */
    vy: number
    /**颜色 */
    color: string
}