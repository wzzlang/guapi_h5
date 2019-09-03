<template>
  <div class="recip pdt pbb">
    <head-title :title="title"></head-title>
    <div class="recip-form white">
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">分组名<span>*</span></dt>
        <dd class="recip-dd flex">
          <input class="recip-dd-inp" type="text" v-model="name" placeholder="请填写分组名">
        </dd>
      </dl>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">备注</dt>
        <dd class="recip-dd flex">
          <input class="recip-dd-inp" type="text" v-model="remark" placeholder="请填写备注">
        </dd>
      </dl>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">默认收件人组</dt>
        <dd class="recip-dd flex">
          <div class="recip-default flex-box middle right">
            <img @click="isDefaultTap" v-if="!isdefault" src="../../assets/icon52.png">
            <img @click="isDefaultTap" v-else src="../../assets/icon53.png">
          </div>
        </dd>
      </dl>
    </div>
    <div class="recip-form white">
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt flex">收件人姓名<span>*</span></dt>
        <router-link to="/RecipientLead/0" tag="div" class="recip-dd-btn">导入一个收件人</router-link>
      </dl>
      <p class="cor-999">请点击导入按钮以导入更多收件人</p>
      <div class="recip-pep clear">
        <p class="flex-box middle" v-for="(item, index) in recipientList" :key="item.id">
          <span class="name">{{item.realname}}</span>
          <span @click="delRecipientTap(index)" class="del">移除</span>
        </p>
      </div>
    </div>
    <div @click="submitTap" class="submit-btn">提交</div>
  </div>
</template>

<script>
export default {
  name: 'RecipientZuAdd',
  data () {
    return {
      title: '添加收件人组',
      ids: null, // 如果是拆分拖拽进来的会有包裹id
      name: '', // 分组名
      remark: '', // 备注
      recipientList: [],
      isdefault: 0
    }
  },
  computed: {
  },
  created: function () {
    this.recipientList = this.$store.state.recipientList
    this.ids = this.$route.params.ids
  },
  methods: {
    // 是否设置为默认
    isDefaultTap: function () {
      this.isdefault = this.isdefault === 0 ? 1 : 0
    },
    // 移除收件人
    delRecipientTap: function (index) {
      this.$store.commit('recipientListDel', index)
    },
    // 提交
    submitTap: function () {
      if (!(this.util.isEmpty(this.name, '请填写分组名'))) {
        return
      }
      if (this.recipientList.length < 1) {
        this.util.toast('请导入收件人')
        return
      }
      let ids = ''
      for (let i = 0; i < this.recipientList.length; i++) {
        ids += this.recipientList[i].id + ','
      }
      ids = ids.substring(0, ids.length - 1)
      this.util.loading()
      this.axios.post(this.api.add_receipt_group, {
        phone: this.$store.state.isLogin,
        name: this.name,
        ids: ids,
        remark: this.remark,
        isdefault: this.isdefault
      }).then(res => {
        console.log(res)
        this.util.close()
        if (res.data.code === '200') {
          console.log('this.ids', this.ids)
          if (this.ids && this.ids !== '0') {
            console.log('aaaaaaaaaaaaaaaa')
            // 包裹导入收件人组
            this.axios.post(this.api.import_recipet_to_bkg, {
              phone: this.$store.state.isLogin,
              ids: this.ids,
              id: res.data.data.id
            }).then(res => {
              console.log(res)
              if (res.data.code === '200') {
                this.$router.go(-1)
              } else {
                this.util.toast(res.data.msg)
              }
            })
          } else {
            console.log('bbbbbbbbbbbbbbbbbb')
            this.$router.go(-1)
          }
        } else {
          this.util.toast(res.data.msg)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../static/style/addRecipient'
</style>
