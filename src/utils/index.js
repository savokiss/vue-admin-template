// 根据姓名生成两个字名字用于没有默认头像的显示
export function getShortName (name) {
  let index = name.indexOf('(')
  if (index > -1) {
    return name.slice(0, index).slice(-2)
  }
  return name.slice(-2)
}

export default {
  getShortName
}
