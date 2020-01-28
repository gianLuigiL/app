import m from "./mutations"
import { cloneDeep } from "lodash"

const defaultUser = {}
const defaultFilters = {}

export default {
    state: {
        selected: cloneDeep(defaultUser),
        all: [],
        token: null,
    },
    mutations: {
        [m.set](state, selected) {
            state.selected = selected
        },
        [m.unset](state) {
            state.selected = cloneDeep(defaultUser)
        },
        [m.setAll](state, all) {
            state.all = all
        },
        [m.unsetAll](state) {
            state.all = []
        },
        [m.setCSRF](state, token) {
            state.token = token;
        }
    }
}