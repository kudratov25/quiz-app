const AuthRoutes = {
  path: '/auth',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      name: 'Login',
      path: '/auth/login',
      component: () => import('@/views/authentication/auth1/LoginPage.vue')
    },
    {
      name: 'Register',
      path: '/auth/register',
      component: () => import('@/views/authentication/auth1/RegisterPage.vue')
    },
    {
      name: 'Forgot Password',
      path: '/auth/forgot-pwd1',
      component: () => import('@/views/authentication/auth1/ForgotPwd1.vue')
    },
    {
      name: 'Reset Password',
      path: '/auth/reset-pwd1',
      component: () => import('@/views/authentication/auth1/ResetPwd1.vue')
    },
    {
      name: 'Error 404',
      path: '/pages/error',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    },
    {
      path: '/auth/:provider/callback',
      name: 'SocialAuthCallback',
      component: () => import('@/views/authentication/auth1/SocialAuthCallback.vue')
    },
  ]
};

export default AuthRoutes;
