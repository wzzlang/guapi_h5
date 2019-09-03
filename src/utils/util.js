import Vue from 'vue'
class Util {
  // 验证手机号码格式
  isPhone (phone) {
    if (!(/^[0-9]+$/.test(phone))) {
      util.toast('手机号码格式不正确')
      return false
    } else {
      return true
    }
  }
  // 验证是否输入为空
  isEmpty (str, notice) {
    if (!str) {
      str = ''
    }
    if (str.replace(/\s*/g, '').length === 0) {
      let noticeStr = '输入不能为空'
      if (notice) {
        noticeStr = notice
      }
      util.toast(noticeStr)
      return false
    } else {
      return true
    }
  }
  // 验证密码格式是否输入正确
  isPassword (str) {
    if (str.replace(/\s*/g, '').length < 6) {
      util.toast('密码最短6位')
      return false
    } else {
      return true
    }
  }
  // 显示加载动画
  loading () {
    Vue.$indicator.open({
      spinnerType: 'fading-circle'
    })
  }
  // 关闭加载动画
  close () {
    Vue.$indicator.close()
  }
  // 弹框提醒
  toast (str) {
    Vue.$toast({
      message: str,
      duration: '1500'
    })
  }
}
let util = new Util()
export default util
