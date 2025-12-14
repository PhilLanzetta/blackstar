export default function (to, from, savedPosition) {
  if (to.hash) {
    return false
  }
  return { x: 0, y: 0 }
}
