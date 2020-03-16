import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SquadHome from '../views/squad/SquadHome.vue'
import SquadApp from '../views/squad/SquadApp.vue'
import SquadAgenda from '../views/squad/SquadAgenda.vue'
import SquadChat from '../views/squad/SquadChat.vue'
import SquadSettings from '../views/squad/SquadSettings.vue'
import User from '../views/User.vue'
import EditUser from '../views/user/EditUser.vue'
import LogIn from '../views/user/LogIn.vue'
import Squad from '../views/Squad.vue'
import Team from '../views/Team.vue'
import TeamOverview from '../views/team/TeamOverview.vue'
import EditSquad from '../views/team/EditSquad.vue'
import ViewSquad from '../views/team/ViewSquad.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/squad',
    name: 'squad',
    component: Squad
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
      path: '/squad/',
      name: 'squadapp',
      component: SquadApp,
      children: [
          {
              path: '/squad/chat',
              name: 'squadchat',
              component: SquadChat
          },
          {
              path: '/squad/:id?/home',
              name: 'squadhome',
              component: SquadHome,
          },
          {
              path: '/squad/settings',
              name: 'squadsettings',
              component: SquadSettings
          },
          {
              path: '/squad/agenda',
              name: 'squadagenda',
              component: SquadAgenda
          }
        ]
    },


    {
      path: '/user/',
      name: 'user',
      component: User,
      children: [
          {
              path: '/user/edit/:id?',
              name: 'edituser',
              component: EditUser,
              props: true
          },
          {
              path: '/user/login',
              name: 'login',
              component: LogIn
          },
    ]
  },
  {
    path: '/team/',
    name: 'team',
    component: Team,
    children: [
        {
            path: '/team/overview/:id?',
            name: 'teamoverview',
            component: TeamOverview
        },
        {
            path: '/team/viewsquad/:id?', //vraagteken laat zien dat het optioneel is
            name: 'viewsquad',
            component: ViewSquad,
            props: true //Anders wordt ID niet opgehaald
        },
        {
            path: '/team/editsquad/:id?',
            name: 'editsquad',
            component: EditSquad,
            props: true
        }
  ]
}
]

const router = new VueRouter({
    // mode: 'history',
  routes
})

export default router
