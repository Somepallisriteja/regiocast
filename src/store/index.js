import Vuex from 'vuex'
import Vue from 'vue'
import streamData from '@/store/streamData'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    streamData,
  },
})

export default store