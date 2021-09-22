
import { get, post } from "./http";
//搜索组件
export const getSuggest = () => get("search/hot");
export const getTyping = (params) => get("search", params);

//轮播图组件
export const getBanner = () => get("banner");
//歌单组件
export const getTags = () => get("/playlist/highquality/tags");
export const getHighquality = (params) =>
  get("/top/playlist/highquality", params);
export const getList = (params) => get("/top/playlist", params);
export const getPlaylistDetail = (params) => get("/playlist/detail", params);

export const getSongDetail = (params) => get("/song/detail", params);
//歌组件
export const getAlbum = () => get("/top/song?type=7");
export const checkAlbum = (params) => get("/check/music",params);
//登錄
export const login=(url,params)=>get("/login"+url,{...params,timestamp:new Date().getTime()})
export const callPhone = (data) => post("/login/cellphone",{ ...data});
export const logout=()=>get("/logout")

export const personal_fm=()=>get("/personal_fm",{timestamp:new Date().getTime()})
export const intelligence=(params)=>get("/playmode/intelligence/list",params)


export const top_mv=()=>get("/top/mv")
export const simi_mv=(params)=>get("/simi/mv",params)
export const mv_url=(params)=>get("/mv/url",params)





