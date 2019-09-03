<template>
  <div class="card pdt">
    <head-title :title="title"></head-title>
    <div class="card-item white">
      <p class="title">只有澳洲直邮的包裹需要上传身份证！</p>
      <p>如果您已经在相应的快递公司上传过身份证，请忽略这里的上传请求，但是强烈建议您在此再次上传，以使下次发货使用</p>
    </div>
    <div class="upload-card white">
      <div class="upload-card-nav flex-box">
        <p @click="navShowTap(1)" :class="['flex', {'active' : uploadShow==1}]">正面&反面</p>
        <!-- <p @click="navShowTap(2)" :class="['flex', {'active' : uploadShow==2}]">正反面合并图</p> -->
      </div>
      <div v-if="uploadShow == 1" class="upload-card-cont">
        <div class="upload-card-a">
          <img :src="positive ? url+positive : require('../assets/icon62.png')">
            <!-- 图片上传 -->
            <image-upload
             class="image-upload"
             ref='imgaeUpload'
             :url='positive'
             :touch-size = 1
             :multiple = true
             :lrz-options = {width:1024}
             field-name = 'serverImgFile'
             :data = {}
             :max-count = 10
             @chooseImages='uploadIdA'></image-upload>
        </div>
        <div class="upload-card-a">
          <img :src="reverse ? url+reverse : require('../assets/icon63.png')">
            <!-- 图片上传 -->
            <image-upload
             class="image-upload"
             ref='imgaeUpload'
             :url='reverse'
             :touch-size = 1
             :multiple = true
             :lrz-options = {width:1024}
             field-name = 'serverImgFile'
             :data = {}
             :max-count = 10
             @chooseImages='uploadIdB'></image-upload>
        </div>
      </div>
      <div v-if="uploadShow == 2" class="upload-card-cont">
        <div class="upload-card-a wid">
          <img :src="bothpr ? url+bothpr : require('../assets/icon64.png')">
            <!-- 图片上传 -->
            <image-upload
             class="image-upload"
             ref='imgaeUpload'
             :url='bothpr'
             :touch-size = 1
             :multiple = true
             :lrz-options = {width:1024}
             field-name = 'serverImgFile'
             :data = {}
             :max-count = 10
             @chooseImages='uploadIdC'></image-upload>
        </div>
      </div>
    </div>
    <div class="card-item white">
      <dl class="card-dl flex-box middle">
        <dt class="card-dt"><span>*</span>身份证姓名</dt>
        <dd class="card-dd flex flex-box middle">
          <input class="flex" type="text" v-model="name" :disabled="Adisabled" placeholder="优先上传图片，智能识别身份内容">
        </dd>
      </dl>
      <dl class="card-dl flex-box middle">
        <dt class="card-dt"><span>*</span>身份证号码</dt>
        <dd class="card-dd flex flex-box middle">
          <input class="flex" type="text" v-model="idnumber" :disabled="Adisabled" placeholder="优先上传图片，智能识别身份内容">
        </dd>
      </dl>
    </div>
    <div class="card-item white">
      <dl class="card-dl flex-box middle">
        <dt class="card-dt"><span>*</span>身份证有效期</dt>
        <dd class="card-dd flex flex-box middle">
          <input class="flex" type="text" v-model="idtime" :disabled="Bdisabled" placeholder="优先上传图片，智能识别身份内容">
        </dd>
      </dl>
      <dl class="card-dl flex-box middle">
        <dt class="card-dt"><span>*</span>身份证人手机</dt>
        <dd class="card-dd flex flex-box middle">
          <input class="flex" type="text" v-model="mobile" placeholder="请填写手机号码（收件人的手机号码）">
        </dd>
      </dl>
    </div>
    <div class="card-item white">
      <p>根据中国海关总署修订后的《中华人名共和国海关对进出快件监管办法》，入境到中国大陆的个人包裹经海关查验需向海关提供收件人身份证件(彩色)等相关信息，系统会自动添加水印，以确保身份证信息的安全</p>
    </div>
    <button @click="submitTap" class="submit-btn">提交</button>
  </div>
</template>

