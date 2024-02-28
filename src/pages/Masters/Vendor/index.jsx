import React, { useState } from 'react';
import {
  Button,
  Table,
  Input,
  Tabs,
  Divider,
  Row,
  Pagination,
  Popconfirm,
  message,
  Tooltip,
  Tag,
  Avatar,
} from 'antd';
import { Link, useParams, history } from 'umi';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';

import { connect } from 'umi';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import CheckValidation from '@/components/CheckValidation';
import UploadCsvModal from '@/components/UploadCsvModal';
import { getInitials } from '@/utils/common';

const { Search } = Input;
export const tabs = [
  {
    title: 'All',
    key: 'ALL',
  },
  {
    title: 'Active',
    key: 'ACTIVE',
  },
  {
    title: 'Inactive',
    key: 'INACTIVE',
  },
  //   {
  //     title: "Awaiting response",
  //     key: "AWAITING",
  //   },
];
const VendorList = ({ dispatch, vendorList, loading }) => {
  const { tabName } = useParams();
  console.log('tabName', tabName);
  console.log('vendorList', vendorList);
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const { TabPane } = Tabs;

  function handleChangePagination(current, size) {
    setStartIndex(size * (current - 1));
    setCurrentPage(current);
  }
  const action = (value) => {
    setCurrentPage(1);
    setKeyword(value);
    setStartIndex(0);
  };
  const getVendorList = () => {
    dispatch({
      type: 'vendors/getAllVendors',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword,
          status: tabName === 'all' ? '' : tabName,
        },
      },
    });
  };
  useEffect(() => {
    getVendorList();
  }, [startIndex, viewSize, tabName, keyword]);
  const onSearchChange = debounce(action, 600);
  const columns = [
    {
      title: 'Sr. No.',
      width: 100,
      align: 'center',
      render: (_, __, index) => index + 1 + viewSize * (currentPage - 1),
    },
    {
      title: 'Vendor',
      key: 'vendor',
      width: 300,

      render: (_, record) => (
        <div className="flex items-start justify-start w-full">
          <>
            <div className="w-8 mt-1">
              <Avatar
                className="bg-orange-900 w-8 uppercase"
                style={{ backgroundColor: '#005be7' }}
              >
                {(record?.name && getInitials(record?.name)) || 'n/a'}
              </Avatar>
            </div>
            <div className="ml-2">
              <div className="font-bold  capitalize " title={record?.name}>
                {record?.name}
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
      title: 'Gst no.',
      key: 'gst',
      width: 150,
      dataIndex: 'gstNo',
      render: (text) => <p className="m-0 font-medium uppercase">{text}</p>,
    },
    {
      title: 'Credit Limit',
      key: 'creditLimit',
      width: 120,
      align: 'center',
      dataIndex: 'creditLimit',
      render: (text) => <p className="m-0 font-medium ">{text || '--'}</p>,
    },
    {
      title: 'Due Days',
      key: 'dueDays',
      align: 'center',
      dataIndex: 'dueDays',
      width: 100,
      render: (text) => <p className="m-0 font-medium ">{text}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: 150,
      render: (_, record) => (
        <div className="m-0 font-medium flex gap-2 items-center">
          <Button
            type="link"
            onClick={(e) => {
              e.stopPropagation();
              history.push(`/config/vendor/edit/${record?._id}`);
            }}
          >
            <EditOutlined />
          </Button>
          {tabName !== 'all' ? (
            <div>
              <Popconfirm
                title={`Are you sure you want to ${
                  record?.status !== 'active' ? 'active' : 'inactive'
                }?`}
                okText="Yes"
                okType="primary"
                cancelText="No"
                onConfirm={(e) => {
                  e?.stopPropagation();
                  dispatch({
                    type: 'vendors/updateVendor',
                    payload: {
                      body: {
                        status: record?.status === 'active' ? 'inactive' : 'active',
                      },
                      pathParams: {
                        vendorId: record?._id,
                      },
                    },
                  })
                    .then((res) => {
                      if (res?._id) {
                        message.success('Vendor status updated successfully');
                        history.push(
                          `/config/vendor/${record?.status === 'active' ? 'inactive' : 'active'}`,
                        );
                      }
                    })
                    .catch((err) => {
                      if (err) {
                        console.log('err', err);
                        message.error('Error while updating vendor status');
                      }
                    });
                }}
              >
                <a
                  onClick={(e) => {
                    e?.stopPropagation();
                  }}
                  type="primary"
                >
                  {record?.status === 'active' ? (
                    <Tag color={'red'}>Inactive</Tag>
                  ) : (
                    <Tag color={'green'}>Active</Tag>
                  )}
                </a>
              </Popconfirm>
            </div>
          ) : null}
        </div>
      ),
    },
  ];
  return (
    <>
      <Page
        title="Vendors"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Vendors',
                path: '#',
              },
            ]}
          />
        }
        primaryAction={
          <Link
            to={{
              pathname: '/config/vendor/add/new',
            }}
          >
            <Button type="primary" style={{ display: 'flex', alignItems: 'center' }} id="open">
              Add Vendor <ArrowRightOutlined />
            </Button>
          </Link>
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
              type="vendors/importVendorCSVData"
              modalTitle={'Import Vendors'}
              apiMessage="Csv successfully updated"
              refetch={getVendorList}
            />
          </div>
          <Divider />
          <Tabs
            activeKey={tabName?.toUpperCase()}
            onTabClick={(key) => {
              history.push(`/config/vendor/${key?.toLowerCase()}`);
              setStartIndex(0);
              setCurrentPage(1);
              setKeyword('');
            }}
          >
            {tabs?.map((tab) => (
              <TabPane tab={<span className="px-4">{tab?.title}</span>} key={tab?.key}>
                {tab?.key === tabName?.toUpperCase() && (
                  <div key={tab?.key}>
                    <Table
                      className="no-shadow zcp-fixed-w-table"
                      rowClassName="cursor-pointer"
                      pagination={false}
                      loading={Boolean(loading)}
                      dataSource={vendorList?.records}
                      scroll={{ x: 1000 }}
                      columns={columns}
                      onRow={(record) => {
                        return {
                          onClick: (e) => {
                            history.push(`/config/vendor/profile/${record?._id}`);
                            e.stopPropagation();
                          },
                        };
                      }}
                      locale={{
                        emptyText: (
                          <div className="text-center flex justify-center items-center py-10">
                            <div>
                              <p className="text-lg">No vendor found!</p>
                              <img
                                className=""
                                src={SearchNotFound}
                                alt="No vendor found!"
                                style={{ height: '100px' }}
                              />
                            </div>
                          </div>
                        ),
                      }}
                      footer={() => (
                        <CheckValidation show={vendorList?.count > 5}>
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
                              total={vendorList?.count}
                              showTotal={(total, range) =>
                                `${range[0]}-${range[1]} of ${total} items`
                              }
                              onChange={handleChangePagination}
                            />
                          </Row>
                        </CheckValidation>
                      )}
                    />
                  </div>
                )}
              </TabPane>
            ))}
          </Tabs>
        </div>
      </Page>
    </>
  );
};
export default connect(({ vendors, loading }) => ({
  vendorList: vendors?.vendorsList,
  loading: loading?.effects['vendors/getAllVendors'],
}))(VendorList);
