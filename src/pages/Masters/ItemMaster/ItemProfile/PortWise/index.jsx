import CheckValidation from '@/components/CheckValidation';
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
import React, { useEffect, useState } from 'react';
import { useParams, connect } from 'umi';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { debounce } from 'lodash';
import QuantityToolTip from '@/components/QuantityToolTip';
import QuantityConvert from '@/components/QuantityConvert';

const PortWiseInventory = ({
  dispatch,
  portInventoryList,
  loading,
  portsList,
  updatePortLoading,
  addPortLoading,
}) => {
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(null);
  const [port, setPort] = useState(null);
  const { itemId } = useParams();
  const [form] = Form.useForm();
  function handleChangePagination(current, size) {
    setStartIndex(size * (current - 1));
    setCurrentPage(current);
  }
  const getAllPorts = () => {
    dispatch({
      type: 'ports/getAllPorts',
      payload: {
        query: {
          startIndex: 0,
          viewSize: 1000000000,
        },
      },
    }).then((res) => {
      setPort(res?.records?.[0]?.port);
    });
  };
  useEffect(() => {
    getAllPorts();
  }, []);
  const getAllPortInventory = () => {
    dispatch({
      type: 'portInventory/getAllPortInventory',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword,
          itemId,
          port,
        },
      },
    });
  };
  useEffect(() => {
    if (port) {
      getAllPortInventory();
    }
  }, [startIndex, viewSize, keyword, port]);
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
      title: 'Port',
      key: 'name',
      dataIndex: 'portDetails',
      width: 200,
      render: (text) => (
        <Tooltip title={`${text?.port}, ${text?.country}`}>
          <p className="m-0 capitalize font-medium w-72">
            {text?.port}, {text?.country}
          </p>
        </Tooltip>
      ),
    },
    {
      title: 'Country',
      key: 'country',
      dataIndex: 'portDetails',
      render: (text) => (
        <Tooltip title={text?.country}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text?.country}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Back Orders',
      key: 'quantityToPromise',
      dataIndex: 'quantityToPromise',
      width: 200,
      render: (text) => (
        <QuantityToolTip count={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </QuantityToolTip>
      ),
    },
    {
      title: 'Quantity In Hand',
      key: 'quantityAvailable',
      dataIndex: 'quantityAvailable',
      width: 200,
      render: (text) => (
        <QuantityToolTip count={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </QuantityToolTip>
      ),
    },
    {
      title: 'Quantity On Sea',
      key: 'quantityInTransit',
      dataIndex: 'quantityInTransit',
      width: 200,
      render: (text) => (
        <QuantityToolTip count={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text}</p>
        </QuantityToolTip>
      ),
    },
  ];
  return (
    <div>
      <div className="px-5 py-4 flex gap-2 items-center">
        <Select
          placeholder="Select port"
          size="large"
          style={{ width: '500px' }}
          value={port}
          onChange={(e) => {
            setPort(e);
          }}
        >
          {portsList?.records?.map((item) => (
            <Select.Option key={item?._id} value={item?.port}>
              <p className="font-medium m-0 capitalize">
                {item?.port}, {item?.country}
              </p>
            </Select.Option>
          ))}
        </Select>
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
          Add Port inventory
        </Button>
      </div>
      <Divider />
      <div>
        <Table
          className="no-shadow zcp-fixed-w-table"
          rowClassName="cursor-pointer"
          pagination={false}
          loading={Boolean(loading)}
          dataSource={portInventoryList?.records}
          scroll={{ x: 700 }}
          columns={columns}
          // onRow={(record) => {
          //   return {
          //     onClick: (e) => {
          //       history.push(`/config/vendor/profile/${record?.vendorDetails?._id}`);
          //       e.stopPropagation();
          //     },
          //   };
          // }}
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
            <CheckValidation show={portInventoryList?.count > 5}>
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
                  total={portInventoryList?.count}
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
          <p className="font-bold m-0">
            {isModalVisible === 'add' ? 'Add' : 'Update'} port inventory
          </p>
        }
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(null);
        }}
        onOk={() => form.submit()}
        okButtonProps={{ loading: Boolean(updatePortLoading) || Boolean(addPortLoading) }}
        okText={isModalVisible === 'add' ? 'Add' : 'Update'}
      >
        <div className="p-4">
          <Form
            layout="vertical"
            form={form}
            onFinish={(values) => {
              if (isModalVisible === 'add') {
                return dispatch({
                  type: 'portInventory/createPortInventory',
                  payload: { body: { ...values, inventoryId: itemId } },
                })
                  .then((res) => {
                    if (res?._id) {
                      message.success('Inventory added successfully');
                      setIsModalVisible(null);
                      getAllPortInventory();
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
                type: 'portInventory/updatePortInventory',
                payload: {
                  body: values,
                  pathParams: {
                    portInventoryId: isModalVisible,
                  },
                },
              })
                .then((res) => {
                  if (res?._id) {
                    message.success('Inventory updated successfully');
                    setIsModalVisible(null);
                    getAllPortInventory();
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
                  message: 'Please select port',
                },
              ]}
            >
              <Select disabled={isModalVisible !== 'add'} placeholder="Select port" size="large">
                {portsList?.records?.map((item) => (
                  <Select.Option key={item?._id} value={item?.port}>
                    <p className="font-medium m-0 capitalize">
                      {item?.port}, {item?.country}
                    </p>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <QuantityConvert name="quantityToPromise" required={false} label={'Back Orders'} />
            <QuantityConvert
              name="quantityAvailable"
              requiredMessage={"Qin can't be blank!"}
              label={'Quantity In Hand'}
            />
            <QuantityConvert name="quantityInTransit" required={false} label={'Quantity On Sea'} />
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default connect(({ portInventory, ports, loading }) => ({
  portInventoryList: portInventory?.portInventoryList,
  portsList: ports?.portsList,
  updatePortLoading: loading?.effects['portInventory/updatePortInventory'],
  addPortLoading: loading?.effects['portInventory/createPortInventory'],
}))(PortWiseInventory);
