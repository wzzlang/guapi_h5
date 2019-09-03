<template>
  <div class="order pdt pbb">
    <head-title :title="title"></head-title>
    <div class="order-nav flex-box white">
      <p @click="tabTap(1)" :class="['flex', 'order-nav-a', {'active':type==1}]">修改资料</p>
      <p @click="tabTap(2)" :class="['flex', 'order-nav-a', {'active':type==2}]">修改密码</p>
    </div>
    <!--修改资料-->
    <div v-if="type==1" class="info white">
      <div class="info-item">
        <dl class="info-dl flex-box middle">
          <dt class="flex">头像</dt>
          <dd>
            <div class="info-dl-avater">
              <img :src="info.avatar ? info.avatar : require('../../assets/icon60.png')">
            </div>
            <!-- 图片上传 -->
            <image-upload
             class="image-upload"
             ref='imgaeUpload'
             :url='info.avatar'
             :touch-size = 1
             :multiple = true
             :lrz-options = {width:1024}
             field-name = 'serverImgFile'
             :data = {}
             :max-count = 10
             @chooseImages='bindtap_chooseImages'></image-upload>
          </dd>
        </dl>
      </div>
      <div class="info-item bor">
        <dl class="info-dl flex-box middle">
          <dt class="flex">展示货币</dt>
          <dd>
            <select class="info-dl-inp" v-model="info.currency_id">
              <option value="1">澳币$</option>
              <option value="0">人民币￥</option>
            </select>
          </dd>
        </dl>
        <p>页面展示货币，所有人民币价格及汇率仅供参考，会员实际需要支付的金额以结算时支付机构的实时汇率为准</p>
      </div>
      <div class="info-item">
        <dl class="info-dl flex-box middle">
          <dt class="flex">会员微信</dt>
          <dd>
            <input class="info-dl-inp" type="text" name="" v-model="info.wx" placeholder="请填写微信账号">
          </dd>
        </dl>
        <p>用于需要时与您取得联络</p>
      </div>
      <div class="info-item bor">
        <dl class="info-dl flex-box middle">
          <dt class="flex">会员群号</dt>
          <dd>
            <input class="info-dl-inp" type="text" v-model="info.groupnum" name="" placeholder="请填写会员群号">
          </dd>
        </dl>
        <p>您可以添加小助手（微信号：待定），他会帮助您组建单独为您服务的微信群（只有您在群里），以便为您呈现更好的服务</p>
      </div>
      <div class="info-item">
        <dl class="info-dl flex-box middle">
          <dt class="flex">会员邮箱</dt>
          <dd>
            <input class="info-dl-inp" type="text" v-model="info.email" name="" placeholder="请填写会员邮箱">
          </dd>
        </dl>
      </div>
      <div class="info-item bor">
        <dl class="info-dl flex-box middle">
          <dt class="flex">微信绑定</dt>
          <dd>
            <img @click="wxBindTap(1)" v-if="info.isbindint==0" class="info-dl-pic" src="../../assets/icon52.png">
            <img @click="wxBindTap(0)" v-else class="info-dl-pic" src="../../assets/icon53.png">
          </dd>
        </dl>
        <p>此授权用于微信扫码，网页快捷登录</p>
      </div>
      <div class="info-item">
        <dl class="info-dl flex-box middle">
          <dt class="flex">微信推送</dt>
          <dd>
            <img @click="wxPushTap(1)" v-if="info.wxpush==0" class="info-dl-pic" src="../../assets/icon52.png">
            <img @click="wxPushTap(0)" v-else class="info-dl-pic" src="../../assets/icon53.png">
          </dd>
        </dl>
        <p>开启后，我们将通过微信向您推送未付款订单信息</p>
      </div>
      <div @click="updateInfoTap" class="submit-btn">保存</div>
    </div>
    <!--修改密码-->
    <div v-if="type==2" class="info white">
      <div class="info-item">
        <dl class="info-dl flex-box middle">
          <dt class="flex">旧密码 <span>*</span></dt>
          <dd>
            <input class="info-dl-inp" type="password" v-model="oldPassword" placeholder="请填写旧密码">
          </dd>
        </dl>
      </div>
      <div class="info-item">
        <dl class="info-dl flex-box middle">
          <dt class="flex">新密码 <span>*</span></dt>
          <dd>
            <input class="info-dl-inp" type="password" v-model="newPassword" placeholder="请填写新密码">
          </dd>
        </dl>
      </div>
      <div class="info-item">
        <dl class="info-dl flex-box middle">
          <dt class="flex">确认新密码 <span>*</span></dt>
          <dd>
            <input class="info-dl-inp" type="password" v-model="onceNewPassword" placeholder="请再次填写新秘密">
          </dd>
        </dl>
      </div>
      <div @click="updatePwdTap" class="submit-btn">保存</div>
    </div>
  </div>
