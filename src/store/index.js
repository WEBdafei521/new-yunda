import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state={//要设置的全局访问的state对象
    tokens: localStorage.getItem('tokens') ? localStorage.getItem('tokens') : '',
    yd_user_info:{},
    yd_user_dept:{}
};
const getters = {   //实时监听state值的变化(最新状态) 使用方法：  this.$store.getters.aaa;
    nowToken(state) {
       return state.tokens
    },
    // 相当于computed计算属性，用于实时获取state中的数据
    get_yd_user_info(state) {
        return state.yd_user_info
    },
    get_yd_user_dept(state) {
        return state.get_yd_user_dept
    }
};
const mutations = { //同步修改state中的值，使用方法：this.$store.commit('方法名'，value)
    SET_TOKEN(state,tokens) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.tokens = tokens;
    },
    SET_USER_INFO(state,userInfo) {
        state.yd_user_info = userInfo
    },
    SET_USER_DEPT(state,userDept) {
        state.yd_user_dept = userDept
    },
    REMOTE_TOKEN(state) {
        state.tokens = ""
    },
    REMOTE_USER_INFO(state) {
        state.yd_user_info = ""
    },
    REMOTE_USER_DEPT(state) {
        state.yd_user_dept = ""
    },
};
const actions = { //异步调用mutation中的方法，使用方法：this.$store.dispatch('方法名'(，value))
    SET_USERS_INFO(context,userInfo) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        context.commit('SET_USER_INFO',userInfo);
    },
    SET_USERS_DEPT(context,userDept) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        context.commit('SET_USER_DEPT',userDept);
    },
    REMOTE_TOKENS(context) {
        context("REMOTE_TOKEN")
    },
    REMOTE_USERS_INFO(context) {
        context("REMOTE_USER_INFO")
    },
    REMOTE_USERS_DEPT(context) {
        context("REMOTE_USER_DEPT")
    }
};
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
 
export default store;