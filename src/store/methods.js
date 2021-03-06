import router from '../router'
import store from "./index"
import province from "../page/js/province.json"
import city from "../page/js/city"
import list from "../page/js/list"
import { updatePwd,mainInfo,getStationNumber,indexNav} from '../api/request'
import {getMenuTree} from '../api/role/index'
import {getDepartList} from '../api/sysUser/index'
import {getOilList} from '../api/yfyVehicle/index'
import {Service} from '../api/Server'

function login_outs(){
  return Service({
    url: "sys/logout",
    method:"post"
  })
}
export function LOGIN_OUT() {
        login_outs().then(res => {
          console.log(res)
          if(res.code == 0){
            sessionStorage.removeItem('tokens');
            sessionStorage.removeItem('itemPath');
            sessionStorage.removeItem('indexPath');
            sessionStorage.removeItem("yd_user_info");
            sessionStorage.removeItem("yd_user_dept");
            store.dispatch("REMOTE_TOKENS")
            store.dispatch("REMOTE_USERS_INFO")
            store.dispatch("REMOTE_USERS_DEPT")
            router.push({path:'/login'});
          }
        })
};
export function LOGIN_IN(res) {
  // 同步存储token到vuex当中 使用的是mutations
  store.commit('SET_TOKEN',res.token);
  store.commit('SET_USER_INFO',res.user);
  store.commit('SET_USER_DEPT',res.dept);
  sessionStorage.setItem("yd_user_info", JSON.stringify(res.user));
  sessionStorage.setItem("yd_user_dept", JSON.stringify(res.dept));
  sessionStorage.setItem("tokens", res.token);
  var urls = sessionStorage.getItem("urls")
                    if(urls){
                      router.push("/"+urls)
                    }else{  
                      router.push('/main')
                    }
};
// 拼接导航栏数据结构
export function setMenuList(menuList){
    var list = menuList;
    for(let i = 0; i < list.length; i++){
        for(let j = 0; j < list[i].list.length; j++){

            list[i].list[j].indexs = i+'-'+j;

        }
    }

    return list
}
export function getMenList(){
  return new Promise((resolve, reject) =>{  
    indexNav().then(res=>{
      if(res.code==0){
        var list = setMenuList(res.menuList)
        store.dispatch("SET_MENU_LIST",list)
        sessionStorage.setItem("menuList",list)
        resolve(list);
      }
    })
  })
}
// 获取菜单列表
export function getMenUrl(menuList,key){
    var list = menuList;
    var url = ""
    for(let i = 0; i<menuList.length; i++){
        for(let j = 0; j < menuList[i].list.length; j++){
          if( menuList[i].list[j].indexs == key){
              url = menuList[i].list[j].url
          }
        }
    }
    var urlArr = url.split(".");
    var labelUrl="";
    if(urlArr[1].indexOf("?") != -1){
      // yfystag?type = 1
      labelUrl = urlArr[1].split("?")[1].split("=").join("");
    }
    return urlArr[0]+labelUrl
}
// 更改面膜
export function comfirms(oldPwd,newPwd){
    var   _this = this;
    var isCheck = _this.checkedInpVal(oldPwd,newPwd)
    if(isCheck){
      updatePwd({password:oldPwd,newPassword:newPwd}).then(res => {
        if(res.code!=0){
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            });
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'success'
          });
          LOGIN_OUT()
        }
      })
    }
  }
// 更改密码 检验新旧密码
export function checkedInpVal(oldPwd,newPwd){
    if(oldPwd.length == 0 || newPwd.length == 0){
      this.$message({
        showClose: true,
        message: '输入格式不正确，请重新输入',
          type: 'warning'
      });
      return false;
    }else if(oldPwd===newPwd){
      this.$message({
        showClose: true,
        message: '两次密码不能重复，请重新输入',
          type: 'warning'
      });
      this.form.newPwd='';
      this.form.oldPwd='';
      return false;
    }else if(newPwd.length<6){
      this.$message({
        showClose: true,
        message: '新密码长度不能小于6位',
          type: 'warning'
      });
      return false;
    }else{
      return true;
    }
  }
  // 获取用户个人信息 yd_user_info
export function getLoginUser(){
    var user = JSON.parse(sessionStorage.getItem("yd_user_info"))
    return user;
}
// 获取部门信息 yd_user_dept
export function getLoginDept(){
  var dept = JSON.parse(sessionStorage.getItem("yd_user_dept"))
  return dept;
}
// 获取油站列表 用于显示首页
export function getStationPosition(){
  return new Promise((resolve, reject) =>{  

  var userInfo = getLoginUser();
  var userDept = getLoginDept();
   var orgCode =  userInfo.orgCode;
   var type="0";//表示是加油站管理人员
		if(orgCode.length==8){
			type="1";
		}else if(orgCode.length==4){
			type="2";
		}else{
			//not  do  anything
    }
    mainInfo(type).then(res=>{
      var stationArr = []
      // console.log(res)
      if(type=="2" && res.list_controller){
        for(var item of res.list_controller){
          if(item.lon > 1 && item.lat > 1 ){
            for(var items of userDept){
              if(items.orgCode == item.orgCode){
                // console.log(item)
                // console.log(items)
                var obj = {}
                obj.stationName = items.departname
                obj.people = items.attn
                obj.peoplePhone = items.mobile
                obj.controllerNo = item.controllerNo
                obj.email = items.email
                obj.address = items.address
                obj.lat = item.lat;
                obj.lon = item.lon;
                stationArr.push(obj)
              }
            }
          }
        }
      }
      var arr = JSON.stringify(stationArr)
      resolve(arr);
    })
  });
}

