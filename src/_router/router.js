import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from '../components/LandingPage';
import HomePage from '../_pages/HomePage'
import LoginPage from '../_pages/LoginPage'
import RegisterPage from '../_pages/RegisterPage'
import Testpage from '../_pages/Testpage'
import AdminDashBoard from '../components/adminComponents/adminDashBoard'
import CreateAdmin from '../components/adminComponents/createAdmin'
import affiliatePage from '../_pages/affiliatepage'


Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: LandingPage },
    { path: '/homepage', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/testpage', component: Testpage},
    { path: '/admindashboard', component: AdminDashBoard},
    { path: '/createadmin', component: CreateAdmin},
    { path: '/affiliatepage', component: affiliatePage},



    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  let user = JSON.parse(localStorage.getItem('user'));

  const publicPages = ['/','/login', '/register',];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // const affiliateUsers = localStorage.getItem('user.role' === 'affiliate');
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();

})