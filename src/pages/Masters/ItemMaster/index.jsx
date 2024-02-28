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
  Col,
  InputNumber,
  Select,
  Tooltip,
} from 'antd';

import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { ArrowRightOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';

import { connect, history } from 'umi';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import CheckValidation from '@/components/CheckValidation';
import SyncModal from './SyncModal';
import QuantityToolTip from '@/components/QuantityToolTip';

const { Search } = Input;
export const units = ['Pcs', 'SQFT', 'CRATE', 'Bags', 'LFT', 'SET', 'LBS'];

const ItemMaster = ({
  dispatch,
  masterItemsList,
  updateLoading,
  loading,
  addLoading,
  productList,
  uploadCSVLoading,
}) => {
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [syncModal, setSyncModal] = useState(false);

  const [form] = Form.useForm();
  const getAllProducts = () => {
    dispatch({
      type: 'products/getAllProducts',
      payload: {
        query: {
          startIndex: 0,
          viewSize: 1000000000,
        },
      },
    });
  };
  useEffect(() => {
    if (isModalVisible) getAllProducts();
  }, [isModalVisible]);
  const getAllInventory = () => {
    dispatch({
      type: 'masterItem/getAllInventory',
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
    getAllInventory();
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
      key: 'name',
      dataIndex: 'name',
      width: 230,
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Full Name',
      key: 'fullName',
      dataIndex: 'fullName',
      width: 230,
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Code',
      key: 'code',
      dataIndex: 'itemCode',
      width: 150,
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'HSN Code',
      key: 'hsncode',
      dataIndex: 'hsncode',
      width: 150,
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Color',
      key: 'color',
      dataIndex: 'color',
      width: 70,
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Size',
      key: 'size',
      dataIndex: 'size',
      width: 70,
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Pcs',
      key: 'pcs',
      dataIndex: 'pcs',
      width: 70,
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Total back orders',
      key: 'totalQuantityToPromise',
      dataIndex: 'totalQuantityToPromise',
      width: 100,
      render: (text) => (
        <QuantityToolTip count={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </QuantityToolTip>
      ),
    },
    {
      title: 'Total quantity in hand',
      key: 'totalQuantityAvailable',
      dataIndex: 'totalQuantityAvailable',
      width: 100,
      render: (text) => (
        <QuantityToolTip count={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </QuantityToolTip>
      ),
    },
    {
      title: 'Total Quantity on Sea',
      key: 'totalQuantityInTransit',
      dataIndex: 'totalQuantityInTransit',
      width: 100,
      render: (text) => (
        <QuantityToolTip count={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </QuantityToolTip>
      ),
    },
    {
      title: 'Scale',
      key: 'scale',
      dataIndex: 'scale',
      width: 70,
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Level',
      key: 'level',
      dataIndex: 'level',
      width: 70,
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Weight',
      key: 'weight',
      dataIndex: 'weight',
      width: 70,
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Region',
      key: 'region',
      dataIndex: 'region',
      width: 70,
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </Tooltip>
      ),
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
            onClick={(e) => {
              e.stopPropagation();
              setIsModalVisible(record?._id);
              form.resetFields();
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
        title="Inventory"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Inventory',
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
            Add Inventory <ArrowRightOutlined />
          </Button>
        }
      >
        <div className="bg-white ">
          <div className="px-5 py-4 flex items-center gap-2">
            <Search
              size="large"
              placeholder="Enter keyword here to search..."
              enterButton
              onChange={(e) => {
                onSearchChange(e.target.value);
              }}
            />

            <div className="">
              <Button
                size="large"
                type="primary"
                loading={Boolean(uploadCSVLoading)}
                className="w-full"
                onClick={() => {
                  setSyncModal(true);
                }}
              >
                Sync Inventory <UploadOutlined />
              </Button>
            </div>
          </div>
          <Divider />

          <div>
            <Table
              className="no-shadow zcp-fixed-w-table"
              rowClassName="cursor-pointer"
              pagination={false}
              loading={Boolean(loading)}
              scroll={{ x: 900 }}
              dataSource={masterItemsList?.records}
              columns={columns}
              onRow={(record) => {
                return {
                  onClick: (e) => {
                    history.push(`/inventory/${record?.code}/profile`);
                    e.stopPropagation();
                  },
                };
              }}
              locale={{
                emptyText: (
                  <div className="text-center flex justify-center items-center py-10">
                    <div>
                      <p className="text-lg">No inventory found!</p>
                      <img
                        className=""
                        src={SearchNotFound}
                        alt="No inventory found!"
                        style={{ height: '100px' }}
                      />
                    </div>
                  </div>
                ),
              }}
              footer={() => (
                <CheckValidation show={masterItemsList?.count > 5}>
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
                      total={masterItemsList?.count}
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
            <p className="font-bold m-0">{isModalVisible === 'add' ? 'Add' : 'Update'} Inventory</p>
          }
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(null);
          }}
          onOk={() => form.submit()}
          okButtonProps={{ loading: Boolean(updateLoading) || Boolean(addLoading) }}
          okText={isModalVisible === 'add' ? 'Add' : 'Update'}
          style={{ top: 15 }}
        >
          <div className="p-4">
            <Form
              form={form}
              layout="vertical"
              onFinish={(values) => {
                if (isModalVisible === 'add') {
                  return dispatch({
                    type: 'masterItem/createMasterItem',
                    payload: { body: values },
                  })
                    .then((res) => {
                      if (res?._id) {
                        message.success('Item added successfully');
                        setIsModalVisible(null);
                        getAllInventory();
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
                  type: 'masterItem/updateMasterItem',
                  payload: {
                    body: values,
                    pathParams: {
                      itemId: isModalVisible,
                    },
                  },
                })
                  .then((res) => {
                    if (res?._id) {
                      message.success('Item updated successfully');
                      setIsModalVisible(null);
                      getAllInventory();
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
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    name="itemCode"
                    label={<span className="formLabel">Item Code</span>}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Code can't be blank!",
                      },
                    ]}
                  >
                    <Select
                      disabled={isModalVisible !== 'add'}
                      placeholder="Select item"
                      size="large"
                      filterOption="value"
                      showSearch
                      onSelect={(_, props) => {
                        form.setFieldsValue({
                          ...props?.item,
                        });
                      }}
                    >
                      {productList?.records?.map((item) => (
                        <Select.Option key={item?._id} value={item?.code} item={item}>
                          {item?.code}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    name="name"
                    label={<span className="formLabel">Name</span>}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Name can't be blank!",
                      },
                    ]}
                  >
                    <Input disabled size="large" placeholder="Enter item name" />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item name="hsncode" label={<span className="formLabel">HSNcode</span>}>
                    <Input disabled size="large" placeholder="Enter hsn code" />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    name="color"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter color!',
                      },
                    ]}
                    label={<span className="formLabel">Color</span>}
                  >
                    <Input size="large" placeholder="Enter color" />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    name="size"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter size!',
                      },
                    ]}
                    label={<span className="formLabel">Size</span>}
                  >
                    <Input size="large" placeholder="Enter size" />
                  </Form.Item>
                </Col>
                {/* <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item name="pcs" label={<span className="formLabel">Pcs</span>}>
                    <InputNumber
                      size="large"
                      style={{ width: '100%' }}
                      min={1}
                      placeholder="Enter pcs"
                    />
                  </Form.Item>
                </Col> */}

                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    name="scale"
                    label={<span className="formLabel">Measuring Scale</span>}
                    rules={[
                      {
                        required: true,
                        message: 'Please select scale!',
                      },
                    ]}
                  >
                    <Select placeholder="Select scale" size="large">
                      {units?.map((ele) => (
                        <Select.Option value={ele}>{ele}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item name="level" label={<span className="formLabel">Level</span>}>
                    <InputNumber size="large" style={{ width: '100%' }} placeholder="Enter level" />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    name="weight"
                    label={<span className="formLabel">Weight (Per crate)</span>}
                  >
                    <InputNumber
                      size="large"
                      style={{ width: '100%' }}
                      placeholder="Enter weight"
                    />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item name="region" label={<span className="formLabel">Region</span>}>
                    <Select placeholder="Select region" size="large">
                      <Select.Option value={'North'}>North</Select.Option>
                      <Select.Option value={'East'}>East</Select.Option>
                      <Select.Option value={'West'}>West</Select.Option>
                      <Select.Option value={'South'}>South</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    name="fullName"
                    label={<span className="formLabel">Full Item Name</span>}
                  >
                    <Input size="large" placeholder="Enter item full name" />
                  </Form.Item>
                </Col>

                {/*  */}
              </Row>
            </Form>
          </div>
        </Modal>
        <SyncModal
          getAllMasterItem={getAllInventory}
          syncModal={syncModal}
          setSyncModal={setSyncModal}
        />
      </Page>
    </>
  );
};
export default connect(({ masterItem, products, loading }) => ({
  masterItemsList: masterItem?.inventoryList,
  productList: products?.productList,
  loading: loading?.effects['masterItem/getAllInventory'],
  updateLoading: loading?.effects['masterItem/updateMasterItem'],
  addLoading: loading?.effects['masterItem/createMasterItem'],
  uploadCSVLoading: loading?.effects['masterItem/uploadCSV'],
}))(ItemMaster);
