import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from '../components/LandingPage';
import UserProfiles from '../_pages/UserProfiles'
import LoginPage from '../_pages/LoginPage'
import RegisterPage from '../_pages/RegisterPage'
import Testpage from '../_pages/Testpage'
import AdminDashBoard from '../components/adminComponents/adminDashBoard'
import CreateAdmin from '../components/adminComponents/createAdmin'
import HrDashBoard from '../components/hrComponents/HrDashBoard'
import hrcreateform from '../components/hrComponents/hrcreateform'
import SalesDashBoard from '../components/salesComponents/SalesDashBoard'
import NewAffiliateform from '../components/salesComponents/NewAffiliateform'
import affiliatePage from '../_pages/affiliatepage'
import testpage2 from '../_pages/testpage2'
import HomePage from '../_pages/HomePage'
import forbiddenerror from '../_pages/forbiddenerror'
import affiliatedashboard from '../components/affiliateComponents/affiliateDashboard'


Vue.use(Router);
let user = JSON.parse(localStorage.getItem('user'));

let affiliateRoutes = []
affiliateRoutes = affiliateRoutes.concat(Testpage,testpage2)
const affiliate = affiliateRoutes

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/forbidden', component:forbiddenerror},

    { path: '/', component: LandingPage,
    beforeEnter: (to,from,next) => {
      if(user = true){
        history.back()
      } else {
        next ('/login')
      }
    }  
  },
    { path: '/homepage', component:HomePage,
    beforeEnter: (to,from,next) => {
      if(user.user.role == 'sales'){
        next ('/salesdashboard');
      } else if (user.user.role == 'affiliate'){
        next('/affiliatedashboard');
      }
    }
  },
    { path: '/UserProfiles', component: UserProfiles },
    { path: '/login', component: LoginPage,
    beforeEnter: (to,from,next) => {
      if (localStorage.getItem(user) === user) {
        next()
      }else{
        history.back()
      }
    }
  },
    { path: '/register', component: RegisterPage },
    { path: '/salesdashboard', component:SalesDashBoard,
    children: [
      {path: 'NewAffiliateform', component:NewAffiliateform}
     ],
     beforeEnter: (to,from,next) => {
       if(user.user.role == 'sales'){
         next();
       }else {
         next("/forbidden")
       }
     }
    },
    { path: '/HrDashBoard', component: HrDashBoard,
    children: [
      {path:'hrcreateform', component: hrcreateform}
    ]
  },
    { path: '/admindashboard', component: AdminDashBoard,
    children: [
      {path:'createadmin', component: CreateAdmin}
    ]
  },
  { path: '/affiliatedashboard', component: affiliatedashboard},

  //   { path: '/affiliatepage', component: affiliatePage,
  //   children: [
  //     { path: 'test1', component: Testpage },
  //     { path: 'test2', component: testpage2 },
  //   ], 
  //   // beforeEnter: (to,from,next) => {
  //   //   if(user.user.role == 'affiliate'){
  //   //     next();
  //   //   }
  //   // }
  //  },



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