import { Col, Row } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import vendorIcon from '@/assets/icons/visitors.png';
import staffIcon from '@/assets/icons/staff.png';
import universityIcon from '@/assets/icons/university.png';
import products from '@/assets/icons/products.png';
import truckCompany from '@/assets/icons/truckCompany.png';
import shipping from '@/assets/icons/shipping.png';
import { useEffect } from 'react';
import Page from '@/components/Page';

const DashBoard = ({ dashboardStats, dispatch }) => {
  const cards = [
    {
      name: 'Products',
      key: 'products ',
      icon: products,
      value: dashboardStats?.products,
      route: '/product',
      color: { 1: '#15803d', 2: '#86efac' },
    },
    {
      name: 'Vendors',
      key: 'vendors',

      icon: vendorIcon,
      value: dashboardStats?.vendors,
      route: '/config/vendor/all',
      color: { 2: '#93c5fd', 1: '#1d4ed8' },
    },
    {
      name: 'Ports',
      key: 'ports',
      icon: universityIcon,
      value: dashboardStats?.ports,
      route: '/config/port',
      color: { 2: '#c4b5fd', 1: '#6d28d9' },
    },
    {
      name: 'Trucking Company',
      key: 'truckingCompany',
      icon: truckCompany,
      value: dashboardStats?.truckingCompany,
      route: '/config/trucking/company',
      color: { 2: '#ffcc00', 1: '#ff6699' },
    },
    {
      name: 'Clearing Agents',
      key: 'clearingAgents',
      icon: staffIcon,
      value: dashboardStats?.clearingAgents,
      route: '/config/trucking/agent',
      color: { 1: '#2c3e50', 2: '#3498db' },
    },
    {
      name: 'Shipping Lines',
      key: 'shippingLines',
      icon: shipping,
      value: dashboardStats?.shippingLines,
      route: '/config/shipping',
      color: { 2: '#ff6347', 1: '#3498db' },
    },
  ];
  useEffect(() => {
    dispatch({
      type: 'dashboard/getDashboardStats',
    });
  }, []);
  return (
    <Page title="Dashboard" PrevNextNeeded="N">
      <Row gutter={[24, 24]} className="">
        {cards?.map((card) => (
          <Col xl={8} lg={8} md={12} sm={24} xs={24} key={card?.key}>
            <button
              onClick={() => {
                history.push(card.route);
              }}
              className="border-0  w-full cursor-pointer"
            >
              <div className="shadow-xl rounded-lg bg-white py-4  px-4 flex items-center justify-between ">
                <div className="text-left">
                  <div className="text-lg text-gray-900 ">{card.name}</div>
                  <div className="text-3xl font-bold text-gray-900">{card?.value || 0}</div>
                </div>
                <div
                  className="p-4 rounded-md"
                  style={{
                    background: `linear-gradient(10deg,${card?.color?.[1]}  0%,${card?.color?.[2]} 100%)`,
                  }}
                >
                  <img
                    src={card.icon}
                    style={{ filter: `invert(1)` }}
                    alt="icon"
                    className="h-16 w-16 contain "
                  />
                </div>
              </div>
            </button>
          </Col>
        ))}
      </Row>
    </Page>
  );
};

export default connect(({ user, dashboard }) => ({
  user: user?.currentUser,
  dashboardStats: dashboard?.dashboardStats,
}))(DashBoard);