// 获取分配权限列表，并处理成符合element中Tree支持的格式
export function getMenuTrees(){
  return new Promise((resolve, reject) =>{  
    getMenuTree().then(res =>{
      let regionObj = {}
      res.forEach(item => {
        regionObj[item['parentId']] = regionObj[item['parentId']] || []
        regionObj[item['parentId']].push(item)
      })
      var arr = regionObj[0];
      arr.forEach((item, index) => {
        item.children = regionObj[item.menuId] ? regionObj[item.menuId] : []
        item.children.forEach(initem => {
          initem.children = regionObj[initem.menuId] ? regionObj[initem.menuId] : []
          if (initem.children.length > 0) {
            initem.children.forEach(sunitem => {
              sunitem.children = regionObj[sunitem.menuId] ? regionObj[sunitem.menuId] : []
            })
          }
        })
      })
      for (var value of res) {
        value.id=value.menuId
        value.label=value.name
        for(var items of value.children){
          items.id=items.menuId
          items.label=items.name
          for(var item of items.children){
            item.id=item.menuId
            item.label=item.name
          }
        }
      }
      console.log(arr)
      resolve(arr);
      
    })  
  });
}
// 获取全国省份
export function getProvince(e){
  var provinceList = province
  var arr = []
  for(var item in provinceList){
    let obj = {}
    obj.value = item;
    obj.label = provinceList[item];
    arr.push(obj)
  }
  return arr
}
// 通过省的编码 获取省内所有的城市
export function getCity(index){
  var cityList = city
  var arr = []
  var citys = []
  for(var item in cityList){
    if(item == index){
      arr = cityList[item]
      for(var items in arr){
        let obj = {}
        obj.value = items;
        obj.label = arr[items];
        citys.push(obj)
      }
    } 
  }
  return citys
}
// 通过市的编码 获取市内所有的县区
export function getArea(index){
  var areaList = list
  var arr = []
  var areas = []
  var index_slice = index.substr(0,4)
  for(var item in areaList){
    var item_slice = item.substr(0,4)
    
    if(item_slice == index_slice){
        let obj = {}
        obj.value = item;
        obj.label = areaList[item];
        areas.push(obj)
    } 
  }
  return areas
}
// 获取油站编号
export function getStationNum(){
  return new Promise((resolve, reject) =>{
    getStationNumber().then(res=>{
      resolve(res.departNo)
    })
  })
}

// 获取管理员页面部门列表，并处理成符合element中Tree支持的格式
export function getDepartLists(){
  return new Promise((resolve, reject) =>{  
    getDepartList().then(res =>{
      var list = res.list
      let regionObj = []
      list.forEach((item, index) => {
        item.children=[]
        if(item.parentdepartid == 0){
          regionObj.push(item)
        }else{
          if(regionObj[0].id == item.parentdepartid){
            regionObj[0].children.push(item)
          }
          for(var item_child of list){
            if(item.id == item_child.parentdepartid){
              item.children.push(item_child)
            }
          }
        }
      })
      for (var value of regionObj) {
        value.value=value.orgCode
        value.label=value.departname
        for(var items of value.children){
          items.value=items.orgCode
          items.label=items.departname
          for(var item of items.children){
            item.value=item.orgCode
            item.label=item.departname
          }
        }
      }
      resolve(regionObj);
      
    })  
  });
}

export function getroleRules(row,roleList){
  // console.log(row)
   if(row.status == 1){
    row.status="正常"
    row.roleIdList=[]
  }else{
    row.status="禁用"
    row.roleIdList=[]
  }
  var roleName = row.roleName.split(",");
  for(var i=0;i<roleName.length;i++){
    for(var item of roleList){
      if(item.label == roleName[i] ){
        if(row.roleIdList.indexOf(item.key) == -1){

          row.roleIdList.push(item.key)
        }
      }
    }
  }
  // console.log(row)
  return row;
}
// 人车匹配 规则车辆信息
export function setCarRuleInfo(carList){
  var list = carList ;
  list.forEach(element => {
    element.key = element.id,
    element.label = element.lpn
  });
  return list
}
// 车辆管理 油品列表信息规格化
export function setCarRule(list){
  return new Promise((resolve, reject) =>{  
    getOilList({page:'1',limit:"200",languageId:"2052"}).then(res=>{
      var list = res.page.list
      let regionObj = []
      list.forEach((item, index) => {
        item.children=[]
        if(!item.parentCode){
          regionObj.push(item)
        }
      })
      regionObj.forEach((item, index) => {
        list.forEach((item1, index1) => {
          if(item.oilCode==item1.parentCode && item1.parentCode){
            item.children.push(item1)
          }
        })
      })
      for (var value of regionObj) {
        value.value=value.oilCode
        value.label=value.oilName
        for(var items of value.children){
          items.value=items.oilCode
          items.label=items.oilName
        }
      }
      resolve(regionObj);
    })
  });
}

// 人民币校检
export function testMoney(value){
  var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
  if (reg.test(value)) {
    return value
  }else{
    return false;
  };
}
// 全局删除方法
export function deleteListItem(data,url){
  return Service({
    url: url,
    method:"post",
    data: data,
  })
}
// 全局获取列表方法
export function getList(data,url){
  return Service({
    url: url,
    method:"post",
    params: data,
  })
}
// 全局添加方法
export function add(data,url){
  return Service({
    url: url,
    method:"post",
    data: data,
  })
}
// 全局修改方法
export function updata(data,url){
  return Service({
    url: url,
    method:"post",
    data: data,
  })
}
// 