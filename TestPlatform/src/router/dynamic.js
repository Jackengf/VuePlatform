var asyncRouetes = [
    {
        path:'/finance',
        component:()=>import('../views/finance.vue'),
        meta: {
            title: '财务信息',
            roles: ['admin']
        }
      },
      {
      path:'/staffs',
      component:()=>import('../views/staffs.vue'),
      meta: {
          title: '员工信息',
          roles: ['admin','guest']
        }
      }
  ];

 export default  asyncRouetes;