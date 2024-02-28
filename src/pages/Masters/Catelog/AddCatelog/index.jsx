/* eslint-disable no-param-reassign */
import Breadcrumbs from '@/components/BreadCrumbs';
import CardSection from '@/components/CardSection';
import Page from '@/components/Page';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect, history, useParams } from 'umi';

const AddBatch = ({ dispatch, masterItemsList, addLoading, updateLoading, vendorList }) => {
  const [form] = Form.useForm();
  const { catelogId } = useParams();
  const [selectedVendor, setSelectedVendor] = useState({});

  console.log('vendor', selectedVendor);

  const getAllMasterItem = () => {
    dispatch({
      type: 'masterItem/getAllMasterItem',
      payload: {
        query: {
          startIndex: 0,
          viewSize: 10000000,
        },
      },
    });
  };
  useEffect(() => {
    getAllMasterItem();
  }, []);
  const getVendorList = () => {
    dispatch({
      type: 'vendors/getAllVendors',
      payload: {
        query: {
          startIndex: 0,
          viewSize: 200000000,
          status: 'active',
        },
      },
    });
  };
  useEffect(() => {
    getVendorList();
  }, []);

  useEffect(() => {
    if (catelogId) {
      dispatch({
        type: 'batches/getSingleBatch',
        payload: {
          pathParams: { catelogId },
        },
      }).then((res) => {
        const batches = res?.batches?.map((item) => ({
          name: item?.name,
          price: item?.startDate ? [moment(item?.startDate), moment(item?.endDate)] : null,
        }));
        console.log('batches', batches, res);
        form.setFieldsValue({
          port: res?.port,
          batches,
        });
      });
    }
  }, [catelogId]);

  return (
    <>
      <div className="container mx-auto ">
        <Page
          title={`${catelogId ? 'Update' : 'Add'} Catelog`}
          breadcrumbs={
            <Breadcrumbs
              path={[
                {
                  name: 'Dashboard',
                  path: '/dashboard',
                },
                {
                  name: 'catelog',
                  path: '/config/catelog',
                },
                {
                  name: `${catelogId ? 'Update' : 'Add'} Catelog`,
                  path: '#',
                },
              ]}
            />
          }
        >
          <Form
            layout="vertical"
            hideRequiredMark
            autoComplete="off"
            colon={false}
            form={form}
            onFinish={(values) => {
              const body = { ...values };
              body.batches = values?.batches?.map((item) => ({
                name: item?.name,
                startDate: item?.eta?.[0]?.toISOString(),
                endDate: item?.eta?.[1]?.toISOString(),
              }));
              if (catelogId) {
                dispatch({
                  type: 'catelog/updateCatelog',
                  payload: {
                    body,
                    pathParams: {
                      catelogId,
                    },
                  },
                })
                  .then((res) => {
                    if (res?._id) {
                      message.success('Catelog updated successfully');
                      history.push('/config/catelog');
                    }
                  })
                  .catch((err) => {
                    if (err) {
                      console.log('err', err);
                      message.error('Error while updating catelog');
                    }
                  });
                return;
              }
              dispatch({
                type: 'catelog/createCatelog',
                payload: {
                  body,
                },
              })
                .then((res) => {
                  if (res?._id) {
                    message.success('Vendor created successfully');
                    history.push('/config/batches');
                  }
                })
                .catch((err) => {
                  if (err) {
                    message.error('Error while creating vendor');
                  }
                });
            }}
          >
            <CardSection
              noPadding
              leftContent={
                <div className="pr-8">
                  <div className="text-blue-900 font-semibold text-xl">Item Details</div>
                  <div className="text-gray-600">
                    {/* <p className="mt-4">Here you add the port details for batches.</p> */}
                  </div>
                </div>
              }
              rightContent={
                <div className="bg-white shadow  rounded">
                  <div className="p-4">
                    <Row gutter={24}>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                          name="itemId"
                          label={<span className="formLabel">Item</span>}
                          rules={[
                            {
                              required: true,
                              message: 'Please select item',
                            },
                          ]}
                        >
                          <Select placeholder="Select item" size="large">
                            {masterItemsList?.records?.map((item) => (
                              <Select.Option key={item?._id} value={item?._d}>
                                {item?.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.List name="vendors" initialValue={[undefined]}>
                      {(fields, { add, remove }) => (
                        <>
                          {fields?.map(({ key, name, ...restFields }, index) => (
                            <div key={key}>
                              <Row gutter={24}>
                                <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                                  <Form.Item
                                    name={[name, 'vendorId']}
                                    {...restFields}
                                    label={<span className="formLabel">Vendor</span>}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please select vendor',
                                      },
                                    ]}
                                  >
                                    <Select
                                      placeholder="Select vendor"
                                      size="large"
                                      onChange={(e) => {
                                        setSelectedVendor({ ...selectedVendor, [index]: e });
                                      }}
                                    >
                                      {vendorList?.records
                                        ?.filter((ite) => {
                                          return (
                                            !Object?.values(selectedVendor || {})?.includes(
                                              ite?._id,
                                            ) || selectedVendor?.[index]?.includes(ite?._id)
                                          );
                                        })
                                        ?.map((item) => (
                                          <Select.Option key={item?._id} value={item?._d}>
                                            {item?.name}
                                          </Select.Option>
                                        ))}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                                  <Form.Item
                                    name={[name, 'price']}
                                    {...restFields}
                                    label={<span className="formLabel">Price</span>}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please enter price',
                                      },
                                    ]}
                                    // valuePropName={'date'}
                                  >
                                    <InputNumber
                                      placeholder="Enter price"
                                      style={{ width: '100%' }}
                                      size="large"
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xl={4} lg={4} md={4} sm={24} xs={24}>
                                  <div className="invisible">.</div>
                                  {index ? (
                                    <span className="text-red-600">
                                      <MinusCircleOutlined onClick={() => remove(name)} />
                                    </span>
                                  ) : null}
                                </Col>
                              </Row>
                            </div>
                          ))}

                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Feild
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </div>
                  <Divider />
                  <div className="p-4 flex justify-end">
                    <Button
                      onClick={() => {
                        form.submit();
                      }}
                      loading={Boolean(addLoading) || Boolean(updateLoading)}
                      type="primary"
                      size="large"
                    >
                      {catelogId ? 'Update' : 'Add'} Catelog
                    </Button>
                  </div>
                </div>
              }
            />
          </Form>
        </Page>
      </div>
    </>
  );
};

export default connect(({ loading, masterItem, vendors }) => ({
  addLoading: loading.effects['batches/createBatch'],
  updateLoading: loading.effects['batches/createBatch'],
  masterItemsList: masterItem?.masterItemsList,
  vendorList: vendors?.vendorsList,
}))(AddBatch);
