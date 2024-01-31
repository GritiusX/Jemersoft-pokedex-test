const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/details/:id',
    name: 'details',
    component: () => import('../views/DetailsView.vue')
  }
]
export default routes