<script>
import {ImageUpload, ImagePreview} from 'vue-image-upload-preview'
export default {
  name: 'UploadIDcard',
  components: {
    ImageUpload,
    ImagePreview
  },
  data () {
    return {
      title: '上传身份证',
      url: this.api.url,
      uploadShow: 1,
      Adisabled: true,
      Bdisabled: true,
      name: '', // 姓名
      idnumber: '', // 身份证号码
      idtime: '', // 有效期
      mobile: '', // 手机号码
      positive: null, // 身份证正面
      reverse: null, // 身份证反面
      bothpr: null // 身份证正反面
    }
  },
  computed: {
  },
  created: function () {
  },
  methods: {
    navShowTap: function (e) {
      this.uploadShow = e
    },
    // 身份证正面
    uploadIdA: function (data) {
      this.axios.post(this.api.base64Image, {
        image: data[0].src
      }).then(res => {
        console.log('上传图片', res)
        if (res.data.code === '200') {
          this.positive = res.data.data.url
          this.axios.post(this.api.province, {
            image: data[0].src,
            side: 'front'
          }).then(result => {
            console.log(result)
            if (result.data.code === '200') {
              this.name = result.data.data.words_result.姓名.words
              this.idnumber = result.data.data.words_result.公民身份号码.words
            }
            this.Adisabled = false
          })
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
    // 身份证反面
    uploadIdB: function (data) {
      this.axios.post(this.api.base64Image, {
        image: data[0].src
      }).then(res => {
        console.log('上传图片', res)
        if (res.data.code === '200') {
          this.reverse = res.data.data.url
          this.axios.post(this.api.province, {
            image: data[0].src,
            side: 'back'
          }).then(result => {
            console.log(result)
            if (result.data.code === '200') {
              this.idtime = result.data.data.words_result.签发日期.words + '-' + result.data.data.words_result.失效日期.words
            }
            this.Bdisabled = false
          })
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
    // 身份证正反面
    uploadIdC: function (data) {
      this.axios.post(this.api.base64Image, {
        image: data[0].src
      }).then(res => {
        console.log('上传图片', res)
        if (res.data.code === '200') {
          this.bothpr = res.data.data.url
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
    // 提交
    submitTap: function () {
      if (!(this.util.isEmpty(this.positive, '请上传身份证正面'))) {
        return
      }
      if (!(this.util.isEmpty(this.reverse, '请上传身份证反面'))) {
        return
      }
      if (!(this.util.isEmpty(this.bothpr, '请上传身份证正反面'))) {
        return
      }
      if (!(this.util.isEmpty(this.name, '请输入身份证姓名'))) {
        return
      }
      if (!(this.util.isEmpty(this.idnumber, '请输入身份证号码'))) {
        return
      }
      if (!(this.util.isEmpty(this.idtime, '请输入身份证有效期'))) {
        return
      }
      if (!(this.util.isPhone(this.mobile))) {
        return
      }
      this.axios.post(this.api.upload_id_cart, {
        phone: this.$store.state.isLogin,
        name: this.name,
        idnumber: this.idnumber,
        idtime: this.idtime,
        mobile: this.mobile,
        positive: this.positive,
        reverse: this.reverse,
        bothpr: this.bothpr
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
<style scoped lang="scss">
.card{padding-bottom:rem(50);}
.card-item{padding:rem(10);margin-bottom:rem(15);line-height:rem(20);color:#8F8F90;
  .title{font-size:rem(14);color:#454547;}
}
.upload-card{margin-bottom:rem(15);}
.upload-card-nav{text-align:center;line-height:rem(40);background-color:#F8F8F8;
  p.active{background-color:#fff;color:#268ECA;}
}
.upload-card-cont{padding:rem(20) 0;text-align:center;}
.upload-card-a{position:relative;margin:0 rem(10);display:inline-block;width:rem(100);height:rem(90);border:1px solid #ddd;
  img{display:block;width:100%;height:100%;}
  &.wid{width:rem(200);}
}
.image-upload{position:absolute;left:0;top:0;width:100%;height:100%;}
.card-dl{}
.card-dt{margin-right:rem(10);width:rem(100);color:#333;
  span{color:$red;}
}
.card-dd{
  input{height:rem(35);line-height:rem(35);}
}
</style>
