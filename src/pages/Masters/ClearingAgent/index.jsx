import React, { useState } from 'react';
import {
  Button,
  Table,
  Input,
  Divider,
  Row,
  Pagination,
  message,
  Modal,
  Form,
  Tooltip,
  Col,
  InputNumber,
  Select,
  Avatar,
} from 'antd';

import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';

import { connect } from 'umi';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import CheckValidation from '@/components/CheckValidation';
import Address from '@/components/Address';
import PhoneNumber from '@/components/PhoneNumber';
import UploadCsvModal from '@/components/UploadCsvModal';
import { getInitials } from '@/utils/common';

const { Search } = Input;

const ClearingAgent = ({
  dispatch,
  clearingAgentList,
  loading,
  updateLoading,
  addLoading,
  portsList,
}) => {
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const getAllClearingAgent = () => {
    dispatch({
      type: 'clearingAgent/getAllClearingAgent',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword,
        },
      },
    });
  };
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
    getAllClearingAgent();
  }, [startIndex, viewSize, keyword]);
  function handleChangePagination(current, size) {
    setStartIndex(size * (current - 1));
    setCurrentPage(current);
  }
  const action = (value) => {
    setCurrentPage(1);
    setKeyword(value);
    setStartIndex(0);
  };
  const onSearchChange = debounce(action, 600);
  const columns = [
    {
      title: 'Sr. No.',
      width: 100,
      align: 'center',
      render: (_, __, index) => index + 1 + viewSize * (currentPage - 1),
    },

    {
      title: 'Name',
      key: 'agentName',
      width: 250,
      dataIndex: 'agentName',
      render: (_, record) => (
        <div className="flex items-start justify-start w-full">
          <>
            <div className="w-8 mt-1">
              <Avatar
                className="bg-orange-900 w-8 uppercase"
                style={{ backgroundColor: '#005be7' }}
              >
                {(record?.agentName && getInitials(record?.agentName)) || 'n/a'}
              </Avatar>
            </div>
            <div className="ml-2">
              <div className="font-bold  capitalize " title={record?.agentName}>
                {record?.agentName}
              </div>
              <div className="w-full">
                <span className="text-gray-700 font-medium">{record?.email}</span>
              </div>{' '}
              <Tooltip title={`${record?.phoneNumber?.countryCode} ${record?.phoneNumber?.number}`}>
                <p className="m-0 text-gray-700 font-medium capitalize w-40 truncate">
                  {record?.phoneNumber?.countryCode} {record?.phoneNumber?.number}
                </p>
              </Tooltip>
            </div>
          </>
        </div>
      ),
    },

    {
      title: 'Address',
      key: 'address',
      dataIndex: 'address',
      render: (text) => {
        const addressString = `${text?.address1 || ''},${text?.city || ''}
                      , ${text?.state || ''}, ${text?.country || ''},  ${text?.pinCode || ''}`;
        return (
          <Tooltip title={addressString}>
            <p className="m-0 font-medium capitalize w-40 truncate">{addressString}</p>
          </Tooltip>
        );
      },
    },

    {
      title: 'Port',
      key: 'port',
      dataIndex: 'portDetails',
      width: 150,
      render: (text) => (
        <Tooltip title={text?.port}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text?.port}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Due Days',
      key: 'dueDays',
      dataIndex: 'dueDays',
      align: 'center',
      width: 100,
      render: (text) => <p className="m-0 font-medium ">{text}</p>,
    },
    {
      title: 'Amount',
      key: 'amount',
      align: 'center',
      dataIndex: 'amount',
      width: 100,
      render: (text) => <p className="m-0 font-medium ">{text}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 150,
      render: (_, record) => (
        <div className="m-0 font-medium flex gap-2 items-center justify-center">
          <Button
            type="link"
            onClick={() => {
              setIsModalVisible(record?._id);
              form.setFieldsValue({
                ...record,
                countryCode: record?.phoneNumber?.countryCode,
                phone: record?.phoneNumber?.number,
              });
            }}
          >
            <EditOutlined />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <>
      <Page
        title="Clearing Agents"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Clearing Agents',
                path: '#',
              },
            ]}
          />
        }
        primaryAction={
          <Button
            type="primary"
            onClick={() => {
              setIsModalVisible('add');
              form.resetFields();
            }}
            style={{ display: 'flex', alignItems: 'center' }}
            id="open"
          >
            Add agent <ArrowRightOutlined />
          </Button>
        }
      >
        <div className="bg-white ">
          <div className="px-5 py-4 flex gap-2">
            <Search
              size="large"
              placeholder="Enter keyword here to search..."
              enterButton
              onChange={(e) => {
                onSearchChange(e.target.value);
              }}
            />
            <UploadCsvModal
              type="clearingAgent/importAgentCSVData"
              modalTitle={'Import Agents'}
              apiMessage="Csv successfully updated"
              refetch={getAllClearingAgent}
            />
          </div>
          <Divider />

          <div>
            <Table
              className="no-shadow zcp-fixed-w-table"
              rowClassName="cursor-pointer"
              pagination={false}
              loading={Boolean(loading)}
              dataSource={clearingAgentList?.records}
              scroll={{ x: 1000 }}
              columns={columns}
              locale={{
                emptyText: (
                  <div className="text-center flex justify-center items-center py-10">
                    <div>
                      <p className="text-lg">No agent found!</p>
                      <img
                        className=""
                        src={SearchNotFound}
                        alt="No agent found!"
                        style={{ height: '100px' }}
                      />
                    </div>
                  </div>
                ),
              }}
              footer={() => (
                <CheckValidation show={clearingAgentList?.count > 5}>
                  <Row className="mt-2" type="flex" justify="end">
                    <Pagination
                      key={`page-${currentPage}`}
                      showSizeChanger
                      pageSizeOptions={['10', '25', '50', '100']}
                      onShowSizeChange={(e, p) => {
                        setViewSize(p);
                        setCurrentPage(1);
                        setStartIndex(0);
                      }}
                      defaultCurrent={1}
                      current={currentPage}
                      pageSize={viewSize}
                      total={clearingAgentList?.count}
                      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                      onChange={handleChangePagination}
                    />
                  </Row>
                </CheckValidation>
              )}
            />
          </div>
        </div>
        <Modal
          title={
            <p className="font-bold m-0">{isModalVisible === 'add' ? 'Add' : 'Update'} agent</p>
          }
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(null);
          }}
          style={{ top: 20 }}
          width={700}
          onOk={() => form.submit()}
          okButtonProps={{ loading: Boolean(updateLoading) || Boolean(addLoading) }}
          okText={isModalVisible === 'add' ? 'Add' : 'Update'}
        >
          <div className="p-4">
            <Form
              layout="vertical"
              form={form}
              onFinish={(values) => {
                const body = { ...values };
                delete body.phone;
                delete body.countryCode;
                body.phoneNumber = {
                  countryCode: values?.countryCode,
                  number: values?.phone,
                };
                if (isModalVisible === 'add') {
                  return dispatch({
                    type: 'clearingAgent/createClearingAgent',
                    payload: { body },
                  })
                    .then((res) => {
                      if (res?._id) {
                        message.success('Agent added successfully');
                        setIsModalVisible(null);
                        getAllClearingAgent();
                        form.resetFields();
                      }
                    })
                    .catch((err) => {
                      if (err) {
                        console.log('err', err);
                        message.error(err?.data?.message);
                      }
                    });
                }
                return dispatch({
                  type: 'clearingAgent/updateClearingAgent',
                  payload: {
                    body,
                    pathParams: {
                      agentId: isModalVisible,
                    },
                  },
                })
                  .then((res) => {
                    if (res?._id) {
                      message.success('Agent updated successfully');
                      setIsModalVisible(null);
                      getAllClearingAgent();
                      form.resetFields();
                    }
                  })
                  .catch((err) => {
                    if (err) {
                      console.log('err', err);
                      message.error(err?.data?.message);
                    }
                  });
              }}
            >
              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    name="agentName"
                    label={<span className="formLabel">Agent Name</span>}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Agent name can't be blank!",
                      },
                      {
                        pattern: /^[a-zA-Z ]*$/,
                        message: 'Accept only alphabetic characters only',
                      },
                    ]}
                  >
                    <Input size="large" autoFocus placeholder="Enter agent name" />
                  </Form.Item>
                </Col>

                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    label={<span className="formLabel">Email</span>}
                    name="email"
                    initialValue=""
                    rules={[
                      {
                        message: 'Please enter a valid email address!',
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      type="email"
                      name="staff-email"
                      id="staff-email"
                      placeholder="Enter staff email address"
                      // onChange={() => {
                      //   form
                      //     .validateFields(['email'])
                      //     .then(({ email }) => {
                      //       checkUniqueness({
                      //         pathParams: { email: email.toLowerCase() },
                      //       }).then(({ isUnique }) => {
                      //         if (!isUnique) {
                      //           form.setFields([
                      //             {
                      //               name: 'email',
                      //               errors: ['This email already exist'],
                      //             },
                      //           ]);
                      //         }
                      //       });
                      //     })
                      //     .catch(() => {});
                      // }}
                    />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label={<span className="formLabel">Phone Number</span>}>
                    <PhoneNumber countryCode="countryCode" form={form} name="phone" />
                  </Form.Item>
                </Col>
              </Row>
              <Address form={form} />
              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Form.Item name="port" label={<span className="formLabel">Port</span>}>
                    <Select placeholder="Select port" size="large">
                      {portsList?.records?.map((item) => (
                        <Select.Option key={item?._id} value={item?.port}>
                          {item?.port}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item name="dueDays" label={<span className="formLabel"> Due days</span>}>
                    <InputNumber
                      size="large"
                      min={1}
                      style={{ width: '100%' }}
                      placeholder="Enter due days"
                    />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item name="amount" label={<span className="formLabel">Amount</span>}>
                    <InputNumber
                      size="large"
                      min={0}
                      style={{ width: '100%' }}
                      placeholder="Enter amount"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
      </Page>
    </>
  );
};
export default connect(({ loading, clearingAgent, ports }) => ({
  updateLoading: loading?.effects['clearingAgent/updateClearingAgent'],
  addLoading: loading?.effects['clearingAgent/createClearingAgent'],
  loading: loading?.effects['clearingAgent/getAllClearingAgent'],
  clearingAgentList: clearingAgent?.clearingAgentList,
  portsList: ports?.portsList,
}))(ClearingAgent);
