export function elapse(callback: () => void, times = 1) {
  const time = performance.now()
  while (times > 0) {
    callback()
    times--
  }
  const elapsed = performance.now() - time
  console.log("Elapsed: " + elapsed)
}
