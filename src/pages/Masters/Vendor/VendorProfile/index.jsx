import React, { useEffect, useState } from 'react';
import { Row, Col, Skeleton, Form, Tabs } from 'antd';
import { connect, useParams } from 'umi';
import Page from '@/components/Page';
import Breadcrumbs from '@/components/BreadCrumbs';
import VendorDetails from './VendorDetails';
import VendorItems from './Items';

const VendorProfile = ({ dispatch, loading }) => {
  const { vendorId } = useParams();
  const [tabName, setTabName] = useState('items');
  const [form] = Form.useForm();

  const tabs = [
    {
      title: 'Products',
      key: 'items',
      chlidren: <VendorItems />,
    },
  ];
  useEffect(() => {
    if (vendorId) {
      dispatch({
        type: 'vendors/getSingleVendor',
        payload: {
          pathParams: { vendorId },
        },
      }).then((res) => {
        form.setFieldsValue({
          ...res,
          countryCode: res?.phoneNumber?.countryCode,
          phone: res?.phoneNumber?.number,
        });
      });
    }
  }, [vendorId]);

  return (
    <div>
      <Page
        title="Vendor Profile"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'All vendors ',
                path: '/config/vendor/all',
              },
              {
                name: 'Vendor Profile',
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
                <VendorDetails />
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

export default connect(({ loading, vendors }) => ({
  loading: loading?.effects['vendors/getSingleVendor'],
  updateLoading: loading?.effects['vendors/updateVendor'],
  vendorDetails: vendors?.vendorDetails,
}))(VendorProfile);
