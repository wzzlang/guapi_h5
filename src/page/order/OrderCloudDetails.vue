<template>
  <div class="detail pdt pbb">
    <head-title :title="title"></head-title>
    <div v-if="detail" class="detail-status white">
      <div class="title flex-box middle">
        <p class="flex">订单状态</p>
        <!--订单提交状态显示-->
        <p v-if="detail.status==0" class="detail-pay-time">支付倒计时 {{detail.djs}}</p>
      </div>
      <!--取消订单状态显示-->
      <ul v-if="detail.status==-1" class="detail-status-ul clear">
        <li class="detail-status-li active">
          <i class="icon1"></i>
          <p class="status">订单提交</p>
          <div class="time">
            <p>{{detail.createtime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.createtime | time('hh:mm:ss')}}</p>
          </div>
        </li>
        <li class="detail-status-li active">
          <i class="icon5"></i>
          <p class="status">订单取消</p>
          <div class="time">
            <p>{{detail.canceletime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.canceletime | time('hh:mm:ss')}}</p>
          </div>
        </li>
      </ul>
      <!--未取消订单状态显示-->
      <ul v-else class="detail-status-ul clear">
        <li :class="['detail-status-li', {'active':detail.status>=0}]">
          <i class="icon1"></i>
          <p class="status">订单提交</p>
          <div v-if="detail.status>=0" class="time">
            <p>{{detail.createtime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.createtime | time('hh:mm:ss')}}</p>
          </div>
        </li>
        <li :class="['detail-status-li',{'active':detail.status>=1}]">
          <i class="icon2"></i>
          <p class="status">付款成功</p>
          <div v-if="detail.status>=1" class="time">
            <p>{{detail.paytime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.paytime | time('hh:mm:ss')}}</p>
          </div>
        </li>
        <li :class="['detail-status-li',{'active':detail.status>=2}]">
          <i class="icon3"></i>
          <p class="status">等待出库</p>
          <div v-if="detail.status>=2" class="time">
            <p>{{detail.waittime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.waittime | time('hh:mm:ss')}}</p>
          </div>
        </li>
        <li :class="['detail-status-li',{'active':detail.status>=3}]">
          <i class="icon4"></i>
          <p class="status">出库完成</p>
          <div v-if="detail.status>=3" class="time">
            <p>{{detail.sendtime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.sendtime | time('hh:mm:ss')}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="detail-item white">
      <p class="detail-title">订单信息</p>
      <div class="detail-cont">
        <div class="detail-intro flex-box">
          <p class="title">云仓订单号</p>
          <p class="intro flex">{{detail.cloudsn}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">订单渠道</p>
          <p v-if="detail.order_source==1" class="intro flex">商城直发</p>
          <p v-if="detail.order_source==2" class="intro flex">操作云仓</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">订单状态</p>
          <p class="intro flex">{{detail.status | cstatus}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">订单备注</p>
          <p class="intro flex">{{detail.remark}}</p>
        </div>
      </div>
    </div>
    <div class="detail-item white">
      <div class="detail-title flex-box middle">
        <p class="flex">发件信息</p>
        <div class="detail-title-btn flex-box middle">
          <!--国内现货，订单提交,付款成功状态显示-->
          <router-link to="/AddresserLead/0" v-if="(detail.status==0 || detail.status==1) && type==0" class="bkg" tag="span">替换</router-link>
          <!--澳洲直邮，订单提交,付款成功状态显示-->
          <router-link to="/AddresserLead/1" v-if="(detail.status==0 || detail.status==1) && type==1" class="bkg" tag="span">替换</router-link>
        </div>
      </div>
      <div v-if="sender" class="detail-cont">
        <div class="detail-intro flex-box">
          <p class="title">发件人姓名</p>
          <p class="intro flex">{{sender.name}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">发件人手机</p>
          <!--澳洲显示境外电话-->
          <p v-if="detail.areacode==1" class="intro flex">{{sender.amobile}}</p>
          <!--国内显示国内电话-->
          <p v-else class="intro flex">{{sender.cmobile}}</p>
        </div>
      </div>
    </div>
    <div v-for="(item, index) in detail.parcels" :key="item.id" class="detail-item white">
      <p class="detail-title">包裹拆分</p>
      <div class="detail-cont">
        <div class="detail-parcel">
          <div class="detail-parcel-title flex-box">
            <div class="detail-parcel-title-a flex">包裹{{index+1}}</div>
            <div class="detail-parcel-title-c">
              <span>{{item.parcelsn}} | </span>
              <span>{{item.status | cstatus}}</span>
            </div>
          </div>
          <div class="flex-box">
            <p class="flex">所属类型：{{item.type}}</p>
            <p class="flex">包裹备注：{{item.remark}}</p>
          </div>
          <div class="flex-box">
            <p class="flex">预估重量：{{item.weight}}kg</p>
            <p class="flex">单位运费：${{item.unintdispatch}}/kg</p>
          </div>
          <div class="flex-box">
            <p class="flex">预估费用：${{item.forecostfee}}</p>
            <p class="flex">额外补税：${{item.addtax}}</p>
          </div>
          <div class="flex-box">
            <p class="flex">代发费用：${{item.issuingfee}}</p>
            <p class="flex">物料费用：${{item.materialfee}}</p>
          </div>
          <p>额外服务：{{item.service}}</p>
          <p>预估小计：${{item.total}}</p>
        </div>
        <div class="detail-parcel-desc">
          <p class="title">包裹明细</p>
          <div v-for="sec in item.goods" :key="sec.id" class="detail-parcel-a flex-box middle">
            <p class="flex name">{{sec.name}}</p>
            <p>{{sec.num}}</p>
          </div>
        </div>
        <div class="detail-parcel-intro">
          <div class="title flex-box middle">
            <p class="flex">收件信息</p>
            <!--订单提交,付款成功状态显示-->
            <div v-if="detail.status==0 || detail.status==1" class="detail-title-btn flex-box middle">
              <router-link :to="`/RecipientKuAdd/${index}`" tag="span">添加</router-link>
              <router-link :to="`/RecipientLead/${index}`" tag="span">替换</router-link>
            </div>
          </div>
          <p>{{recipientList[index].realname}} ，{{recipientList[index].mobile}}，{{recipientList[index].area}}{{recipientList[index].address}}，{{recipientList[index].zipcode}}</p>
        </div>
        <div class="border"></div>
        <p class="detail-parcel-pep">身份信息：<span v-if="item.receipt.status==1">已上传身份证</span><span v-else>未上传身份证</span></p>
      </div>
    </div>
    <!--出库完成状态显示-->
    <div v-if="detail.status==3" class="detail-item white">
      <div class="detail-cont">
        <div class="detail-ems">
          <p class="detail-ems-title">韵达快递：133212332321</p>
          <div class="detail-ems-cont flex-box middle">
            <p class="title flex">实际重量：2.00KG</p>
            <div class="detail-ems-btn flex-box">
              <p>复制信息</p>
              <p>查看物流</p>
            </div>
          </div>
          <div class="detail-ems-pic clear">
            <div class="detail-ems-pic-a">
              <img src="../../assets/img2.png">
            </div>
            <div class="detail-ems-pic-a">
              <img src="../../assets/img2.png">
            </div>
            <div class="detail-ems-pic-a">
              <img src="../../assets/img2.png">
            </div>
            <div class="detail-ems-pic-a">
              <img src="../../assets/img2.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-item white">
      <p class="detail-title">订单小结</p>
      <div class="detail-cont">
        <div class="detail-intro flex-box">
          <p class="title">转运费用</p>
          <p class="intro flex">${{detail.transferfee}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">总计</p>
          <p class="intro flex">${{detail.total}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">优惠代码</p>
          <p class="intro flex">{{detail.coupon}}</p>
        </div>
        <div class="border"></div>
        <div class="detail-intro flex-box">
          <p class="title">余额抵扣</p>
          <p class="intro flex">-${{detail.credit1}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">积分抵扣</p>
          <p class="intro flex">{{detail.credit2 ? '-$'+detail.credit2 : '无'}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">应付金额</p>
          <p class="intro flex">${{detail.handle_price}}</p>
        </div>
        <div class="border"></div>
        <div class="detail-intro flex-box">
          <p class="title">跨境支付渠道</p>
          <p class="intro flex">
            <span v-if="detail.paystyle==0">微信</span>
            <span v-if="detail.paystyle==1">支付宝</span>
          </p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">跨境支付手续费</p>
          <p class="intro flex">${{detail.pay_fee}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">应付含手续费</p>
          <p class="intro flex">${{detail.fee}}</p>
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      <div class="confirm">
        <p class="confirm-title">温馨提示</p>
        <p>是否确认取消订单？</p>
        <div class="confirm-btn flex-box middle center">
          <p @click="cancalTap">取消</p>
          <p @click="deleteTap" class="bkg">确定</p>
        </div>
      </div>
    </mt-popup>
    <!--订单提交状态显示-->
    <div v-if="detail.status==0" class="submit-btn flex-box">
      <div @click="showConfirm" class="submit-btn-a bkg1 flex">取消订单</div>
      <div @click="payNowTap" class="submit-btn-a flex">立即付款</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderCloudDetails',
  data () {
    return {
      title: '云仓订单详情',
      type: null, // 1-国内现货 2-澳洲直邮
      cloudid: null, // 订单id
      detail: [],
      sender: null, // 发件人
      recipientList: null, // 收件人列表
      popupVisible: false
    }
  },
  computed: {
  },
  created: function () {
    this.cloudid = this.$route.params.id
    this.type = this.$route.params.type
    this.getDetail()
  },
  mounted: function () {
    setInterval(() => {
      let aaa = parseInt(this.detail.endtime) * 1000
      let bbb = new Date().getTime()
      let time = aaa - bbb
      if (time > 0) {
        let hh = Math.floor(time / 1000 / 60 / 60)
        let mm = Math.floor(time / 1000 / 60 % 60)
        let ss = Math.floor(time / 1000 % 60)
        this.$set(this.detail, 'djs', hh + ':' + mm + ':' + ss)
      }
    }, 1000)
  },
  methods: {
    // 获取订单详情
    getDetail: function () {
      this.axios.get(`${this.api.get_cloud_order_detail}?cloudid=${this.cloudid}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let recipientList = [] // 收件人列表
          this.detail = res.data.data
          if (!this.$store.state.picker) {
            this.$store.commit('picker', res.data.data.sender)
          }
          this.sender = this.$store.state.picker // 取件人
          res.data.data.parcels.map(item => {
            recipientList.push(item.receipt)
          })
          if (!this.$store.state.recipientCloudList) {
            this.$store.state.recipientCloudList = recipientList
          }
          this.recipientList = this.$store.state.recipientCloudList
        }
      })
    },
    // 提示
    showConfirm: function () {
      this.popupVisible = true
    },
    // 取消
    cancalTap: function () {
      this.popupVisible = false
    },
    // 取消订单
    deleteTap: function () {
      this.popupVisible = false
      this.axios.get(`${this.api.cancele_cloud_order}?phone=${this.$store.state.isLogin}&cloudid=${this.cloudid}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.util.toast('取消成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 1500)
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
    // 立即付款
    payNowTap: function () {
      let bkgs = []
      this.detail.parcels.map((item, index) => {
        let obj = {}
        obj.bid = item.bkg_id
        obj.addressid = this.recipientList[index].id
        bkgs.push(obj)
      })
      let formdata = {
        phone: this.$store.state.isLogin,
        id: this.cloudid,
        senderid: this.sender.id,
        bkgs: bkgs
      }
      console.log(formdata)
      this.axios.post(this.api.at_once_pay, {
        formdata: JSON.stringify(formdata)
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let list = {}
          list.pay_fee = this.detail.fee // 应付含手续费
          list.total = this.detail.fees // 约多少人民币
          list.paystyle = this.detail.paystyle // 支付方式
          list.ordersn = this.detail.cloudsn
          console.log(list)
          this.$router.push({path: `/OrderSuccess/${encodeURIComponent(JSON.stringify(list))}`})
        } else {
          this.util.toast(res.data.msg)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../../static/style/addRecipient';
</style>
