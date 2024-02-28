import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Row,
  Select,
  Table,
  Tooltip,
  message,
} from 'antd';
import { connect, useParams, history } from 'umi';
import React, { useEffect, useState } from 'react';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import CheckValidation from '@/components/CheckValidation';

import { debounce } from 'lodash';
import { EditOutlined } from '@ant-design/icons';

const VendorItems = ({
  loading,
  vendorItemsList,
  updateLoading,
  addLoading,
  dispatch,
  productList,
}) => {
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { vendorId } = useParams();
  function handleChangePagination(current, size) {
    setStartIndex(size * (current - 1));
    setCurrentPage(current);
  }
  const getAllProducts = () => {
    dispatch({
      type: 'products/getAllProducts',
      payload: {
        query: {
          startIndex: 0,
          viewSize: 10000000000,
        },
      },
    });
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllCatelog = () => {
    dispatch({
      type: 'catelog/getAllCatelog',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword,
          vendorId,
        },
      },
    });
  };
  useEffect(() => {
    getAllCatelog();
  }, [startIndex, viewSize, keyword]);
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
      title: 'Product name',
      key: 'item',
      dataIndex: 'name',
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium w-72">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Code',
      key: 'item',
      dataIndex: 'code',
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium w-72">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Estimated Cost Price',
      key: 'price',
      dataIndex: 'price',
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium w-72">{text}</p>
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
              form.setFieldsValue({ ...record, itemId: record?.code });
            }}
          >
            <EditOutlined />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="px-5 py-4 flex gap-2 items-center">
        <Input.Search
          size="large"
          placeholder="Enter keyword here to search..."
          enterButton
          onChange={(e) => {
            onSearchChange(e.target.value);
          }}
        />
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setIsModalVisible('add');
            form.resetFields();
          }}
        >
          Add Item Price
        </Button>
      </div>
      <Divider />
      <div>
        <Table
          className="no-shadow zcp-fixed-w-table"
          rowClassName="cursor-pointer"
          pagination={false}
          loading={Boolean(loading)}
          dataSource={vendorItemsList?.records}
          scroll={{ x: 700 }}
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
                  <p className="text-lg">No items found!</p>
                  <img
                    className=""
                    src={SearchNotFound}
                    alt="No items found!"
                    style={{ height: '100px' }}
                  />
                </div>
              </div>
            ),
          }}
          footer={() => (
            <CheckValidation show={vendorItemsList?.count > 5}>
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
                  total={vendorItemsList?.count}
                  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                  onChange={handleChangePagination}
                />
              </Row>
            </CheckValidation>
          )}
        />
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
      >
        <div className="p-4">
          <Form
            layout="vertical"
            form={form}
            onFinish={(values) => {
              if (isModalVisible === 'add') {
                return dispatch({
                  type: 'catelog/createCatelog',
                  payload: { body: { ...values, vendorId } },
                })
                  .then((res) => {
                    if (res?._id) {
                      message.success('Item price added successfully');
                      setIsModalVisible(null);
                      getAllCatelog();
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
                type: 'catelog/updateCatelog',
                payload: {
                  body: values,
                  pathParams: {
                    catelogId: isModalVisible,
                  },
                },
              })
                .then((res) => {
                  if (res?._id) {
                    message.success('Shipping updated successfully');
                    setIsModalVisible(null);
                    getAllCatelog();
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
              name="itemId"
              label={<span className="formLabel">Product Code</span>}
              rules={[
                {
                  required: true,
                  message: 'Please select item',
                },
              ]}
            >
              <Select
                showSearch
                filterOption={(input, option) => {
                  return `${option.item.code} ${option.item.name}`
                    .toLowerCase()
                    ?.includes(input?.toLowerCase());
                }}
                disabled={isModalVisible !== 'add'}
                placeholder="Select item"
                size="large"
              >
                {productList?.records?.map((item) => (
                  <Select.Option key={item?._id} value={item?.code} item={item}>
                    <div className="border-b w-full px-2 pb-1" item={item}>
                      <div className="flex justify-between ">
                        <div className="">
                          <span className="text-green-900 font-medium capitalize">
                            {item?.name}
                          </span>
                        </div>
                      </div>
                      <span className="font-medium text-blue-800">{`${item?.code}`}</span>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={'price'}
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
                min={1}
                style={{ width: '100%' }}
                size="large"
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default connect(({ loading, catelog, products }) => ({
  productList: products?.productList,
  updateLoading: loading?.effects['shipping/updateShippingLine'],
  addLoading: loading?.effects['shipping/createShippingLine'],
  loading: loading?.effects['shipping/getAllShippingLine'],
  vendorItemsList: catelog?.vendorItemsList,
}))(VendorItems);
