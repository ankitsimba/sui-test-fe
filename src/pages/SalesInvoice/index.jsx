import React, { useState } from 'react';
import {
  Button,
  Table,
  Input,
  Divider,
  Row,
  Pagination,
  message,
  Form,
  Col,
  Tooltip,
  InputNumber,
  DatePicker,
  Select,
  Avatar,
  Drawer,
  Tag,
  Popover,
} from 'antd';

import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { ArrowRightOutlined } from '@ant-design/icons';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';

import { connect, history } from 'umi';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import CheckValidation from '@/components/CheckValidation';
import moment from 'moment';
import { getInitials } from '@/utils/common';
import DownloadPdfButton from './DownloadPdfButton';
import { ShowOverFlowTags } from '@/components/ShowOverFlowTags';
import QuantityConvert from '@/components/QuantityConvert';
import QuantityToolTip from '@/components/QuantityToolTip';

const { Search } = Input;

const SalesInvoice = ({
  dispatch,
  masterItemsList,
  vendorItemsList,
  updateLoading,
  loading,
  addLoading,
  portsList,
  invoiceList,
  vendorList,
}) => {
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [itemId, setItemId] = useState([]);
  const [catelog, setCatelog] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filter, setFilter] = useState({});
  const [form] = Form.useForm();

  const getAllMasterItem = () => {
    dispatch({
      type: 'masterItem/getAllMasterItem',
      payload: {
        query: {
          startIndex: 0,
          viewSize: 100000,
        },
      },
    });
  };
  const getAllOrders = () => {
    dispatch({
      type: 'salesInvoice/getAllInvoice',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword,
          ...filter,
        },
      },
    });
  };
  // const getVendorList = () => {
  //   dispatch({
  //     type: 'vendors/getAllVendors',
  //     payload: {
  //       query: {
  //         startIndex: 0,
  //         viewSize: 100000,
  //         status: '',
  //       },
  //     },
  //   });
  // };

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
  const getAllCatelog = () => {
    dispatch({
      type: 'purchaseOrder/getVendorListForOrder',
      payload: {
        body: {
          // keyword,
          items: itemId,
        },
      },
    });
  };
  useEffect(() => {
    if (itemId) {
      getAllCatelog();
    }
  }, [itemId]);
  useEffect(() => {
    getAllOrders();
  }, [keyword, startIndex, viewSize, filter]);
  useEffect(() => {
    // if (isModalVisible) {
    //   getAllTruckingCompany();
    // }
    getAllPorts();
    // getVendorList();
    getAllMasterItem();
  }, []);
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
  const getPort = (record, port) => {
    const country = record?.portDetails?.find((ele) => ele?.port === port)?.country;
    return (
      <div className="text-left">
        <Tooltip title={`Port: ${port}, ${country}`}>
          <p className="m-0 font-medium capitalize w-40 truncate">
            {port}, {country}
          </p>
        </Tooltip>
      </div>
    );
  };
  const columns = [
    {
      title: 'Sr. No.',
      width: 100,
      align: 'center',
      render: (_, __, index) => index + 1 + viewSize * (currentPage - 1),
    },
    {
      title: 'Invoice No.',
      width: 150,
      align: 'center',
      dataIndex: 'invoiceNo',
      render: (text) => text,
    },
    {
      title: 'Vendor',
      key: 'vendor',
      width: 300,
      dataIndex: 'vendorDetails',
      render: (record) => (
        <div className="flex items-center justify-start w-full">
          <>
            <div className="w-8">
              <Avatar
                className="bg-orange-900 w-8 uppercase"
                style={{ backgroundColor: '#005be7' }}
              >
                {(record?.name && getInitials(record?.name)) || 'n/a'}
              </Avatar>
            </div>
            <div className="ml-2">
              <div className="font-medium  capitalize " title={record?.name}>
                {record?.name}
              </div>
              <div className="w-full">
                <span className="text-gray-700">{record?.email}</span>
              </div>
            </div>
          </>
        </div>
      ),
    },

    {
      title: 'Products Details',
      key: 'products',

      width: 230,
      render: (_, record) => (
        <ShowOverFlowTags
          data={record?.products?.map((item) => {
            const product = record?.items?.find((ele) => ele?.code === item?.code);
            return {
              label: (
                <Popover
                  content={
                    <div>
                      <p className="font-medium m-0 text-gray-700">
                        <span className="text-gray-900">Name:</span> {item?.name}
                      </p>
                      <p className="font-medium m-0 text-gray-700">
                        <span className="text-gray-900"> Code:</span> {item?.code}
                      </p>
                      <QuantityToolTip count={product?.quantity}>
                        <p className="font-medium m-0 text-gray-700">
                          <span className="text-gray-900"> Quantity:</span> {product?.quantity}
                        </p>
                      </QuantityToolTip>
                      <p className="font-medium m-0 text-gray-700">
                        <span className="text-gray-900"> Weight:</span> {product?.weight}
                      </p>
                      <p className="font-medium m-0 text-gray-700">
                        <span className="text-gray-900">Total Price for item:</span>{' '}
                        {product?.price}
                      </p>
                    </div>
                  }
                >
                  <span
                    onClick={() => {
                      history.push(`/inventory/${item?.code}/profile`);
                    }}
                  >
                    {item?.code}
                  </span>
                </Popover>
              ),
            };
          })}
          overflowCount={2}
        />
      ),
    },
    {
      title: 'Port of Loading',
      dataIndex: 'shipmentDetails',
      width: 230,
      render: (text, record) => getPort(record, text?.portOfLoading),
    },
    {
      title: 'Port of discharge',
      dataIndex: 'shipmentDetails',
      width: 230,
      render: (text, record) => getPort(record, text?.portOfDischarge),
    },
    {
      title: 'Port of Destination',
      dataIndex: 'shipmentDetails',
      width: 230,
      render: (text, record) => getPort(record, text?.finalDestinationPort),
    },
    {
      title: 'Total Amount',
      key: 'amount',
      dataIndex: 'totalAmount',
      width: 150,
      render: (text) => (
        <p className="m-0 font-medium capitalize w-40 truncate">${text?.toLocaleString()}</p>
      ),
    },
    {
      title: 'Date',
      key: 'sate',
      dataIndex: 'date',
      width: 150,
      render: (text) => (
        <p className="m-0 font-medium capitalize w-40 truncate">
          {text ? moment(text).format('DD-MM-YYYY') : '--'}
        </p>
      ),
    },

    {
      title: 'Remarks',
      key: 'remarks',
      dataIndex: 'remarks',
      width: 150,
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text || '--'}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <div className="m-0 font-medium flex gap-2 items-center justify-center">
          <DownloadPdfButton id={record?._id} />
        </div>
      ),
    },
  ];
  const onClose = () => {
    setIsModalVisible(null);
    setItemId([]);
  };

  return (
    <>
      <Page
        title="Vendor Sales Invoice"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Vendor Sales Invoice',
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
            Create Invoice <ArrowRightOutlined />
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
            <Select
              placeholder="Select product"
              size="large"
              filterOption="value"
              showSearch
              style={{ width: '300px' }}
              onChange={(e) => {
                setFilter((prev) => ({ ...prev, itemId: e }));
              }}
              allowClear
            >
              {masterItemsList?.records?.map((item) => (
                <Select.Option key={item?._id} value={item?.code} item={item}>
                  {item?.code}
                </Select.Option>
              ))}
            </Select>
            {/* <Select
              style={{ width: '300px' }}
              onChange={(e) => {
                setFilter((prev) => ({ ...prev, port: e }));
              }}
              allowClear
              placeholder="Select port"
              size="large"
            >
              {portsList?.records?.map((item) => (
                <Select.Option key={item?._id} value={item?.port}>
                  {item?.port}
                </Select.Option>
              ))}
            </Select> */}
            <Select
              placeholder="Select vendor"
              allowClear
              style={{ width: '300px' }}
              filterOption="filter"
              showSearch
              onChange={(e) => {
                setFilter((prev) => ({ ...prev, vendorId: e }));
              }}
              size="large"
            >
              {vendorList?.records?.map((item) => (
                <Select.Option key={item?._id} filter={item?.name} value={item?._id}>
                  {item?.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <Divider />

          <div>
            <Table
              className="no-shadow zcp-fixed-w-table"
              rowClassName="cursor-pointer"
              pagination={false}
              loading={Boolean(loading)}
              dataSource={invoiceList?.records}
              scroll={{ x: 1000 }}
              columns={columns}
              locale={{
                emptyText: (
                  <div className="text-center flex justify-center items-center py-10">
                    <div>
                      <p className="text-lg">No invoice found!</p>
                      <img
                        className=""
                        src={SearchNotFound}
                        alt="No invoice found!"
                        style={{ height: '100px' }}
                      />
                    </div>
                  </div>
                ),
              }}
              footer={() => (
                <CheckValidation show={invoiceList?.count > 5}>
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
                      total={invoiceList?.count}
                      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                      onChange={handleChangePagination}
                    />
                  </Row>
                </CheckValidation>
              )}
            />
          </div>
        </div>
        <Drawer
          title={
            <p className="font-bold m-0">
              {isModalVisible === 'add' ? 'Create' : 'Update'} Invoice
            </p>
          }
          visible={isModalVisible}
          width={1100}
          maskClosable={false}
          onClose={() => onClose()}
          footer={
            <div className="flex gap-2 justify-end">
              <Button onClick={() => onClose()} className="" size="large">
                Cancel
              </Button>
              <Button
                loading={Boolean(updateLoading) || Boolean(addLoading)}
                onClick={() => form.submit()}
                className=""
                type="primary"
                size="large"
              >
                {isModalVisible === 'add' ? 'Create' : 'Update'}
              </Button>
            </div>
          }
        >
          <div className="">
            <Form
              form={form}
              layout="vertical"
              onFinish={(values) => {
                const body = {
                  ...values,
                  startDate: values?.startDate?.toISOString(),
                  endDate: values?.endDate?.toISOString(),
                };
                body.items = itemId?.map((item) => {
                  const price = catelog?.find((ele) => ele?.code === item)?.price;
                  const quantity = values?.quantity?.[item];
                  return {
                    code: item,
                    quantity,
                    weight: values?.[item]?.weight,
                    price,
                    totalPrice: quantity * price,
                    noOfContainer: values?.[item]?.noOfContainer,
                    noOfPackage: values?.[item]?.noOfPackage,
                    noOfPackageKind: values?.[item]?.noOfPackageKind,
                  };
                });
                body.totalAmount = body?.items?.reduce(
                  (acc, item) => acc + (item?.totalPrice || 0),
                  0,
                );
                delete body.quantity;
                delete body.itemCode;

                if (isModalVisible === 'add') {
                  return dispatch({
                    type: 'salesInvoice/createInvoice',
                    payload: { body },
                  })
                    .then((res) => {
                      if (res) {
                        message.success('Invoice added successfully');
                        setIsModalVisible(null);
                        setItemId([]);
                        setCatelog([]);
                        getAllOrders();
                        form.resetFields();
                      }
                    })
                    .catch((err) => {
                      if (err) {
                        message.error(err?.data?.message);
                      }
                    });
                }
              }}
            >
              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    name="itemCode"
                    label={<span className="formLabel">Item Code</span>}
                    rules={[
                      {
                        required: true,
                        message: "Code can't be blank!",
                      },
                    ]}
                  >
                    <Select
                      disabled={isModalVisible !== 'add'}
                      placeholder="Select item"
                      size="large"
                      showSearch
                      filterOption={(input, option) => {
                        return `${option.item.code} ${option.item.name}`
                          .toLowerCase()
                          ?.includes(input?.toLowerCase());
                      }}
                      mode="multiple"
                      onChange={(e) => {
                        setItemId(e);
                      }}
                      tagRender={(e) => {
                        const { item } = e.label.props;
                        return (
                          <Tag color="blue" onClose={e.onClose} closable={e.closable}>
                            {item?.code}
                          </Tag>
                        );
                      }}
                      onDeselect={(e) => {
                        form.setFieldsValue({ quantity: { [e]: undefined } });
                      }}
                    >
                      {masterItemsList?.records?.map((item) => (
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
                </Col>
                {itemId?.map((item) => (
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className="flex">
                      <QuantityConvert item={item} />
                      <Form.Item
                        name={[item, 'weight']}
                        label={<p className="formLabel m-0  ">{`Weight`}</p>}
                        rules={[
                          {
                            required: true,
                            message: "Weight can't be blank!",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: '100%' }}
                          size="large"
                          placeholder="Enter item weight"
                        />
                      </Form.Item>
                      <Form.Item
                        name={[item, 'noOfContainer']}
                        label={<p className="formLabel m-0  ">{`Marks & No. of Crates`}</p>}
                        rules={[
                          {
                            required: true,
                            message: "No of container can't be blank!",
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Enter no of Crate" />
                      </Form.Item>
                      <Form.Item
                        name={[item, 'noOfPackage']}
                        label={<p className="formLabel m-0 ">{`No Of Package`}</p>}
                        rules={[
                          {
                            required: true,
                            message: "No of package can't be blank!",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: '100%' }}
                          size="large"
                          placeholder="Enter no of package"
                        />
                      </Form.Item>
                      <Form.Item
                        name={[item, 'remarks']}
                        label={<p className="formLabel m-0 ">{`Remarks`}</p>}
                      >
                        <Input style={{ width: '100%' }} size="large" placeholder="Enter remarks" />
                      </Form.Item>
                    </div>{' '}
                  </Col>
                ))}
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    name={'containerNo'}
                    label={<span className="formLabel">Crate No. (Start-End)</span>}
                    rules={[
                      {
                        required: true,
                        message: 'Enter container no',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter container no" />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    name={'kindOfPack'}
                    label={<span className="formLabel">Description of goods</span>}
                    rules={[
                      {
                        required: true,
                        message: 'Enter description of goods',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter description of goods" />
                  </Form.Item>
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    name="vendorId"
                    rules={[
                      {
                        required: true,
                        message: 'Please select vendor',
                      },
                    ]}
                    label={<span className="formLabel">Vendor</span>}
                  >
                    <Select
                      disabled={isModalVisible !== 'add'}
                      placeholder="Select vendor"
                      size="large"
                      onChange={(_, props) => setCatelog(props?.item?.catelog || [])}
                    >
                      {vendorItemsList?.records?.map((item) => (
                        <Select.Option
                          key={item?.vendorDetails?._id}
                          value={item?.vendorDetails?._id}
                          item={item}
                        >
                          <div className="border-b w-full px-2 pb-1">
                            <div className="flex justify-between ">
                              <div className="">
                                <span className="text-green-900 font-medium capitalize">
                                  {item?.vendorDetails?.name}
                                </span>
                                {', '}
                                <span className="text-blue-800 font-medium">
                                  {item?.vendorDetails?.address?.city}
                                </span>
                              </div>

                              <div className="">
                                <Tag
                                  color="blue"
                                  style={{ borderRadius: '15px', marginLeft: '5px' }}
                                >
                                  ${item?.totalPrice} per unit
                                </Tag>
                              </div>
                            </div>
                            <span className="font-medium text-blue-800">
                              {`${item?.vendorDetails?.email}`}
                            </span>{' '}
                            <br />
                            <span className="font-medium text-blue-800">
                              {`${item?.vendorDetails?.phoneNumber?.countryCode} ${item?.vendorDetails?.phoneNumber?.number}`}
                            </span>
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <Form.Item
                    name="date"
                    label={<span className="formLabel">Date</span>}
                    rules={[
                      {
                        required: true,

                        message: 'Select date',
                      },
                    ]}
                  >
                    <DatePicker size="large" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <Form.Item
                    name={['exporterRef', 'name']}
                    label={<span className="formLabel">Exporter Ref</span>}
                  >
                    <Input size="large" placeholder="Enter exporter name" />
                  </Form.Item>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <Form.Item
                    name={['buyer', 'date']}
                    label={<span className="formLabel">Order Date</span>}
                  >
                    <DatePicker style={{ width: '100%' }} size="large" placeholder="Select date" />
                  </Form.Item>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <Form.Item
                    name={['buyer', 'orderNo']}
                    label={<span className="formLabel">Order no.</span>}
                  >
                    <Input size="large" placeholder="Enter order no." />
                  </Form.Item>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <Form.Item
                    name={'transferBy'}
                    label={<span className="formLabel">Transfer By</span>}
                    rules={[
                      {
                        required: true,
                        message: 'Enter transfer by',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter transfer" />
                  </Form.Item>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <Form.Item
                    name={'receiptPlace'}
                    label={<span className="formLabel">Receipt Place</span>}
                    rules={[
                      {
                        required: true,
                        message: 'Enter receipt place',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter receipt place" />
                  </Form.Item>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <Form.Item
                    name={'originCountry'}
                    label={<span className="formLabel">Origin Country</span>}
                    rules={[
                      {
                        required: true,
                        message: 'Enter origin country',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter origin country" />
                  </Form.Item>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <Form.Item
                    name={'finalDestinationCountry'}
                    label={<span className="formLabel">Final Destination Country</span>}
                    rules={[
                      {
                        required: true,
                        message: 'Enter final destination country',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter final destination country" />
                  </Form.Item>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <Form.Item
                    name={['shipmentDetails', 'transportMode']}
                    label={<span className="formLabel">Transport mode</span>}
                    rules={[
                      {
                        required: true,
                        message: 'Enter transport mode',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter transport mode" />
                  </Form.Item>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <Form.Item
                    name={['shipmentDetails', 'portOfLoading']}
                    label={<span className="formLabel">Port Of Loading</span>}
                    rules={[
                      {
                        required: true,
                        message: 'Please select port of loading',
                      },
                    ]}
                  >
                    <Select placeholder="Select port of loading" size="large">
                      {portsList?.records?.map((item) => (
                        <Select.Option key={item?._id} value={item?.port}>
                          <p className="capitalize m-0 font-medium">
                            {item?.port}, {item?.country}
                          </p>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <Form.Item
                    name={['shipmentDetails', 'portOfDischarge']}
                    label={<span className="formLabel">Port Of Discharge</span>}
                    rules={[
                      {
                        required: true,
                        message: 'Please select port of discharge',
                      },
                    ]}
                  >
                    <Select placeholder="Select port of discharge" size="large">
                      {portsList?.records?.map((item) => (
                        <Select.Option key={item?._id} value={item?.port}>
                          <p className="capitalize m-0 font-medium">
                            {item?.port}, {item?.country}
                          </p>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <Form.Item
                    name={['shipmentDetails', 'finalDestinationPort']}
                    label={<span className="formLabel">Final Destination Port</span>}
                    rules={[
                      {
                        required: true,
                        message: 'Please select final destination port',
                      },
                    ]}
                  >
                    <Select placeholder="Select final destination port" size="large">
                      {portsList?.records?.map((item) => (
                        <Select.Option key={item?._id} value={item?.port}>
                          <p className="capitalize m-0 font-medium">
                            {item?.port}, {item?.country}
                          </p>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    name={'deliveryAndPaymentTerms'}
                    label={<span className="formLabel">Delivery And Payment Terms</span>}
                  >
                    <Input.TextArea placeholder="Enter terms" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </Drawer>
      </Page>
    </>
  );
};
export default connect(({ loading, masterItem, vendors, purchaseOrder, ports, salesInvoice }) => ({
  masterItemsList: masterItem?.masterItemsList,
  invoiceList: salesInvoice?.invoiceList,
  portsList: ports?.portsList,
  loading: loading?.effects['salesInvoice/getAllInvoice'],
  vendorItemsList: purchaseOrder?.vendorListForOrder,
  vendorList: vendors?.vendorsList,
  addLoading: loading?.effects['salesInvoice/createInvoice'],
}))(SalesInvoice);
