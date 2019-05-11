import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import cardManage from '@/components/manage/cardManage'
import companyInfor from '@/components/manage/companyInfor'
import companyIntro from '@/components/manage/companyIntro'
import employee from '@/components/manage/employee'
import dashboard from '@/components/Dashboard'
import login from '@/components/login'
import { join } from 'path';

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/',
      name:'home',
      component: Home,
      redirect: '/dashboard'
    },
    {
      path:'/',
      component: Home,
      name: 'dashboard',
      children:[
        {path:'/dashboard', component:dashboard, name:'dashboardchart'}
      ]
    },
    {
      path:'/',
      component: Home,
      name: 'cardManage',
      children:[
        {path:'/manage/cardManage', component:cardManage, name:'carManageChart'}
      ]
    },
    {
      path:'/',
      component: Home,
      name: 'companyInfor',
      children:[
        {path: '/manage/companyInfor', component:companyInfor, name:'companyInforChart'}
      ]
    },
    {
      path:'/',
      component: Home,
      name: 'companyIntro',
      children:[
        {path: '/manage/companyIntro', component:companyIntro, name:'companyIntroChart'}
      ]
    },
    {
      path:'/',
      component: Home,
      name: 'employee',
      children:[
        {path: '/manage/employee', component:employee, name:'employeeChart'}
      ]
    }
   
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.path.startsWith('/login')){
    window.localStorage.removeItem('access-user');
    next();
  }else{
    let user = JSON.parse(window.localStorage.getItem('access-user'));
    if(!user){
      next({path:'/login'});
    }else{
      next();
    }
  }
})

export default router