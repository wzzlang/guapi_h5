<template>
  <div class="car">
    <div v-if="austraCarList.length > 0" class="car-item">
      <div class="car-top flex-box middle">
        <div class="flex flex-box middle">
          <div :class="['car-top-choose', {'active':autraChooseAll}]" @click="autraChooseAllTap"></div>
          <p>澳洲直邮购物车</p>
        </div>
        <div class="car-top-btn flex-box">
          <p @click="pickingAustraTap">门店自取</p>
          <p @click="deliverAustraTap">商城直发</p>
        </div>
      </div>
      <ul class="car-ul white">
        <li v-for="(item, index) in austraCarList" :key="item.id" class="car-li flex-box middle">
          <div :class="['car-li-choose', {'active': item.select}]" @click="autraChooseTap(index)"></div>
          <router-link :to="'/WareDetails/'+item.good.id" tag="div" class="car-li-img">
            <img :src="item.good.images">
          </router-link>
          <div class="car-li-desc flex">
            <router-link :to="'/WareDetails/'+item.good.id" tag="div">
              <p class="title">{{item.good.name}}</p>
              <p class="desc">{{item.good.ename}}</p>
            </router-link>
            <div class="state clear">
              <p>{{item.totalweight}}克</p>
              <p>
                <span v-if="item.ctype==1">境外仓库:</span>
                <span v-if="item.ctype==2">药房采购:</span>
                <span v-if="item.ctype==2">需采购</span>
                <span v-else>
                <span v-if="item.num>item.good.total">需采购</span>
                <span v-if="item.good.total-item.num<10 && item.good.total-item.num>=0">仅剩 {{item.good.total-item.num}} 件</span>
                <span v-if="item.good.total-item.num>=10">有货</span>
                </span>
              </p>
            </div>
            <div class="car-li-com flex-box between middle">
              <div class="car-li-num flex-box">
                <p @click="carMinTap(item.id)" class="btn">-</p>
                <input class="num" type="text" name="" v-model="item.num" readonly="readonly">
                <p @click="carAddTap(item)" class="btn">+</p>
              </div>
              <p class="car-li-price">${{item.total}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="chinaCarList.length > 0" class="car-item china">
      <div class="car-top flex-box middle">
        <div class="flex flex-box middle">
          <div :class="['car-top-choose', {'active':chinaChooseAll}]" @click="chinaChooseAllTap"></div>
          <p>国内现货购物车</p>
        </div>
        <div class="car-top-btn flex-box">
          <p @click="pickingChinaTap">门店自取</p>
          <p @click="deliverChineTap">商城直发</p>
        </div>
      </div>
      <ul class="car-ul white">
        <li v-for="(item, index) in chinaCarList" :key="item.id" class="car-li flex-box middle">
          <div :class="['car-li-choose', {'cur': item.select}]" @click="chinaChooseTap(index)"></div>
          <router-link :to="'/WareDetails/'+item.good.id" tag="div" class="car-li-img">
            <img :src="item.good.images">
          </router-link>
          <div class="car-li-desc flex">
            <router-link :to="'/WareDetails/'+item.good.id" tag="div">
              <p class="title">{{item.good.name}}</p>
              <p class="desc">{{item.good.ename}}</p>
            </router-link>
            <div class="state clear">
              <p>{{item.totalweight}}克</p>
              <p>
                <span v-if="item.ctype==0">国内仓库:</span>
                <span v-if="item.num>item.good.total">需采购</span>
                <span v-if="item.good.total-item.num<10 && item.good.total-item.num>=0">仅剩 {{item.good.total-item.num}} 件</span>
                <span v-if="item.good.total-item.num>=10">有货</span>
              </p>
            </div>
            <div class="car-li-com flex-box between middle">
              <div class="car-li-num flex-box">
                <p @click="carMinTap(item.id)" class="btn">-</p>
                <input class="num" type="text" name="" v-model="item.num" readonly="readonly">
                <p @click="carAddTap(item)" class="btn">+</p>
              </div>
              <p class="car-li-price">${{item.total}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="car-com flex-box middle white">
      <div class="car-com-cont flex-box flex middle">
        <div class="car-com-a flex-box">
          <p @click="deleteCar">删除</p>
          <p @click="emptyCar">清空</p>
        </div>
        <div class="car-com-intro flex">
          <p>总含量 {{allWeight}} 克</p>
          <p class="price">总价不含运费: ${{allPrice}}</p>
        </div>
      </div>
      <div @click="putCloudTap" class="car-com-btn">结算并放入云仓</div>
    </div>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
import FootNav from '../components/FootNav'
export default {
  name: 'car',
  components: {
    FootNav
  },
  data () {
    return {
      chinaCarList: [], // 国内购物车列表
      austraCarList: [], // 海外购物车列表
      autraChooseAll: false, // 澳洲购物车全选
      chinaChooseAll: false, // 国内购物车全选
      allWeight: 0, // 商品总重量
      allPrice: 0 // 商品总价
    }
  },
  computed: {
  },
  created: function () {
    this.getCarList()
    this.$store.state.storeIndex = 0 // 把门店自取选择门店默认设置为选择第一个
    this.$store.commit('picker', null) // 更新取件人即发件人
    this.$store.commit('recipient', null) // 更新收件人
  },
  methods: {
    // 获取购物车列表
    getCarList: function () {
      this.axios.post(this.api.get_cart_list + '?phone=' + this.$store.state.isLogin).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let chinaCarList = res.data.data[0]
          let austraCarList = res.data.data[1]
          if (chinaCarList.length > 0) {
            chinaCarList.map(item => {
              item.select = false
            })
          }
          if (austraCarList.length > 0) {
            austraCarList.map(item => {
              item.select = false
            })
          }
          // 取缓存里面的购物车列表判断是否选中
          let storageChinaCarList = JSON.parse(localStorage.getItem('chinaCarList'))
          let storageAustraCarList = JSON.parse(localStorage.getItem('austraCarList'))
          if (storageChinaCarList && chinaCarList) {
            for (let i = 0; i < storageChinaCarList.length; i++) {
              for (let j = 0; j < chinaCarList.length; j++) {
                if (storageChinaCarList[i].id === chinaCarList[j].id) {
                  chinaCarList[j].select = storageChinaCarList[i].select
                }
              }
            }
            localStorage.setItem('chinaCarList', JSON.stringify(chinaCarList))
          } else {
            localStorage.setItem('chinaCarList', JSON.stringify(chinaCarList))
          }
          if (storageAustraCarList && austraCarList) {
            for (let i = 0; i < storageAustraCarList.length; i++) {
              for (let j = 0; j < austraCarList.length; j++) {
                if (storageAustraCarList[i].id === austraCarList[j].id) {
                  austraCarList[j].select = storageAustraCarList[i].select
                }
              }
            }
            localStorage.setItem('austraCarList', JSON.stringify(austraCarList))
          } else {
            localStorage.setItem('austraCarList', JSON.stringify(austraCarList))
          }
          this.chinaCarList = chinaCarList
          this.austraCarList = austraCarList
          this.getWeightPrice()
        }
      })
    },
    // 澳洲购物车全选
    autraChooseAllTap: function () {
      if (this.autraChooseAll) {
        this.autraChooseAll = false
        this.austraCarList.map(item => {
          item.select = false
        })
      } else {
        this.autraChooseAll = true
        this.austraCarList.map(item => {
          item.select = true
        })
      }
      localStorage.setItem('austraCarList', JSON.stringify(this.austraCarList))
      this.getWeightPrice()
    },
    // 澳洲购物车选择
    autraChooseTap: function (index) {
      this.austraCarList[index].select = !this.austraCarList[index].select
      this.autraChooseAll = this.isAutraChooseAll()
      this.getWeightPrice()
      localStorage.setItem('austraCarList', JSON.stringify(this.austraCarList))
    },
    // 判断澳洲购物车是否全选
    isAutraChooseAll: function () {
      let result = true
      let austraCarList = this.austraCarList
      for (let i = 0; i < austraCarList.length; i++) {
        if (!austraCarList[i].select) {
          result = false
          break
        }
      }
      return result
    },
    // 国内购物车全选
    chinaChooseAllTap: function () {
      if (this.chinaChooseAll) {
        this.chinaChooseAll = false
        this.chinaCarList.map(item => {
          item.select = false
        })
      } else {
        this.chinaChooseAll = true
        this.chinaCarList.map(item => {
          item.select = true
        })
      }
      this.getWeightPrice()
      localStorage.setItem('chinaCarList', JSON.stringify(this.chinaCarList))
    },
    // 国内购物车选择
    chinaChooseTap: function (index) {
      this.chinaCarList[index].select = !this.chinaCarList[index].select
      this.chinaChooseAll = this.isChinaChooseAll()
      this.getWeightPrice()
      localStorage.setItem('chinaCarList', JSON.stringify(this.chinaCarList))
    },
    // 判断国内购物车是否全选
    isChinaChooseAll: function () {
      let result = true
      let chinaCarList = this.chinaCarList
      for (let i = 0; i < chinaCarList.length; i++) {
        if (!chinaCarList[i].select) {
          result = false
          break
        }
      }
      return result
    },
    // 删除购物车
    deleteCar: function () {
      let ids = ''
      this.austraCarList.map(item => {
        if (item.select) {
          ids += item.id + ','
        }
      })
      this.chinaCarList.map(item => {
        if (item.select) {
          ids += item.id + ','
        }
      })
      ids = ids.substring(0, ids.length - 1)
      this.axios.post(this.api.delete_cart, {
        phone: this.$store.state.isLogin,
        ids: ids
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.util.toast('删除成功')
          this.getCarList()
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
    // 清空购物车
    emptyCar: function () {
      let ids = ''
      this.austraCarList.map(item => {
        ids += item.id + ','
      })
      this.chinaCarList.map(item => {
        ids += item.id + ','
      })
      ids = ids.substring(0, ids.length - 1)
      this.axios.post(this.api.delete_cart, {
        phone: this.$store.state.isLogin,
        ids: ids
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.util.toast('清空成功')
          this.getCarList()
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
    // 购物车增加
    carAddTap: function (item) {
      if (item.num > item.total) {
        this.util.toast('库存不够了')
        return
      }
      this.axios.get(`${this.api.change_cart_num}?id=${item.id}&otype=1`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.getCarList()
        }
      })
    },
    // 购物车减少
    carMinTap: function (id) {
      this.axios.get(`${this.api.change_cart_num}?id=${id}&otype=0`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.getCarList()
        }
      })
    },
    // 计算商品总重量和商品总价
    getWeightPrice: function () {
      let allPrice = 0
      let allWeight = 0
      this.austraCarList.map(item => {
        if (item.select) {
          allPrice += item.total
        }
      })
      this.chinaCarList.map(item => {
        if (item.select) {
          allPrice += item.total
        }
      })
      this.austraCarList.map(item => {
        if (item.select) {
          allWeight += item.totalweight
        }
      })
      this.chinaCarList.map(item => {
        if (item.select) {
          allWeight += item.totalweight
        }
      })
      this.allPrice = allPrice
      this.allWeight = allWeight
    },
    // 澳洲门店自取
    pickingAustraTap: function () {
      let ids = ''
      let austraCarList = this.austraCarList
      for (let i = 0; i < austraCarList.length; i++) {
        if (austraCarList[i].select) {
          // if (austraCarList[i].ctype === 2) {
          //   this.util.toast('药房采购的商品无法自取，请取消勾选这些商品后再试')
          //   return false
          // }
          ids += austraCarList[i].id + ','
        }
      }
      ids = ids.substring(0, ids.length - 1)
      if (!ids) {
        this.util.toast('还没有选择商品')
        return
      }
      let list = {
        phone: this.$store.state.isLogin,
        ids: ids,
        areacode: 1
      }
      this.$router.push({path: `/StorePickingAustra/${JSON.stringify(list)}`})
    },
    // 国内门店自取
    pickingChinaTap: function () {
      let ids = ''
      let chinaCarList = this.chinaCarList
      for (let i = 0; i < chinaCarList.length; i++) {
        if (chinaCarList[i].select) {
          ids += chinaCarList[i].id + ','
        }
      }
      ids = ids.substring(0, ids.length - 1)
      if (!ids) {
        this.util.toast('还没有选择商品')
        return
      }
      let list = {
        phone: this.$store.state.isLogin,
        ids: ids,
        areacode: 0
      }
      this.$router.push({path: `/StorePickingChina/${JSON.stringify(list)}`})
    },
    // 澳洲商城直发
    deliverAustraTap: function () {
      let ids = ''
      let austraCarList = this.austraCarList
      for (let i = 0; i < austraCarList.length; i++) {
        if (austraCarList[i].select) {
          ids += austraCarList[i].id + ','
        }
      }
      ids = ids.substring(0, ids.length - 1)
      if (!ids) {
        this.util.toast('还没有选择商品')
        return
      }
      let list = {
        phone: this.$store.state.isLogin,
        ids: ids,
        areacode: 1
      }
      this.$router.push({path: `/StoreDeliverAustra/${JSON.stringify(list)}`})
    },
    // 国内商城直发
    deliverChineTap: function () {
      let ids = ''
      let chinaCarList = this.chinaCarList
      for (let i = 0; i < chinaCarList.length; i++) {
        if (chinaCarList[i].select) {
          ids += chinaCarList[i].id + ','
        }
      }
      ids = ids.substring(0, ids.length - 1)
      if (!ids) {
        this.util.toast('还没有选择商品')
        return
      }
      let list = {
        phone: this.$store.state.isLogin,
        ids: ids,
        areacode: 0
      }
      this.$router.push({path: `/StoreDeliverChina/${JSON.stringify(list)}`})
    },
    // 结算放入云仓
    putCloudTap: function () {
      let ids = ''
      this.austraCarList.map(item => {
        if (item.select) {
          ids += item.id + ','
        }
      })
      this.chinaCarList.map(item => {
        if (item.select) {
          ids += item.id + ','
        }
      })
      ids = ids.substring(0, ids.length - 1)
      if (!ids) {
        this.util.toast('还没有选择商品')
        return
      }
      let list = {
        phone: this.$store.state.isLogin,
        ids: ids
      }
      this.$router.push({path: `/PutCloud/${JSON.stringify(list)}`})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.car{padding-bottom:rem(100);}
.car-item{
  &.china{
    .car-top{background-color:#268ECA;}
  }
}
.car-top{padding:rem(10) rem(15);background-color:$red;color:#fff;font-size:rem(14);}
.car-top-choose{margin-right:rem(10);width:rem(20);height:rem(20);background-repeat:no-repeat;background-position:center;background-size:contain;background-image:url(../assets/icon25.png);
  &.active{background-image:url(../assets/icon26.png);}
}
.car-top-btn{font-size:rem(12);
  p{margin-left:rem(10);width:rem(70);height:rem(24);line-height:rem(24);text-align:center;background-color:#fff;color:$red;border-radius:rem(5);}
}
.car-ul{padding:0 rem(10)}
.car-li{padding:rem(10) 0;border-bottom:1px solid #f1f1f1;}
.car-li-choose{margin-right:rem(10);width:rem(20);height:rem(20);background-repeat:no-repeat;background-position:center;background-size:contain;background-image:url(../assets/icon23.png);
  &.active{background-image:url(../assets/icon24.png);}
  &.cur{background-image:url(../assets/icon24h.png);}
}
.car-li-img{width:rem(100);height:rem(100);margin-right:rem(10);background-color:#f1f1f1;
  img{display:block;width:100%;height:100%;}
}
.car-li-desc{
  .title{height:rem(20);height:rem(20);font-size:rem(14);display: -webkit-box !important;-webkit-box-orient: vertical;word-break:break-all;text-overflow: ellipsis;overflow: hidden;-webkit-line-clamp:1;}
  .desc{color:#8F8F90;display: -webkit-box !important;-webkit-box-orient: vertical;word-break:break-all;text-overflow: ellipsis;overflow: hidden;-webkit-line-clamp:1;}
  .state{margin:rem(5) 0;padding:rem(5);display:inline-block;background-color:#FAF9F9;color:#8F8F90;
    p{float:left;margin-right:rem(8);}
  }
}
.car-li-com{}
.car-li-num{text-align:center;
  .btn{width:rem(30);line-height:rem(30);background-color:#F4F3F3;font-size:rem(20);}
  .num{width:rem(40);height:rem(30);line-height:rem(30);text-align:center;}
}
.car-li-price{font-size:rem(20);color:$red;}
.car-com{position:fixed;left:50%;bottom:rem(45);z-index:3;transform:translateX(-50%);width:100%;max-width:15rem;border-top:1px solid #f1f1f1;}
.car-com-cont{}
.car-com-a{
  p{margin-left:rem(5);width:rem(35);height:rem(35);line-height:rem(35);text-align:center;border:1px solid #C5C5C5;border-radius:50%;}
}
.car-com-intro{text-align:right;
  .price{padding-top:rem(5);color:$red;}
}
.car-com-btn{margin-left:rem(10);width:rem(140);line-height:rem(50);text-align:center;color:#fff;background-color:$red;font-size:rem(16);}
</style>
