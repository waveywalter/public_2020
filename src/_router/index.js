import Vue from 'vue';
import Router from 'vue-router';
import { userService } from '../_services';
import * as Cookie from 'js-cookie';

import LandingPage from '../components/LandingPage';
import UserProfiles from '../_pages/UserProfiles'
import LoginPage from '../_pages/LoginPage'
import RegisterPage from '../_pages/RegisterPage'
import adminHome from '../_pages/adminHome'
import humanResourceHome from '../_pages/humanResourceHome'
import salesHome from '../_pages/salesHome'
import rtfHome from '../_pages/rtfHome'
import ownerHome from '../_pages/ownerHome'
import affiliateHome from '../_pages/affiliateHome'
import Testpage from '../_pages/TestPage'
import AdminDashBoard from '../components/adminComponents/adminDashBoard'
import adminForms from '../_pages/Formspage'
import createadmin from '../_pages/createuser'
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
import formViewer from '../components/formViewerComponents/formViewer'
import crm from '../components/crmComponents/crmComponent'
import crmpage from '../_pages/crmpage'
import MyProfile from '../_pages/MyProfile'
import formBuilder from '../formBuilder/formBuilder'
import testfunctions from '../_pages/testfunctions'
import tinymceformbuilder from '../_pages/TinymceFormbuilder'
import facilities from '../_pages/facilitiesHome'
import assignform from '../_pages/assignform'
import employeeHome from '../_pages/employeeHome'
import employeedashboard from '../components/employeeComponent/Employeedashboard'
import newaffiliate from '../components/salesComponents/NewAffiliateform'
import newaffiliatepage from '../_pages/newaffiliatepage'
import createlead from '../components/salesComponents/createlead'
import createleadpage from '../_pages/createleadpage'
import affiliateregistrationpage from '../_pages/affiliateregistrationpage'
import affiliateregistration from '../components/salesComponents/AffiliateRegistration'
import affiliatespage from '../_pages/affiliatespage'
import applicationspage from '../_pages/applicationspage'


Vue.use(Router);
let user = JSON.parse(localStorage.getItem('user'));

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/assignform', component: assignform },
    { path: '/test', component: Testpage },
    { path: '/test/:id', component: formViewer },
    { path: '/tinymceformbuilder', component: tinymceformbuilder },
    { path: '/forbidden', component: forbiddenerror },
    {
      path: '/owner', component: ownerHome,
      children: [
        { path: '', component: OwnerDashboard },
        { path: 'myprofile', component: MyProfile }
      ],
      beforeEnter: (to, from, next) => {
        if (user.user.role == "owner") {
          next();
        } else {
          next("/forbidden")
        }
      }
    },
    { path: '/userlist', component: testfunctions },
    {
      path: '/', component: LandingPage,
      beforeEnter: (to, from, next) => {
        if (user == null) {
          next('/login')
        } else {
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

    {
      path: '/homepage', component: HomePage,
      beforeEnter: (to, from, next) => {
        if (user.user.role == 'sales') {
          next('/sales');
        } else if (user.user.role == "rtf") {
          next('/rtf');
        } else if (user.user.role == "humanResource") {
          next('/humanResource');
        } else if (user.user.role == "admin") {
          next('/admin');
        } else if (user.user.role == "owner") {
          next('/owner');
        } else if (user.user.role == "affiliate") {
          next('/affiliate');
        } else if (user.user.role == "employee") {
          next('/employee');
        } else {
          next();
        }
      }
    },
    {
      path: '/rtf', component: rtfHome,
      children: [
        { path: '', component: RTFdashboard },
        { path: 'myprofile', component: MyProfile }
      ],
      beforeEnter: (to, from, next) => {
        if (user.user.role == 'rtf') {
          next();
        } else {
          next("/forbidden")
        }
      }
    },
    {
      path: '/employee', component: employeeHome,
      children: [
        { path: '', component: employeedashboard },
        { path: 'myprofile', component: MyProfile }
      ],
      beforeEnter: (to, from, next) => {
        if (user.user.role == 'employee') {
          next();
        } else {
          next("/forbidden")
        }
      }
    },
    { path: '/UserProfiles', component: UserProfiles },
    {
      path: '/login', component: LoginPage,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem(user) === user) {
          next()
        } else {
          history.back()
        }
      }
    },
    { path: '/register', component: RegisterPage },


    {path: '/sales', component: salesHome,
      children: [
        //{ path: ':root/forms/:fid', component: affiliatespage },
        //{ path: ':root/affiliate/forms/:fid', component: affiliatespage },
        { path: 'myprofile', component: MyProfile },
        { path: '', component: SalesDashBoard },
        { path: 'crm/:id?', component: crm },
        { path: 'affiliate/:id?', component: affiliatespage,
        children: [
          {path: 'forms/:fid?', component: affiliatespage}
        ]
      },
//        { path: 'applicant/:id?', component: applicationspage },
        { path: ':root/:id?', component: applicationspage },
        { path: '/crmpage', component: crmpage },
        { path: '/createlead', component: createlead },
        { path: '/createleadpage', component: createleadpage },
        { path: '/newaffiliate', component: newaffiliate },
        { path: '/newaffiliatepage', component: newaffiliatepage },
        { path: '/affiliateregistration', component: affiliateregistration },
        { path: '/affiliateregistrationpage', component: affiliateregistrationpage }
      ],
      beforeEnter: (to, from, next) => {
        if (user.user.role == 'sales'|| user.user.role == 'humanResource') {
          next();
        } else {
          next("/forbidden")
        }
      }
    },
    {
      path: '/affiliate', component: affiliateHome,
      children: [
        { path: '', component: affiliatedashboard },
        {path: 'forms/:fid?', component: affiliatedashboard},
        { path: '/affiliate/:formtype/:id', component: affiliatedashboard },
        { path: 'myprofile', component: MyProfile }
      ],
      beforeEnter: (to, from, next) => {
        if (user.user.role == 'affiliate') {
          next();
        } else {
          next("/forbidden")
        }
      }
    },
    
    {path: '/humanResource', component: humanResourceHome,
      children: [
        { path: 'myprofile', component: MyProfile },
        { path: '', component: HrDashBoard },
        { path: 'hrforms', component: adminForms },
        { path: 'crm/:id?', component: crm },
        { path: 'affiliate/:id?', component: affiliatespage,
        children: [
          {path: 'forms/:fid?', component: affiliatespage}
        ]
      }
        
      ],
      beforeEnter: (to, from, next) => {
        // userService.checkrole().then(res => res.json()).then(roleMapping => {
        //   if ((user.user.role == "humanResource") && roleMapping.id) {
        //     next();
        //   } else {
        //     next("/forbidden")
        //   }
        // });
        next();
      }
    },
    {
      path: '/admin', component: adminHome,
      children: [
        { path: '', component: AdminDashBoard },
        { path: 'myprofile', component: MyProfile },
        // { path: 'createAdmin', component: createadmin },
        { path: 'adminforms', component: adminForms },

      ],
      beforeEnter: (to, from, next) => {
        userService.checkrole().then(res => res.json()).then(roleMapping => {
          console.log(roleMapping.id)
          if ((user.user.role == "admin") && roleMapping.id) {
            next();
          } else {
            next("/forbidden")
          }
        });
      }
    },
    { path: '/facilities', component: facilities },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {

  const publicPages = ['/', '/login', '/register', '/test'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
})