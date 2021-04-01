import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      packet: null
    },
    mutations: {
      setPacket: (state, packet) => state.packet = packet
    }
  })
  

export default store