import Vue from "vue";
import Vuex from "vuex";

//import {nanoid} from 'nanoid'
Vue.use(Vuex);

const routeAbout = {
  namespaced: true,
  state: () => ({
    path: "/",
  }),
  mutations: {
    changePath(state, value) {
      state.path = value;
    },
  },
};

const playerAbout = {
  namespaced: true,
  state: () => ({
    playingIndex:0,
    isPlaying:false,
    playList: [
       {
          }, 
    ],
  }),
  mutations: {
    pushSong(state, obj) {
      state.playList.splice(state.playingIndex+1,0,obj);
    },
    changePlayingIndex(state,val){
      state.playingIndex=val
    }
  },
  actions: {
    pushSong({ commit, state }, obj) {
      const flag = state.playList.some((item) => {
        if (item.id === obj.id) return true;
      });
      if (!flag) commit("pushSong", obj);
    },
  },
};

export default new Vuex.Store({
  modules: {
    routeAbout,
    playerAbout,
  },
  state:{
    isCollapse: false,
    isMobile: false,},
});
