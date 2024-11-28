const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main',
  component: () => import('@/layouts/dashboard/DashboardLayout.vue'),
  children: [
    {
      name: 'Main',
      path: '/',
      component: () => import('@/views/dashboards/default/DefaultDashboard.vue')
    },
    {
      name: 'Default',
      path: '/dashboard/default',
      component: () => import('@/views/dashboards/default/DefaultDashboard.vue')
    },
    {
      name: 'Quizzes',
      path: '/quizzes',
      component: () => import('@/views/QuizzesPage.vue')
    },
    {
      name: 'Typography',
      path: '/utils/typography',
      component: () => import('@/views/utilities/typography/TypographyPage.vue')
    },
    {
      name: 'Colors',
      path: '/utils/colors',
      component: () => import('@/views/utilities/colors/ColorPage.vue')
    },
    {
      name: 'Shadows',
      path: '/utils/shadows',
      component: () => import('@/views/utilities/shadows/ShadowPage.vue')
    },
    {
      name: 'Privacy',
      path: '/privacy',
      component: () => import('@/views/pages/terms_and_conditions/Privacy.vue')
    },
    {
      name: 'Terms',
      path: '/terms-and-conditions',
      component: () => import('@/views/pages/terms_and_conditions/Terms.vue')
    },
    {
      path: '/quizzes/:id/play',
      name: 'quizPlay',
      component: () => import('@/views/quizzes/QuizzPlayPage.vue'),
    },
  ]
};

export default MainRoutes;
