<template>
  <div class="help pdt">
    <head-title :title="title"></head-title>
    <ul class="help-ul">
      <li v-for="item in helpList" :key="item.id" class="help-li white flex-box middle">
        <div class="help-li-tit">
          <p>{{item.name}}</p>
        </div>
        <div class="flex clear help-li-list">
          <router-link v-for="sec in item.articles" :key="sec.id" :to="'/HelpDetails/'+ sec.id" tag="p">{{sec.name}}</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Help',
  data () {
    return {
      title: '帮助中心',
      helpList: null
    }
  },
  created: function () {
    this.getList()
  },
  methods: {
    // 获取帮助中心列表
    getList: function () {
      this.axios.get(this.api.help).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.helpList = res.data.data
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.help{}
.help-ul{}
.help-li{margin-bottom:rem(15);}
.help-li-tit{padding:rem(30) 0;width:rem(140);text-align:center;font-size:rem(16);
  img{display:block;margin:0 auto rem(5) auto;width:rem(60);}
}
.help-li-list{text-align:center;line-height:rem(20);
  p{padding:rem(30) rem(10) 0 rem(10);float:left;width:50%;height:rem(80);border-bottom:1px solid #f1f1f1;border-right:1px solid #f1f1f1;}
}
</style>
