import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/edit-modeler/activeti'
  },
  {
    path: '/edit-modeler/activeti',
    name: 'Modeler',
    component:  () =>{
      return import('../views/edit-modeler/components/activiti')
    }
  } , {
    path: '/edit-modeler/viewer',
    name: 'Viewer',
    component:  () =>{
      return import('../views/edit-modeler/components/viewer')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
