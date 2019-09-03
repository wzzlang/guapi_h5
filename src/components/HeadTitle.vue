<template>
  <div class="head-title">
    <div @click="goBack" class="head-back"></div>
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    title: {
      type: String,
      default: '瓜皮代发'
    },
    href: {
      type: String,
      default: 'false'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    goBack: function () {
      if (this.href === 'false') {
        this.$router.go(-1)
      } else {
        this.$router.push({path: `${this.href}`})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.head-title{position:fixed;left:50%;top:0;z-index:2;transform:translateX(-50%);width:100%;max-width:15rem;line-height:rem(45);background-color:#fff;text-align:center;font-size:rem(15);
  &:before{content:'';position:absolute;left:0;bottom:0;width:100%;height:1px;background-color:#f1f1f1;transform:scaleY(.5);-webkit-transform:scaleY(.5);}
}
.head-back{position:absolute;left:rem(5);top:0;width:rem(30);height:100%;background:url(../assets/icon46.png) no-repeat center;background-size:contain;}
</style>
