import Vue from "vue";
import Vuex from "vuex";

//import {nanoid} from 'nanoid'
Vue.use(Vuex);
import { nanoid } from "nanoid";
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
    pushAll(state, obj) {
      state.playList.splice(1,state.playList.length-1,...obj);
      state.playingIndex=1
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
    isMobile: false,
    nanoid:nanoid(),
    
    login_status:false
    },
    
});
