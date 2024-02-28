import React, { useState } from 'react';
import { Button, Table, Input, Divider, Row, Pagination, message, Modal, Form, Select } from 'antd';

import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';

import { connect } from 'umi';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import CheckValidation from '@/components/CheckValidation';
import { ShowOverFlowTags } from '@/components/ShowOverFlowTags';
import UploadCsvModal from '@/components/UploadCsvModal';

const { Search } = Input;

const Ports = ({ dispatch, portsList, loading, updateLoading, addLoading, countriesList }) => {
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [states, setStates] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(null);
  const [form] = Form.useForm();
  const getAllPorts = () => {
    dispatch({
      type: 'ports/getAllPorts',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword,
        },
      },
    });
  };
  useEffect(() => {
    getAllPorts();
  }, [startIndex, viewSize, keyword]);
  const getCountryList = () => {
    dispatch({
      type: 'countries/getAllCountries',
      payload: {
        query: {
          startIndex: 0,
          viewSize: 1000,
        },
      },
    }).then((res) => {
      if (isModalVisible !== 'add') {
        const country = portsList?.records?.find((e) => e?._id === isModalVisible)?.country;
        setStates(res?.records?.find((e) => e?.country === country)?.states);
      }
    });
  };
  useEffect(() => {
    if (isModalVisible) getCountryList();
  }, [isModalVisible]);
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
      title: 'Port Name',
      key: 'portName',
      dataIndex: 'port',
      render: (text) => <p className="font-medium m-0 capitalize">{text}</p>,
    },
    {
      title: 'Country',
      key: 'country',
      dataIndex: 'country',
      render: (text) => <p className="font-medium m-0 capitalize">{text}</p>,
    },
    {
      title: 'State',
      key: 'state',
      dataIndex: 'state',
      render: (text) => <p className="font-medium m-0 capitalize">{text}</p>,
    },
    {
      title: 'Tracking',
      key: 'step',
      dataIndex: 'step',
      render: (_, record) => (
        <ShowOverFlowTags data={record?.step?.map((item) => ({ label: item }))} overflowCount={4} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <div className="m-0 font-medium flex gap-2 items-center">
          <Button
            type="link"
            onClick={() => {
              setIsModalVisible(record?._id);
              form.setFieldsValue(record);
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
        title="Ports"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Ports',
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
            Add Port <ArrowRightOutlined />
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
              type="ports/importPortCSVData"
              modalTitle={'Import Ports'}
              apiMessage="Csv successfully updated"
              refetch={getAllPorts}
            />
          </div>
          <Divider />

          <div>
            <Table
              className="no-shadow zcp-fixed-w-table"
              rowClassName="cursor-pointer"
              pagination={false}
              loading={Boolean(loading)}
              dataSource={portsList?.records}
              scroll={{ x: 1000 }}
              columns={columns}
              locale={{
                emptyText: (
                  <div className="text-center flex justify-center items-center py-10">
                    <div>
                      <p className="text-lg">No port found!</p>
                      <img
                        className=""
                        src={SearchNotFound}
                        alt="No port found!"
                        style={{ height: '100px' }}
                      />
                    </div>
                  </div>
                ),
              }}
              footer={() => (
                <CheckValidation show={portsList?.count > 5}>
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
                      total={portsList?.count}
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
            <p className="font-bold m-0">{isModalVisible === 'add' ? 'Add' : 'Update'} Port</p>
          }
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(null);
          }}
          onOk={() => form.submit()}
          okButtonProps={{ loading: Boolean(updateLoading) || Boolean(addLoading) }}
          okText={isModalVisible === 'add' ? 'Add' : 'Update'}
        >
          <div className="p-4">
            <Form
              layout="vertical"
              form={form}
              onFinish={(values) => {
                if (isModalVisible === 'add') {
                  return dispatch({
                    type: 'ports/createPort',
                    payload: { body: values },
                  })
                    .then((res) => {
                      if (res?._id) {
                        message.success('Port added successfully');
                        setIsModalVisible(null);
                        getAllPorts();
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
                  type: 'ports/updatePort',
                  payload: {
                    body: values,
                    pathParams: {
                      portId: isModalVisible,
                    },
                  },
                })
                  .then((res) => {
                    if (res?._id) {
                      message.success('Port updated successfully');
                      setIsModalVisible(null);
                      getAllPorts();
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
              <Form.Item
                name="port"
                label={<span className="formLabel">Port</span>}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Port can't be blank!",
                  },
                ]}
              >
                <Input
                  size="large"
                  disabled={isModalVisible !== 'add'}
                  autoFocus
                  placeholder="Enter port name"
                />
              </Form.Item>
              <Form.Item
                name="country"
                label={<span className="formLabel">Country</span>}
                rules={[
                  {
                    required: true,
                    message: "Country can't be blank!",
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Select Country"
                  onSelect={(_, props) => {
                    setStates(props?.item?.states);
                    form.setFieldsValue({ state: undefined });
                  }}
                >
                  {countriesList?.records?.map((item) => (
                    <Select.Option key={item?.country} value={item?.country} item={item}>
                      <p className="font-medium capitalize m-0">{item?.country}</p>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="state"
                label={<span className="formLabel">State</span>}
                rules={[
                  {
                    required: true,

                    message: "State can't be blank!",
                  },
                ]}
              >
                <Select size="large" placeholder="Select State">
                  {states?.map((item) => (
                    <Select.Option key={item} value={item}>
                      <p className="font-medium capitalize m-0">{item}</p>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="step"
                label={<span className="formLabel">Tracking</span>}
                rules={[
                  {
                    required: true,
                    message: "Tracking can't be blank!",
                  },
                ]}
              >
                <Select size="large" placeholder="Select tracking" mode="multiple">
                  <Select.Option value="loading">Loading</Select.Option>
                  <Select.Option value="discharge">Discharge</Select.Option>
                  <Select.Option value="finalDestination">Final Destination</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </Page>
    </>
  );
};
export default connect(({ loading, countries, ports }) => ({
  loading: loading?.effects['ports/getAllPorts'],
  updateLoading: loading?.effects['ports/updatePort'],
  addLoading: loading?.effects['ports/createPort'],
  countriesList: countries?.countriesList,
  portsList: ports?.portsList,
}))(Ports);
