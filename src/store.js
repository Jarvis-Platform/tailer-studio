import Vue from "vue";
import Vuex from "vuex";
import user from "./store_old/user";

Vue.use(Vuex);

const storeData = {
  modules: {
    user: user
  }
};

const store = new Vuex.Store(storeData);

export default store;