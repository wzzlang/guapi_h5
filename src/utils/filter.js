// 价格保留两位小数
export let toFixed = value => {
  if (value) {
    return Number(value).toFixed(2)
  } else {
    return 0
  }
}
// 保留整数
export let int = value => {
  if (value) {
    return parseInt(value)
  } else {
    return 0
  }
}
// 云仓订单状态显示
export let cstatus = value => {
  let name = ''
  value = parseInt(value)
  name = value === 0 ? '等待付款' : value === 1 ? '等待发货' : value === 2 ? '正在发货' : value === 3 ? '已经发货' : value === -1 ? '发货取消' : '未知状态'
  return name
}
// 13位时间戳转时间
export let time = (value, fmt) => {
  if (!fmt) {
    fmt = 'yyyy-MM-dd hh:mm:ss'
  }
  let getDate = new Date(value * 1000)
  let o = {
    'M+': getDate.getMonth() + 1,
    'd+': getDate.getDate(),
    'h+': getDate.getHours(),
    'm+': getDate.getMinutes(),
    's+': getDate.getSeconds(),
    'q+': Math.floor((getDate.getMonth() + 3) / 3),
    'S': getDate.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
