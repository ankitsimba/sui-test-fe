/* eslint-disable no-param-reassign */
import Breadcrumbs from '@/components/BreadCrumbs';
import CardSection from '@/components/CardSection';
import Page from '@/components/Page';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, message } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { connect, history, useParams } from 'umi';

const AddBatch = ({ dispatch, portsList, addLoading, updateLoading }) => {
  const [form] = Form.useForm();
  const { batchId } = useParams();
  const getAllPorts = () => {
    dispatch({
      type: 'ports/getAllPorts',
      payload: {
        query: {
          startIndex: 0,
          viewSize: 10000000,
        },
      },
    });
  };
  useEffect(() => {
    getAllPorts();
  }, []);
  useEffect(() => {
    if (batchId) {
      dispatch({
        type: 'batches/getSingleBatch',
        payload: {
          pathParams: { batchId },
        },
      }).then((res) => {
        const batches = res?.batches?.map((item) => ({
          name: item?.name,
          eta: item?.startDate ? [moment(item?.startDate), moment(item?.endDate)] : null,
        }));
        console.log('batches', batches, res);
        form.setFieldsValue({
          port: res?.port,
          batches,
        });
      });
    }
  }, [batchId]);

  return (
    <>
      <div className="container mx-auto ">
        <Page
          title={`${batchId ? 'Update' : 'Add'} Batch`}
          breadcrumbs={
            <Breadcrumbs
              path={[
                {
                  name: 'Dashboard',
                  path: '/dashboard',
                },
                {
                  name: 'batches',
                  path: '/config/batches',
                },
                {
                  name: `${batchId ? 'Update' : 'Add'} Batch`,
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
              if (batchId) {
                dispatch({
                  type: 'batches/updateBatch',
                  payload: {
                    body,
                    pathParams: {
                      batchId,
                    },
                  },
                })
                  .then((res) => {
                    if (res?._id) {
                      message.success('Vendor updated successfully');
                      history.push('/config/batches');
                    }
                  })
                  .catch((err) => {
                    if (err) {
                      console.log('err', err);
                      message.error('Error while updating vendor');
                    }
                  });
                return;
              }
              dispatch({
                type: 'batches/createBatch',
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
                  <div className="text-blue-900 font-semibold text-xl">Port Details</div>
                  <div className="text-gray-600">
                    <p className="mt-4">Here you add the port details for batches.</p>
                  </div>
                </div>
              }
              rightContent={
                <div className="bg-white shadow  rounded">
                  <div className="p-4">
                    <Row gutter={24}>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                          name="port"
                          label={<span className="formLabel">Port</span>}
                          rules={[
                            {
                              required: true,
                              message: 'Please select port',
                            },
                          ]}
                        >
                          <Select placeholder="Select port" size="large">
                            {portsList?.records?.map((item) => (
                              <Select.Option key={item?._id} value={item?._d}>
                                {item?.port}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.List name="batches" initialValue={[undefined]}>
                      {(fields, { add, remove }) => (
                        <>
                          {fields?.map(({ key, name, ...restFields }, index) => (
                            <div key={key}>
                              <Row gutter={24}>
                                <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                                  <Form.Item
                                    name={[name, 'name']}
                                    {...restFields}
                                    label={<span className="formLabel">Batch name</span>}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please enter batch name',
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Enter name" size="large" />
                                  </Form.Item>
                                </Col>
                                <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                                  <Form.Item
                                    name={[name, 'eta']}
                                    {...restFields}
                                    label={<span className="formLabel">ETA Date</span>}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please select eta date',
                                      },
                                    ]}
                                    // valuePropName={'date'}
                                  >
                                    <DatePicker.RangePicker format={'DD-MM-YYYY'} size="large" />
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
                              Add Batch
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
                      {batchId ? 'Update' : 'Add'} Batch
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

export default connect(({ loading, ports }) => ({
  addLoading: loading.effects['batches/createBatch'],
  updateLoading: loading.effects['batches/createBatch'],
  portsList: ports?.portsList,
}))(AddBatch);
