import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/music/home";
import Discovery from "../pages/music/discovery";
import List from "../pages/music/list";
import SongList from '../components/songList'
import Detail from '../components/detail'
import Newest from "../pages/music/newest";
import Fm from "../pages/fm";
import Mv from "../pages/mv";
import Empty from "../pages/notFound";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "",
      component: Home,
      children: [
        {
          path: "/",
          component: Discovery,
        },
        {
          path: "/list",
          component: List,
          children:[
            {
              path:"",
              component:SongList,props:{isFull:true}
            },
            {
              path:"detail",component:Detail,props: route => ({ id: route.query.id })
            },
          ]
        },

        {
          path: "/newest",
          component: Newest,
        },
      ],
    },
    {
      path: "/fm",
      component: Fm,
    },
    {
      path: "/mv",
            
            component:Mv
            
            ,
            
            
    },
    {
      path: "/*",
      component: Empty,
    },
  ],
});
