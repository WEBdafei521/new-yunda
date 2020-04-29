import * as stores from '../store/methods'
var routers = [
  {
    path: '/main',
    name:"main.html",
    meta:{
      isLogin:true
    },
    component:  resolve => {require(['../page/main'], resolve)},
  },
  {
    // 部门管理
    path: '/modules/yunda/depart',
    name:"modules/yunda/depart.html",
    meta:{
      isLogin:true
    },
    component:  resolve => {require(['../page/modules/yunda/depart'], resolve)},
  },
  {
    // 
    path: '/modules/sys/role',
    name: 'modules/sys/role.html',
    component: resolve => {require(['../page/modules/sys/role'], resolve)},
    meta:{
      isLogin:true
    },
  },
  {
    // 站点管理
    path: '/modules/yunda/station',
    name: 'modules/yunda/station.html',
    component: resolve => {require(['../page/modules/yunda/station'], resolve)},
    meta:{
      isLogin:true
    },
  },
  {
    // 管理员管理
    path: '/modules/sys/user',
    name: 'modules/sys/user.html',
    component: resolve => {require(['../page/modules/sys/user'], resolve)},
    meta:{
      isLogin:true
    },
  },
  {
    // 司机管理
    path: '/modules/yunda/yfybdriver',
    name: 'modules/yunda/yfybdriver',
    component: resolve => {require(['../page/modules/yunda/yfybdriver'], resolve)},
    meta:{
      isLogin:true
    },
  },
  {
    // 车辆管理
    path: '/modules/yunda/yfybvehicle',
    name: 'modules/yunda/yfybvehicle.html',
    component: resolve => {require(['../page/modules/yunda/yfybvehicle'], resolve)},
    meta:{
      isLogin:true
    },
  },
  {
    // 人车匹配
    path: '/modules/yunda/yfybuserveh',
    name: 'modules/yunda/yfybuserveh.html',
    component: resolve => {require(['../page/modules/yunda/yfybuserveh'], resolve)},
    meta:{
      isLogin:true
    },
  },
  {
    // 油卡限制管理
    path: '/modules/controlCard/yfyscontrolcard',
    name: 'modules/controlCard/yfyscontrolcard.html',
    component: resolve => {require(['../page/modules/controlCard/yfyscontrolcard'], resolve)},
    meta:{
      isLogin:true
    },
  },
  {
    // 内部M1卡管理
    path: '/modules/card/yfysmicard',
    name: 'modules/card/yfysmicard.html',
    component: resolve => {require(['../page/main'], resolve)},
    meta:{
      isLogin:true
    },
  },
  {
    // RFID卡管理
    path: '/modules/card/yfyscard',
    name: 'modules/card/yfyscard.html',
    component: resolve => {require(['../page/main'], resolve)},
    meta:{
      isLogin:true
    },
  },
// 油品管理
  // 进油管理
  {
    path: '/modules/oilRecord/yfyboilrecord',
    name: 'modules/oilRecord/yfyboilrecord.html',
    component: resolve => {require(['../page/modules/oilRecord/yfyboilrecord'], resolve)},
    meta:{
      isLogin:true
    },
  },
  // 油品管理
  {
    path: '/modules/goods/yfysgoods',
    name: 'modules/goods/yfysgoods.html',
    component: resolve => {require(['../page/modules/goods/yfysgoods'], resolve)},
    meta:{
      isLogin:true
    },
  },
  // 调价记录
  {
    path: '/modules/goods/yfysgoodsinfo',
    name: 'modules/goods/yfysgoodsinfo.html',
    component: resolve => {require(['../page/modules/goods/yfysgoodsinfo'], resolve)},
    meta:{
      isLogin:true
    },
  },
  // 标签管理
  {
    path: '/modules/goods/yfystagtype0',
    name: 'modules/goods/yfystag.html?type=0',
    component: resolve => {require(['../page/modules/goods/yfystagtype0'], resolve)},
    meta:{
      isLogin:true
    },
  },
  // 标签分配
  {
    path: '/modules/goods/yfystagtype1',
    name: 'modules/goods/yfystag.html?type=1',
    component: resolve => {require(['../page/modules/goods/yfystagtype1'], resolve)},
    meta:{
      isLogin:true
    },
  },
// 设备管理 
  // 油罐管理
  {
    path: '/modules/equipment/yfystank',
    name: 'modules/equipment/yfystank.html',
    component: resolve => {require(['../page/modules/equipment/yfystank'], resolve)},
    meta:{
      isLogin:true
    },
  },
  // 智能控制器
  {
    path: '/modules/equipment/yfyscontroller',
    name: 'modules/equipment/yfyscontroller.html',
    component: resolve => {require(['../page/modules/equipment/yfyscontroller'], resolve)},
    meta:{
      isLogin:true
    },
  },
  // 油枪管理
  {
    path: '/modules/equipment/yfysgun',
    name: 'modules/equipment/yfysgun.html',
    component: resolve => {require(['../page/modules/equipment/yfysgun'], resolve)},
    meta:{
      isLogin:true
    },
  },
// 授权管理
  // 车辆计划授权管理
  {
    path: '/modules/auth/yfybvehauthtype0',
    name: 'modules/auth/yfybvehauth.html?type=0',
    component: resolve => {require(['../page/modules/auth/yfybvehauthtype0'], resolve)},
    meta:{
      isLogin:true
    },
  },
  // 司机计划授权管理
  {
    path: '/modules/auth/yfybvehauthtype1',
    name: 'modules/auth/yfybvehauth.html?type=1',
    component: resolve => {require(['../page/modules/auth/yfybvehauthtype1'], resolve)},
    meta:{
      isLogin:true
    },
  },
  // 临时授权管理
   {
    path: '/modules/oilOrder/yfytoilorder',
    name: 'modules/oilOrder/yfytoilorder.html',
    component: resolve => {require(['../page/modules/oilOrder/yfytoilorder'], resolve)},
    meta:{
      isLogin:true
    },
  },
  // 车辆授权修改记录
  {
    path: '/modules/auth/yfybvehauthinfotype0',
    name: 'modules/auth/yfybvehauthinfo.html?type=0',
    component: resolve => {require(['../page/modules/auth/yfybvehauthinfotype0'], resolve)},
    meta:{
      isLogin:true
    },
  },
  // 司机授权修改记录
  {
    path: '/modules/auth/yfybvehauthinfotype1',
    name: 'modules/auth/yfybvehauthinfo.html?type=1',
    component: resolve => {require(['../page/modules/auth/yfybvehauthinfotype1'], resolve)},
    meta:{
      isLogin:true
    },
  },

  
  // 系统管理
  // 设备到期管理
  {
    path: '/modules/equipment/yfysequipment',
    name: 'modules/equipment/yfysequipment.html',
    component: resolve => {require(['../page/modules/equipment/yfysequipment'], resolve)},
    meta:{
      isLogin:true
    },
  },
  {
    // 加油机协议管理
    path: '/modules/potocol/yfyspotocol',
    name:"modules/potocol/yfyspotocol.html",
    meta:{
      isLogin:true
    },
    component:  resolve => {require(['../page/modules/potocol/yfyspotocol'], resolve)},
  },
  {
    // 代码生成——开发使用
    path: '/modules/gen/generator',
    name:"modules/gen/generator.html",
    meta:{
      isLogin:true
    },
    component:  resolve => {require(['../page/modules/gen/generator'], resolve)},
  },

  // 客户管理
    // 石油公司管理
  {
    path: '/modules/yunda/oilCompaniestype0',
    name:"modules/yunda/oilCompanies.html?type=0",
    meta:{
      isLogin:true
    },
    component:  resolve => {require(['../page/modules/yunda/oilCompaniestype0'], resolve)},
  },
    // 运营商管理
    {
      path: '/modules/yunda/oilCompaniestype1',
      name:"modules/yunda/oilCompanies.html?type=1",
      meta:{
        isLogin:true
      },
      component:  resolve => {require(['../page/modules/yunda/oilCompaniestype1'], resolve)},
    },
    // 客户管理
    {
      path: '/modules/yunda/yfyclient',
      name:"modules/yunda/yfyclient.html",
      meta:{
        isLogin:true
      },
      component:  resolve => {require(['../page/modules/yunda/yfyclient'], resolve)},
    },
    // MI卡管理
    {
      path: '/modules/card/yfyscardtype2',
      name: 'modules/card/yfyscard.html?type=2',
      component: resolve => {require(['../page/modules/card/yfyscardtype2'], resolve)},
      meta:{
        isLogin:true
      },
    },
    // 账户管理
    {
      path: '/modules/account/yfysaccount',
      name: 'modules/account/yfysaccount.html',
      component: resolve => {require(['../page/modules/account/yfysaccount'], resolve)},
      meta:{
        isLogin:true
      },
    },
]

export default function getMenList(){
  return new Promise((resolve, reject) =>{  
    stores.getMenList().then(res =>{
      var array = []
      var arrUrl = []
      for(var item of res){
        // 遍历出 后端传来的URL资源列表
        item.list.forEach((items,index)=>{
          array.push(items)
        })
      }
      for(var item of routers){
        for(var list of array){
          if(item.name==list.url){
            arrUrl.push(item)
          }
        }
      }
      console.log(arrUrl)
      resolve (arrUrl)
    })
  })
}