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
  Tooltip,
} from 'antd';

import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';

import { connect } from 'umi';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import CheckValidation from '@/components/CheckValidation';

const { Search } = Input;

const Products = ({ dispatch, productList, updateLoading, loading, addLoading }) => {
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const getAllProducts = () => {
    dispatch({
      type: 'products/getAllProducts',
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
    getAllProducts();
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
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
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
        title="Products"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Products',
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
            Add Product <ArrowRightOutlined />
          </Button>
        }
      >
        <div className="bg-white ">
          <div className="px-5 py-4">
            <Search
              size="large"
              placeholder="Enter keyword here to search..."
              enterButton
              onChange={(e) => {
                onSearchChange(e.target.value);
              }}
            />
          </div>
          <Divider />

          <div>
            <Table
              className="no-shadow zcp-fixed-w-table"
              rowClassName="cursor-pointer"
              pagination={false}
              loading={Boolean(loading)}
              dataSource={productList?.records}
              scroll={{ x: 900 }}
              columns={columns}
              // onRow={(record) => {
              //   return {
              //     onClick: (e) => {
              //       history.push(`/inventory/${record?.code}/profile`);
              //       e.stopPropagation();
              //     },
              //   };
              // }}
              locale={{
                emptyText: (
                  <div className="text-center flex justify-center items-center py-10">
                    <div>
                      <p className="text-lg">No product found!</p>
                      <img
                        className=""
                        src={SearchNotFound}
                        alt="No product found!"
                        style={{ height: '100px' }}
                      />
                    </div>
                  </div>
                ),
              }}
              footer={() => (
                <CheckValidation show={productList?.count > 5}>
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
                      total={productList?.count}
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
            <p className="font-bold m-0">{isModalVisible === 'add' ? 'Add' : 'Update'} Product</p>
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
                    type: 'products/createProduct',
                    payload: { body: values },
                  })
                    .then((res) => {
                      if (res?._id) {
                        message.success('Product added successfully');
                        setIsModalVisible(null);
                        getAllProducts();
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
                  type: 'products/updateProduct',
                  payload: {
                    body: values,
                    pathParams: {
                      productId: isModalVisible,
                    },
                  },
                })
                  .then((res) => {
                    if (res?._id) {
                      message.success('Product updated successfully');
                      setIsModalVisible(null);
                      getAllProducts();
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
                    name="code"
                    label={<span className="formLabel">Product Code</span>}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Code can't be blank!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      disabled={isModalVisible !== 'add'}
                      autoFocus
                      placeholder="Enter item code"
                    />
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
                    <Input size="large" placeholder="Enter item name" />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item name="hsncode" label={<span className="formLabel">HSNcode</span>}>
                    <Input size="large" placeholder="Enter hsn code" />
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
export default connect(({ products, loading }) => ({
  productList: products?.productList,
  loading: loading?.effects['products/getAllProducts'],
  updateLoading: loading?.effects['products/updateProduct'],
  addLoading: loading?.effects['products/createProduct'],
}))(Products);
