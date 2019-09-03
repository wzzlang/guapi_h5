<template>
  <div v-if="help" class="help pdt white">
    <head-title :title="help.name"></head-title>
    <div class="help-intro">
      <img :src="help.artcileurl">
      <p>{{help.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Help',
  data () {
    return {
      id: null,
      help: null
    }
  },
  created: function () {
    this.id = this.$route.params.id
    this.getList()
  },
  methods: {
    // 获取帮助中心列表
    getList: function () {
      this.axios.get(`${this.api.help_detail}?id=${this.id}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.help = res.data.data.info
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.help{}
.help-intro{padding:0 rem(15) rem(15) rem(15);line-height:rem(24);
  img{margin-bottom:rem(15);display:block;width:100%;}
}
</style>
