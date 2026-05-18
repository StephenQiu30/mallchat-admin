export default [
  { path: '/', redirect: '/admin/user' },
  {
    name: '用户管理',
    path: '/admin/user',
    component: './Admin/UserList',
    icon: 'UserOutlined',
    access: 'canAdmin',
  },
  {
    name: '通知管理',
    path: '/admin/notification',
    component: './Admin/NotificationList',
    icon: 'NotificationOutlined',
    access: 'canAdmin',
  },
  {
    name: '聊天室管理',
    path: '/admin/chat_room',
    component: './Admin/ChatRoomList',
    icon: 'GroupOutlined',
    access: 'canAdmin',
  },
  {
    name: '好友申请管理',
    path: '/admin/friend_apply',
    component: './Admin/FriendApplyList',
    icon: 'UsergroupAddOutlined',
    access: 'canAdmin',
  },
  {
    name: 'AI 对话管理',
    path: '/admin/ai_chat',
    component: './Admin/AIChatRecordList',
    icon: 'MessageOutlined',
    access: 'canAdmin',
  },
  {
    name: '群组管理',
    path: '/admin/group',
    component: './Admin/GroupList',
    icon: 'TeamOutlined',
    access: 'canAdmin',
  },
  {
    name: '数据统计',
    path: '/admin/statistics',
    component: './Admin/Statistics',
    icon: 'BarChartOutlined',
    access: 'canAdmin',
  },
  {
    name: '日志总览',
    path: '/admin/loglist',
    component: './Admin/LogList',
    icon: 'FileTextOutlined',
    access: 'canAdmin',
  },

  {
    name: '日志管理',
    path: '/admin/log',
    icon: 'HistoryOutlined',
    access: 'canAdmin',
    routes: [
      {
        name: '文件上传日志',
        path: '/admin/log/file/upload',
        component: './Admin/Log/FileUploadRecord',
      },

      {
        name: 'API 访问日志',
        path: '/admin/log/api',
        component: './Admin/Log/ApiAccessLog',
      },
      {
        name: '操作日志',
        path: '/admin/log/operation',
        component: './Admin/Log/OperationLog',
      },
      {
        name: '登录日志',
        path: '/admin/log/login',
        component: './Admin/Log/UserLoginLog',
      },
    ],
  },

  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    name: '个人中心',
    path: '/account/center',
    component: './Account/Center',
    icon: 'UserOutlined',
    hidden: true,
    access: 'canUser',
  },

  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    layout: false,
    routes: [
      {
        path: '/exception',
        redirect: '/exception/403',
      },
      {
        name: '403',
        icon: 'smile',
        path: '/exception/403',
        component: './Exception/403',
      },
      {
        name: '404',
        icon: 'smile',
        path: '/exception/404',
        component: './Exception/404',
      },
      {
        name: '500',
        icon: 'smile',
        path: '/exception/500',
        component: './Exception/500',
      },
    ],
  },
  { path: '*', layout: false, component: './Exception/404' },
];
