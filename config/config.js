// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        // {
        //   name: 'signup',
        //   path: '/user/signup',
        //   component: './user/signup',
        // },
        {
          name: 'inviteUser',
          path: '/user/forgotpassword',
          component: './user/ForgotPassword',
        },
        {
          name: 'resetPassword',
          path: '/user/resetPassword',
          component: './user/ResetPassword',
        },
        {
          name: 'inviteUser',
          path: '/user/invitation',
          component: './user/acceptInvitation',
        },
      ],
    },
    // {
    //   path: '/privacy-policy',
    //   name: 'privacyPolicy',
    //   component: './Policy',
    // },
    // {
    //   name: 'registration',
    //   path: '/register',
    //   component: './Event/Register',
    //   hideInMenu: true,
    // },
    // {
    //   name: 'membership-plans',
    //   path: '/membership-plans',
    //   component: './MemberShipList',
    //   hideInMenu: true,
    // },
    // {
    //   name: 'add-exhibitor',
    //   path: 'exhibitor/add',
    //   component: './Event/Register',
    //   hideInMenu: true,
    // },
    {
      path: '/',
      component: '../layouts/UserLayout',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/dashboard',
            },

            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              component: './Dashboard',
            },
            {
              path: '/product',
              name: 'Product',
              icon: 'BlockOutlined',
              component: './Products',
            },
            {
              path: '/inventory',
              name: 'Inventory',
              icon: 'DatabaseOutlined',
              routes: [
                {
                  path: '/inventory',
                  redirect: '/inventory/list',
                },
                {
                  path: '/inventory/list',
                  name: 'Inventory',
                  hideInMenu: true,
                  component: './Masters/ItemMaster',
                },
                {
                  path: '/inventory/:itemId/profile',
                  name: 'Inventory',
                  hideInMenu: true,
                  component: './Masters/ItemMaster/ItemProfile',
                },
              ],
            },
            {
              name: 'Purchase Order',
              path: '/purchaseOrder',
              icon: 'BarsOutlined',
              routes: [
                {
                  path: '/purchaseOrder',
                  component: './PurchaseOrder',
                  name: 'Purchase List',
                  hideInMenu: true,
                },
              ],
            },
            {
              name: 'Sales Invoice',
              path: '/salesInvoice',
              icon: 'AuditOutlined',
              routes: [
                {
                  path: '/salesInvoice',
                  component: './SalesInvoice',
                  name: 'Sales Invoice List',
                  hideInMenu: true,
                },
              ],
            },

            {
              // path: "/config",
              name: 'Config',
              icon: 'ApartmentOutlined',
              routes: [
                {
                  path: '/config/vendor',
                  name: 'Vendors',
                  icon: 'UserSwitchOutlined',
                  routes: [
                    {
                      path: '/config/vendor',
                      redirect: '/config/vendor/all',
                    },
                    {
                      path: '/config/vendor/:tabName',
                      name: 'Vendors',
                      hideInMenu: true,
                      icon: 'UserSwitchOutlined',
                      component: './Masters/Vendor',
                    },
                    {
                      path: '/config/vendor/add/new',
                      hideInMenu: true,
                      name: 'Add Vendor',
                      component: './Masters/Vendor/AddVendor',
                    },
                    {
                      path: '/config/vendor/profile/:vendorId',
                      hideInMenu: true,
                      name: 'Vendor Profile',
                      component: './Masters/Vendor/VendorProfile',
                    },
                    {
                      path: '/config/vendor/edit/:vendorId',
                      hideInMenu: true,
                      name: 'Edit Vendor',
                      component: './Masters/Vendor/AddVendor',
                    },
                  ],
                },
                {
                  path: '/config/country',
                  name: 'Enabled Country',
                  component: './Masters/Country',
                },
                {
                  path: '/config/port',
                  name: 'Port',
                  component: './Masters/Port',
                },
                {
                  path: '/config/shipping',
                  name: 'Shipping Line',
                  component: './Masters/ShippingLine',
                },
                // {
                //   path: '/config/inventory',
                //   name: 'Inventory',
                //   routes: [
                //     {
                //       path: '/config/inventory',
                //       name: 'Inventory List',
                //       hideInMenu: true,
                //       component: './Masters/ItemMaster',
                //     },
                //     {
                //       path: '/config/inventory/:itemId/profile',
                //       name: 'Items',
                //       hideInMenu: true,
                //       component: './Masters/ItemMaster/ItemProfile',
                //     },
                //   ],
                // },
                {
                  path: '/config/batches',
                  name: 'Batches',
                  routes: [
                    {
                      component: './Masters/Batches',
                      path: '/config/batches',
                      name: 'Batches',
                      hideInMenu: true,
                    },
                    {
                      component: './Masters/Batches/AddBatch',
                      path: '/config/batches/add',
                      name: 'Batches',
                      hideInMenu: true,
                    },
                    {
                      component: './Masters/Batches/AddBatch',
                      path: '/config/batches/edit/:batchId',
                      name: 'Batches',
                      hideInMenu: true,
                    },
                  ],
                },
                {
                  path: '/config/trucking/agent',
                  name: 'Clearing Agent',
                  component: './Masters/ClearingAgent',
                },
                {
                  path: '/config/trucking/company',
                  name: 'Trucking Companies',
                  component: './Masters/TruckingCompany',
                },
              ],
            },

            {
              path: '/user-profile',
              name: 'user-profile',
              component: './UserProfile',
              hideInMenu: true,
            },

            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
