import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from '../components/LandingPage';
import UserProfiles from '../_pages/UserProfiles'
import LoginPage from '../_pages/LoginPage'
import RegisterPage from '../_pages/RegisterPage'
import Testpage from '../_pages/Testpage'
import AdminDashBoard from '../components/adminComponents/adminDashBoard'
import CreateAdmin from '../components/adminComponents/createAdmin'
import affiliatePage from '../_pages/affiliatepage'
import testpage2 from '../_pages/testpage2'
import HomePage from '../_pages/HomePage'


Vue.use(Router);
let user = JSON.parse(localStorage.getItem('user'));
let affiliateRoutes = []
affiliateRoutes = affiliateRoutes.concat(Testpage,testpage2)
const affiliate = affiliateRoutes

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: LandingPage },
    { path: '/homepage', component:HomePage},
    { path: '/UserProfiles', component: UserProfiles },
    { path: '/login', component: LoginPage
    // ,beforeEnter:(to,from,next) => {
    //     if(loggedIn = true){
    //       history.back()
    //     }
    //   }
    },
    { path: '/register', component: RegisterPage },
    { path: '/admindashboard', component: AdminDashBoard,
    children: [
      {path:'createadmin', component: CreateAdmin}
    ]
  },
    { path: '/affiliatepage', component: affiliatePage,
    children: [
      { path: 'test1', component: Testpage },
      { path: 'test2', component: testpage2 },
    ], 
    beforeEnter: (to,from,next) => {
      if(user.user.role == 'owner'){
        next();
      }else {
                alert("owner only")
                history.back()
      }
    }
   },
  //   { path: '/testpage', component: Testpage,
  //    beforeEnter: (to,from,next) => {
  //      if(user.user.role == 'exdir'){
  //        next();
  //       } else {
  //         alert("Not Authrized")
  //         history.back()

  //       }
  //     }
  //   },
  //   { path: '/testpage2', component: testpage2, 
  //   beforeEnter: (to,from,next) => {
  //     if(user.user.role == 'exdir'){
  //       next();
  //     } else {
  //       alert("Not Authrized")
  //       history.back()
  //     }
  //   }
  // },
    // children: [{path: 'profile',component: Userprofile}]
    


    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  let user = JSON.parse(localStorage.getItem('user'));
  console.log(user)

  // let role = user.user.role;

  const publicPages = ['/','/login', '/register',];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
//  let roles = {"affiliate":"/affiliatepage/", "exdir":"/testpage/"};


  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
// if (loggedIn){
//  // return next('/affiliatepage')
//  return next(roles[user.user.role]);
// }
})