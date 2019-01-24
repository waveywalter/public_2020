import Vue from 'vue';
import Router from 'vue-router';
import { userService } from '../_services';
import * as Cookie from 'js-cookie';

import LandingPage from '../components/LandingPage';
import UserProfiles from '../_pages/UserProfiles'
import LoginPage from '../_pages/LoginPage'
import RegisterPage from '../_pages/RegisterPage'
import adminHome from '../_pages/adminHome'
import Testpage from '../_pages/TestPage'
import AdminDashBoard from '../components/adminComponents/adminDashBoard'
import CreateAdmin from '../components/adminComponents/createAdmin'
import HrDashBoard from '../components/hrComponents/HrDashBoard'
import hrcreateform from '../components/hrComponents/hrcreateform'
import SalesDashBoard from '../components/salesComponents/SalesDashBoard'
import NewAffiliateform from '../components/salesComponents/NewAffiliateform'
import testpage2 from '../_pages/testpage2'
import HomePage from '../_pages/HomePage'
import forbiddenerror from '../_pages/forbiddenerror'
import affiliatedashboard from '../components/affiliateComponents/affiliateDashboard'
import RTFdashboard from '../components/RTFComponents/RTFdashboard'
import OwnerDashboard from '../components/ownerComponents/OwnerDashboard'
import MyProfile from  '../_pages/MyProfile'

Vue.use(Router);
let user = JSON.parse(localStorage.getItem('user'));

//let affiliateRoutes = []
//affiliateRoutes = affiliateRoutes.concat(Testpage,testpage2)
//const affiliate = affiliateRoutes

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/forbidden', component:forbiddenerror},
    {path: '/ownerdashboard', component:OwnerDashboard,
    beforeEnter: (to,from,next) =>{
      if(user.user.role == "owner" ){
        next();
      }else {
        next("/forbidden")
      }
    }
  },

    { path: '/', component: LandingPage,
    beforeEnter: (to,from,next) => {
      if(user == null){
          next('/login')
      } else{
        next('/homepage')
      }
    }  
  },
  // { path: '/myprofile', component: MyProfile,
  //   beforeRouteEnter: (to,from,next) => {
  //     if(localStorage.getItem(user) === user){
  //         next();
  //     }
  //   }  
  // },
    { path: '/homepage', component:HomePage,
    beforeEnter: (to,from,next) => {
      if(user.user.role == 'sales'){
        next ('/salesdashboard');
      } else if (user.user.role == "rtf"){
        next('/rtfdashboard');
      } else if (user.user.role == "humanResource"){
        next('/hrdashboard');
      } else if (user.user.role == "admin"){
        next('/admin');
      } else if (user.user.role == "owner" ){
        next('/ownerdashboard');
      }else if (user.user.role == "affiliate" ){
        next('/affiliatedashboard');
      }else{
        next();
      }
    }
  },
  {path: '/rtfdashboard',component: RTFdashboard,
  beforeEnter: (to,from,next) =>{
    if(user.user.role == 'rtf'){
      next();
    }else {
      next("/forbidden")
    }
  }
},
{path: '/affiliatedashboard',
component: affiliatedashboard,
children: [
  { path: 'MyProfile', 
  component: MyProfile 
    },
  ],
beforeEnter: (to,from,next) =>{
  if(user.user.role == 'affiliate'){
    next();
  }else {
    next("/forbidden")
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
    { path: '/salesdashboard/:id?', component:SalesDashBoard,
    children: [
      // {path: 'NewAffiliateform', component:NewAffiliateform},
      { path: 'myprofile', component: MyProfile },
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
          { path: 'test1', component: Testpage },
          { path: 'test2', component: testpage2 }
        ]
    // beforeEnter: (to,from,next) =>{
    //   if(user.user.role == 'humanResource'){
    //     next();
    //   }else {
    //     next("/forbidden")
    //   }
    // }
  },
    { path: '/admin', component: adminHome,
    children: [
      {path:'', component: AdminDashBoard},
      { path: 'MyProfile', component: MyProfile }
    ],
    beforeEnter: (to,from,next) => {
      userService.checkrole().then(res => res.json()).then(roleMapping => {
            if ((user.user.role == "admin") && roleMapping.id) {
              next();
            }else {
              next("/forbidden")
            }
        });
    }
  },
  //   { path: '/affiliatedashboard', component: affiliatedashboard,
  //   children: [
  //     { path: 'test1', component: Testpage },
  //     { path: 'test2', component: testpage2 },
  //   ], 
  //   beforeEnter: (to,from,next) => {
  //     userService.checkrole().then(res => res.json()).then(roleMapping => {
  //           if ((user.user.role == "owner") && roleMapping.id) {
  //             next();
  //           }else {
  //             //alert("owner only")
  //             history.back()
  //           }
  //       });
  //   }
  //  },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {

  const publicPages = ['/','/login', '/register',];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
})