</template>

<script>
import {ImageUpload, ImagePreview} from 'vue-image-upload-preview'
export default {
  name: 'UpdateInfo',
  components: {
    ImageUpload,
    ImagePreview
  },
  data () {
    return {
      title: '修改资料',
      url: this.api.url,
      type: 1, // 1-修改资料 2-修改密码
      info: {}, // 用户信息
      oldPassword: '',
      newPassword: '',
      onceNewPassword: ''
    }
  },
  computed: {
  },
  created: function () {
    this.getInfo()
  },
  methods: {
    tabTap: function (type) {
      this.type = type
      if (type === 1) {
        this.title = '修改资料'
      } else {
        this.title = '修改密码'
      }
    },
    // 获取会员资料
    getInfo: function () {
      this.axios.get(`${this.api.user_material}?phone=${this.$store.state.isLogin}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.info = res.data.data
        }
      })
    },
    // 选择头像
    bindtap_chooseImages: function (data) {
      console.log(data[0].src)
      this.axios.post(this.api.top_base64Image, {
        image: data[0].src
      }).then(res => {
        console.log('上传图片', res)
        if (res.data.code === '200') {
          this.info.avatar = res.data.data.url
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
    // 微信绑定
    wxBindTap: function (num) {
      this.info.isbindint = num
    },
    // 微信推送
    wxPushTap: function (num) {
      this.info.wxpush = num
    },
    // 确认修改资料
    updateInfoTap: function () {
      var params = {
        phone: this.$store.state.isLogin,
        avatar: this.info.avatar,
        currency_id: this.info.currency_id,
        groupnum: this.info.groupnum,
        wx: this.info.wx,
        email: this.info.email,
        isbindint: this.info.isbindint,
        wxpush: this.info.wxpush
      }
      console.log(params)
      this.axios.post(this.api.update_user_material, params).then(res => {
        console.log(res)
        this.util.toast(res.data.msg)
        if (res.data.code === '200') {
          setTimeout(() => {
            this.$router.go(-1)
          }, 1500)
        }
      })
    },
    // 确认修改密码
    updatePwdTap: function () {
      if (!(this.util.isPassword(this.oldPassword))) {
        return
      }
      if (!(this.util.isPassword(this.newPassword))) {
        return
      }
      if (!(this.newPassword === this.onceNewPassword)) {
        this.util.toast('两次填写的密码不一致')
        return
      }
      console.log('aaaaaaa')
      this.axios.post(this.api.chmod_password, {
        phone: this.$store.state.isLogin,
        oldpassword: this.oldPassword,
        newpassword: this.newPassword
      }).then(res => {
        console.log(res)
        this.util.toast(res.data.msg)
        if (res.data.code === '200') {
          setTimeout(() => {
            this.$router.go(-1)
          }, 1500)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../../static/style/addRecipient';
.image-upload{position:relative;z-index:1;height:rem(50);width:rem(50);display:block;}
.info-dl-avater{position:absolute;right:0;top:50%;transform:translateY(-50%);}
.info{margin-top:rem(10);}
.info-item{padding:rem(8) rem(15);
  &.bor{border-bottom:1px solid #F8F8F8;}
  p{font-size:rem(12);color:#ccc;}
}
.info-dl{font-size:rem(14);line-height:rem(35);position:relative;
  dt{color:#333;
    span{color:#E34A4C;}
  }
}
.info-dl-down{padding:0 rem(15);height:rem(25);line-height:rem(25);color:#268ECA;border:1px solid #268ECA;text-align:center;font-size:rem(12);border-radius:rem(5);}
.info-dl-avater{width:rem(50);height:rem(50);border-radius:50%;border:1px solid #ddd;overflow:hidden;
  img{display:block;width:100%;height:100%;}
}
.info-dl-inp{height:rem(35);line-height:rem(35);text-align:right;}
.info-dl-wx{}
.info-dl-pic{display:block;width:rem(50);}
</style>
