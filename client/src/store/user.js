import m from "./mutations";
import { cloneDeep } from "lodash";

const defaultUser = {};
const defaultFilters = {};

export default {
  namespaced: true,
  state: {
    selected: cloneDeep(defaultUser),
    all: [],
    filters: cloneDeep(defaultFilters),
    token: null
  },
  mutations: {
    [m.set](state, selected) {
      state.selected = selected;
    },
    [m.unset](state) {
      state.selected = cloneDeep(defaultUser);
    },
    [m.setAll](state, all) {
      state.all = all;
    },
    [m.unsetAll](state) {
      state.all = [];
    },
    [m.setFilters](state, filters) {
      state.filters = filters;
    },
    [m.unsetFilters](state) {
      state.filters = cloneDeep(defaultFilters);
    },
    [m.setCSRF](state, token) {
      state.token = token;
    }
  },
  actions: {},
  getters: {
    CSRFToken(state) {
      return state.token;
    }
  }
};
