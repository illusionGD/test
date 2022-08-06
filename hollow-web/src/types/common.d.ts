type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never
type ReturnedPromiseResolvedType<T> = PromiseResolvedType<ReturnType<T>>
