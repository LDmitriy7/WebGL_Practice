export function expose(obj: object) {
  Object.assign(window, obj)
}
