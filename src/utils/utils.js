export function sorted(arr, key) {
  const temp = Array.from(arr)
  console.log(arr)
  temp.sort((a,b) => (a[key] > b[key] ? 1 : -1))
  console.log(temp)
  return temp
}
