import Vue from 'vue';
import Router from 'vue-router';
import { userService } from '../_services';
import * as Cookie from 'js-cookie';

import LandingPage from '../components/LandingPage';
import UserProfiles from '../_pages/UserProfiles'
import LoginPage from '../_pages/LoginPage'
import RegisterPage from '../_pages/RegisterPage'
import adminHome from '../_pages/adminHome'
import humanresourceHome from '../_pages/humanresourceHome'
import salesHome from '../_pages/salesHome'
import rtfHome from '../_pages/rtfHome'
import ownerHome from '../_pages/ownerHome'
import affiliateHome from '../_pages/affiliateHome'
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
import facilities from  '../_pages/facilitiesHome'

Vue.use(Router);
let user = JSON.parse(localStorage.getItem('user'));

//let affiliateRoutes = []
//affiliateRoutes = affiliateRoutes.concat(Testpage,testpage2)
//const affiliate = affiliateRoutes

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/forbidden', component:forbiddenerror},
    {path: '/owner', component:ownerHome,
    children: [
      { path: '', component: OwnerDashboard },
      { path: 'myprofile', component: MyProfile }
    ],
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
        next ('/sales');
      } else if (user.user.role == "rtf"){
        next('/rtf');
      } else if (user.user.role == "humanResource"){
        next('/humanresource');
      } else if (user.user.role == "admin"){
        next('/admin');
      } else if (user.user.role == "owner" ){
        next('/owner');
      }else if (user.user.role == "affiliate" ){
        next('/affiliate');
      }else{
        next();
      }
    }
  },
  {path: '/rtf',component: rtfHome,
  children: [
    { path: '', component: RTFdashboard },
    { path: 'myprofile', component: MyProfile }
  ],
  beforeEnter: (to,from,next) =>{
    if(user.user.role == 'rtf'){
      next();
    }else {
      next("/forbidden")
    }
  }
},
{path: '/affiliate', component: affiliateHome,
children: [
  { path: '', component: affiliatedashboard },
    { path: 'myprofile', component: MyProfile }
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
    { path: '/sales', component:salesHome,
    children: [
      { path: '', component: SalesDashBoard },
      { path: 'myprofile', component: MyProfile },
      { path: ':id?', component: SalesDashBoard }
      //{path: 'NewAffiliateform', component:NewAffiliateform},
     ],
     beforeEnter: (to,from,next) => {
       if(user.user.role == 'sales'){
         next();
       }else {
         next("/forbidden")
       }
     }
    },
    { path: '/humanresource', component: humanresourceHome,
    children: [
          { path: '', component: HrDashBoard },
          { path: 'myprofile', component: MyProfile }
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
      { path: 'myprofile', component: MyProfile }
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
  {path:'/facilities', component: facilities},
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