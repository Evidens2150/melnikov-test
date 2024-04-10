import Vue from "vue";
import Vuex from "vuex";
import { requestList } from "@/api/users.api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
    currentItem: null,
  },
  getters: {
    getList: (state) => {
      return state.list;
    },
    getCurrent: (state) => {
      return state.currentItem;
    },
  },
  mutations: {
    updateList(state, list) {
      state.list = list;
    },
    updateCurrent(state, item) {
      state.currentItem = item;
    },
  },
  actions: {
    async fetchList({ commit }, { page, results }) {
      const list = await requestList(page, results);
      commit("updateList", list);
    },
    setCurrent({ commit }, item) {
      commit("updateCurrent", item);
    },
  },
});
