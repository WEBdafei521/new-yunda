import router from '../router'
import store from "./index"
export function LOGIN_OUT(Vue, options) {
        sessionStorage.removeItem('tokens');
        sessionStorage.removeItem('itemPath');
        sessionStorage.removeItem('indexPath');
        localStorage.removeItem("yd_user_info");
        localStorage.removeItem("yd_user_dept");
        localStorage.removeItem("tokens");
        store.dispatch("REMOTE_TOKENS")
        store.dispatch("REMOTE_USERS_INFO")
        store.dispatch("REMOTE_USERS_DEPT")
        router.push({path:'/'});
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
    var urlArr = url.split(".")[0]
    console.log(urlArr)

    return url
}