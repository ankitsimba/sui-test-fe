import React, { useEffect, useState } from 'react';
import { Row, Col, Skeleton, Tabs } from 'antd';
import { connect, useParams } from 'umi';
import Page from '@/components/Page';

// import VendorItems from './Items';
import ItemDetails from './ItemDetails';
import Breadcrumbs from '@/components/BreadCrumbs';
import VendorList from './VendorList';
import PortWiseInventory from './PortWise';

const ItemProfile = ({ dispatch, loading }) => {
  const { itemId } = useParams();
  const [tabName, setTabName] = useState('vendors');

  const tabs = [
    {
      title: 'Vendors',
      key: 'vendors',
      chlidren: <VendorList />,
    },
    {
      title: 'Port-Wise',
      key: 'portwise',
      chlidren: <PortWiseInventory />,
    },
  ];
  useEffect(() => {
    if (itemId) {
      dispatch({
        type: 'masterItem/getSingleMasterItem',
        payload: {
          pathParams: { itemId },
        },
      });
    }
  }, [itemId]);

  return (
    <div>
      <Page
        title="Inventory"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'All Inventory ',
                path: '/inventory',
              },
              {
                name: 'Inventory',
                path: '#',
              },
            ]}
          />
        }
      >
        <Row gutter={24}>
          <Col xl={9} lg={9} md={12} sm={18} xs={24}>
            <div>
              {!loading ? (
                <ItemDetails />
              ) : (
                <div className="bg-white shadow rounded mb-4  p-8">
                  <Skeleton avatar paragraph={{ rows: 7 }} />
                </div>
              )}
            </div>
          </Col>
          <Col xl={15} lg={15} md={12} sm={18} xs={24}>
            <div className="bg-white">
              <Tabs
                activeKey={tabName}
                onTabClick={(key) => {
                  setTabName(key);
                }}
              >
                {tabs?.map((tab) => (
                  <Tabs.TabPane tab={<span className="px-4">{tab?.title}</span>} key={tab?.key}>
                    {tab?.key === tabName && tab?.chlidren}
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </div>
          </Col>
        </Row>
      </Page>
    </div>
  );
};

export default connect(() => ({}))(ItemProfile);
