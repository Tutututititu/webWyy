import Vue from "vue";
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import modulesA from './moduleA'
Vue.use(Vuex);

const state = {

}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        a:modulesA
    }
})

export default store