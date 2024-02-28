/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { Col, Form, Input, InputNumber, Row } from 'antd';

import React from 'react';
import { connect } from 'umi';

const Address = () => {
  return (
    <div>
      <div>
        <div className="font-medium">
          <Row gutter={[12, 0]}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name={['address', 'address1']}
                label={<span className="formLabel">Address</span>}
              >
                <Input size="large" type="text" placeholder="Street/house no." />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={['address', 'city']} label={<span className="formLabel">City</span>}>
                <Input size="large" type="text" placeholder="Enter city name" />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                name={['address', 'pinCode']}
                label={<span className="formLabel">Pin code</span>}
              >
                <InputNumber size="large" style={{ width: '100%' }} placeholder="Pin code" />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                name={['address', 'country']}
                label={<span className="formLabel">Country</span>}
              >
                <Input placeholder="Enter country" size="large" />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                name={['address', 'state']}
                label={<span className="formLabel">State</span>}
              >
                <Input placeholder="Enter your state" size="large" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default connect(({ common }) => ({
  countries: common.countriesList,
}))(Address);
