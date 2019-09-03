<template>
  <div class="leadrecip pdt">
    <head-title :title="title"></head-title>
    <ul class="leadrecip-ul">
      <li class="leadrecip-li white">
        <div class="leadrecip-li-title flex-box">
          <p class="title flex">直邮收件组A</p>
          <p class="intro">小张代理(收件人组备注)</p>
        </div>
        <p>林家境 ，王增伟，陈建安</p>
      </li>
      <li class="leadrecip-li white">
        <div class="leadrecip-li-title flex-box">
          <p class="title flex">直邮收件组A</p>
          <p class="intro">小张代理(收件人组备注)</p>
        </div>
        <p>林家境 ，王增伟，陈建安</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ChooseStoreChina',
  data () {
    return {
      title: '导入收件人组'
    }
  },
  computed: {
  },
  created: function () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../../static/style/addRecipient';
</style>
