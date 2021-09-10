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
    isPlaying:true,
    playList: [
       {
         id: 1409382131,
        title: "摩天动物园",
        singer: "G.E.M.邓紫棋",
        duration: 270676,
        picUrl: "https://p1.music.126.net/KTo5oSxH3CPA5PBTeFKDyA==/109951164581432409.jpg?param=224y224", 
        url:"https://music.163.com/song/media/outer/url?id=1409382131"
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
});
