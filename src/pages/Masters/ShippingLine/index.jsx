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
} from 'antd';

import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';

import { connect } from 'umi';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import CheckValidation from '@/components/CheckValidation';
import CopyToClipBoard from '@/components/CopyToClipBoard';
import UploadCsvModal from '@/components/UploadCsvModal';

const { Search } = Input;

const Shipping = ({ dispatch, shippingLineList, loading, updateLoading, addLoading }) => {
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const getAllShippingLine = () => {
    dispatch({
      type: 'shipping/getAllShippingLine',
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
    getAllShippingLine();
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
      title: 'Shipping Line',
      key: 'shippingLine',
      dataIndex: 'shippingLine',
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium w-72">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Website Link',
      key: 'webLink',
      dataIndex: 'webLink',
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
          <CopyToClipBoard
            text={record?.webLink}
            beforeCopyTextMessage={'Copy website link'}
            afterCopyTextMessage={'Website link copied successfully'}
          />
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
        title="Shipping Line"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Shipping',
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
            Add shipping <ArrowRightOutlined />
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
              type="shipping/importShippingLineCSVData"
              modalTitle={'Import Shipping Lines'}
              apiMessage="Csv successfully updated"
              refetch={getAllShippingLine}
            />
          </div>
          <Divider />

          <div>
            <Table
              className="no-shadow zcp-fixed-w-table"
              rowClassName="cursor-pointer"
              pagination={false}
              loading={Boolean(loading)}
              dataSource={shippingLineList?.records}
              scroll={{ x: 1000 }}
              columns={columns}
              locale={{
                emptyText: (
                  <div className="text-center flex justify-center items-center py-10">
                    <div>
                      <p className="text-lg">No shipping found!</p>
                      <img
                        className=""
                        src={SearchNotFound}
                        alt="No shipping found!"
                        style={{ height: '100px' }}
                      />
                    </div>
                  </div>
                ),
              }}
              footer={() => (
                <CheckValidation show={shippingLineList?.count > 5}>
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
                      total={shippingLineList?.count}
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
            <p className="font-bold m-0">{isModalVisible === 'add' ? 'Add' : 'Update'} Shipping</p>
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
                    type: 'shipping/createShippingLine',
                    payload: { body: values },
                  })
                    .then((res) => {
                      if (res?._id) {
                        message.success('Shipping added successfully');
                        setIsModalVisible(null);
                        getAllShippingLine();
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
                  type: 'shipping/updateShippingLine',
                  payload: {
                    body: values,
                    pathParams: {
                      shippingLineId: isModalVisible,
                    },
                  },
                })
                  .then((res) => {
                    if (res?._id) {
                      message.success('Shipping updated successfully');
                      setIsModalVisible(null);
                      getAllShippingLine();
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
                name="shippingLine"
                label={<span className="formLabel">Shipping Line</span>}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Shipping line can't be blank!",
                  },
                ]}
              >
                <Input size="large" autoFocus placeholder="Enter shipping line" />
              </Form.Item>
              <Form.Item
                name="webLink"
                label={<span className="formLabel">Website Link</span>}
                rules={[
                  {
                    required: true,

                    message: "Website link can't be blank!",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter website link" />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </Page>
    </>
  );
};
export default connect(({ loading, shipping }) => ({
  updateLoading: loading?.effects['shipping/updateShippingLine'],
  addLoading: loading?.effects['shipping/createShippingLine'],
  loading: loading?.effects['shipping/getAllShippingLine'],
  shippingLineList: shipping?.shippingLineList,
}))(Shipping);
