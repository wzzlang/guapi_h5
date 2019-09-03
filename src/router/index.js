import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: resolve => require(['@/page/index'], resolve)
    },
    {
      path: '/Ware',
      name: 'Ware',
      component: resolve => require(['@/page/Ware'], resolve)
    },
    {
      path: '/Car',
      name: 'Car',
      component: resolve => require(['@/page/Car'], resolve)
    },
    {
      path: '/Mine',
      name: 'Mine',
      component: resolve => require(['@/page/Mine'], resolve)
    },
    {
      path: '/MoreWare/:id/:title',
      name: 'MoreWare',
      component: resolve => require(['@/page/MoreWare'], resolve)
    },
    {
      path: '/SortWare/:id',
      name: 'SortWare',
      component: resolve => require(['@/page/SortWare'], resolve)
    },
    {
      path: '/SearchWare',
      name: 'SearchWare',
      component: resolve => require(['@/page/SearchWare'], resolve)
    },
    {
      path: '/WareDetails/:id',
      name: 'WareDetails',
      component: resolve => require(['@/page/WareDetails'], resolve)
    },
    {
      path: '/LoginPhone',
      name: 'LoginPhone',
      component: resolve => require(['@/page/loginSign/LoginPhone'], resolve)
    },
    {
      path: '/LoginName',
      name: 'LoginName',
      component: resolve => require(['@/page/loginSign/LoginName'], resolve)
    },
    {
      path: '/SignIn',
      name: 'SignIn',
      component: resolve => require(['@/page/loginSign/SignIn'], resolve)
    },
    {
      path: '/BindPhone',
      name: 'BindPhone',
      component: resolve => require(['@/page/loginSign/BindPhone'], resolve)
    },
    {
      path: '/ForgetPassword',
      name: 'ForgetPassword',
      component: resolve => require(['@/page/loginSign/ForgetPassword'], resolve)
    },
    {
      path: '/MilkPrice',
      name: 'MilkPrice',
      component: resolve => require(['@/page/MilkPrice'], resolve)
    },
    {
      path: '/UploadIDcard',
      name: 'UploadIDcard',
      component: resolve => require(['@/page/UploadIDcard'], resolve)
    },
    {
      path: '/StorePickingAustra/:list',
      name: 'StorePickingAustra',
      component: resolve => require(['@/page/car/StorePickingAustra'], resolve)
    },
    {
      path: '/StorePickingChina/:list',
      name: 'StorePickingChina',
      component: resolve => require(['@/page/car/StorePickingChina'], resolve)
    },
    {
      path: '/PutCloud/:list',
      name: 'PutCloud',
      component: resolve => require(['@/page/car/PutCloud'], resolve)
    },
    {
      path: '/OrderSuccess/:list/:type',
      name: 'OrderSuccess',
      component: resolve => require(['@/page/car/OrderSuccess'], resolve)
    },
    {
      path: '/StoreDeliverAustra/:list',
      name: 'StoreDeliverAustra',
      component: resolve => require(['@/page/car/StoreDeliverAustra'], resolve)
    },
    {
      path: '/StoreDeliverChina/:list',
      name: 'StoreDeliverChina',
      component: resolve => require(['@/page/car/StoreDeliverChina'], resolve)
    },
    {
      path: '/SplitDrag',
      name: 'SplitDrag',
      component: resolve => require(['@/page/car/SplitDrag'], resolve)
    },
    {
      path: '/SplitDragRecipientKuAdd/:id',
      name: 'SplitDragRecipientKuAdd',
      component: resolve => require(['@/page/car/SplitDragRecipientKuAdd'], resolve)
    },
    {
      path: '/SplitDragRecipientLead/:id',
      name: 'SplitDragRecipientLead',
      component: resolve => require(['@/page/car/SplitDragRecipientLead'], resolve)
    },
    {
      path: '/AddresserLead/:type',
      name: 'AddresserLead',
      component: resolve => require(['@/page/car/AddresserLead'], resolve)
    },
    {
      path: '/ChooseStore/:storeList',
      name: 'ChooseStore',
      component: resolve => require(['@/page/car/ChooseStore'], resolve)
    },
    {
      path: '/LeadRecipientZu/:ids',
      name: 'LeadRecipientZu',
      component: resolve => require(['@/page/car/LeadRecipientZu'], resolve)
    },
    {
      path: '/ParcelEdit/:id/:ids',
      name: 'ParcelEdit',
      component: resolve => require(['@/page/car/ParcelEdit'], resolve)
    },
    {
      path: '/orderCloud/:areacode',
      name: 'orderCloud',
      component: resolve => require(['@/page/order/orderCloud'], resolve)
    },
    {
      path: '/orderStore/:type',
      name: 'orderStore',
      component: resolve => require(['@/page/order/orderStore'], resolve)
    },
    {
      path: '/OrderStoreDetails/:id/:type',
      name: 'OrderStoreDetails',
      component: resolve => require(['@/page/order/OrderStoreDetails'], resolve)
    },
    {
      path: '/OrderCloudDetails/:id/:type',
      name: 'OrderCloudDetails',
      component: resolve => require(['@/page/order/OrderCloudDetails'], resolve)
    },
    {
      path: '/RecipientKu',
      name: 'RecipientKu',
      component: resolve => require(['@/page/member/RecipientKu'], resolve)
    },
    {
      path: '/RecipientKuEdit/:id',
      name: 'RecipientKuEdit',
      component: resolve => require(['@/page/member/RecipientKuEdit'], resolve)
    },
    {
      path: '/RecipientKuAdd/:index',
      name: 'RecipientKuAdd',
      component: resolve => require(['@/page/member/RecipientKuAdd'], resolve)
    },
    {
      path: '/RecipientZu',
      name: 'RecipientZu',
      component: resolve => require(['@/page/member/RecipientZu'], resolve)
    },
    {
      path: '/RecipientZuAdd/:ids',
      name: 'RecipientZuAdd',
      component: resolve => require(['@/page/member/RecipientZuAdd'], resolve)
    },
    {
      path: '/RecipientZuEdit/:id',
      name: 'RecipientZuEdit',
      component: resolve => require(['@/page/member/RecipientZuEdit'], resolve)
    },
    {
      path: '/RecipientLead/:index',
      name: 'RecipientLead',
      component: resolve => require(['@/page/member/RecipientLead'], resolve)
    },
    {
      path: '/AddresserKu',
      name: 'AddresserKu',
      component: resolve => require(['@/page/member/AddresserKu'], resolve)
    },
    {
      path: '/AddresserAdd',
      name: 'AddresserAdd',
      component: resolve => require(['@/page/member/AddresserAdd'], resolve)
    },
    {
      path: '/AddresserEdit/:id',
      name: 'AddresserEdit',
      component: resolve => require(['@/page/member/AddresserEdit'], resolve)
    },
    {
      path: '/MyCloud',
      name: 'MyCloud',
      component: resolve => require(['@/page/member/MyCloud'], resolve)
    },
    {
      path: '/MyCloudEdit/:type',
      name: 'MyCloudEdit',
      component: resolve => require(['@/page/member/MyCloudEdit'], resolve)
    },
    {
      path: '/MyCloudSplitDrag',
      name: 'MyCloudSplitDrag',
      component: resolve => require(['@/page/member/MyCloudSplitDrag'], resolve)
    },
    {
      path: '/MyCloudEditAustra/:list',
      name: 'MyCloudEditAustra',
      component: resolve => require(['@/page/member/MyCloudEditAustra'], resolve)
    },
    {
      path: '/MyCloudEditChina/:list',
      name: 'MyCloudEditChina',
      component: resolve => require(['@/page/member/MyCloudEditChina'], resolve)
    },
    {
      path: '/Collect',
      name: 'Collect',
      component: resolve => require(['@/page/member/Collect'], resolve)
    },
    {
      path: '/UpdateInfo',
      name: 'UpdateInfo',
      component: resolve => require(['@/page/member/UpdateInfo'], resolve)
    },
    {
      path: '/MyIntegral',
      name: 'MyIntegral',
      component: resolve => require(['@/page/member/MyIntegral'], resolve)
    },
    {
      path: '/MyIntegralInvite',
      name: 'MyIntegralInvite',
      component: resolve => require(['@/page/member/MyIntegralInvite'], resolve)
    },
    {
      path: '/MyIntegralWater',
      name: 'MyIntegralWater',
      component: resolve => require(['@/page/member/MyIntegralWater'], resolve)
    },
    {
      path: '/Recharge',
      name: 'Recharge',
      component: resolve => require(['@/page/member/Recharge'], resolve)
    },
    {
      path: '/CloudLog',
      name: 'CloudLog',
      component: resolve => require(['@/page/member/CloudLog'], resolve)
    },
    {
      path: '/BalanceLog',
      name: 'BalanceLog',
      component: resolve => require(['@/page/member/BalanceLog'], resolve)
    },
    {
      path: '/IntegralLog',
      name: 'IntegralLog',
      component: resolve => require(['@/page/member/IntegralLog'], resolve)
    },
    {
      path: '/Help',
      name: 'Help',
      component: resolve => require(['@/page/member/Help'], resolve)
    },
    {
      path: '/HelpDetails/:id',
      name: 'HelpDetails',
      component: resolve => require(['@/page/member/HelpDetails'], resolve)
    },
    {
      path: '/PaySuccess',
      name: 'PaySuccess',
      component: resolve => require(['@/page/car/PaySuccess'], resolve)
    }
  ]
})
