import React, { useState } from 'react';
import { Button, Table, Input, Divider, Row, Pagination } from 'antd';
import { Link, history } from 'umi';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';

import { connect } from 'umi';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import CheckValidation from '@/components/CheckValidation';
import { ShowOverFlowTags } from '@/components/ShowOverFlowTags';
import moment from 'moment';

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
const Batches = ({ dispatch, batchList, loading }) => {
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);

  const getAllBatches = () => {
    dispatch({
      type: 'batches/getAllBatches',
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
    getAllBatches();
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
      title: 'Port',
      key: 'port',
      dataIndex: 'portDetails',
      render: (text) => <p className="m-0">{text?.port}</p>,
    },
    {
      title: 'Batches',
      key: 'batches',
      render: (_, record) => (
        <ShowOverFlowTags
          textAlign={'left'}
          data={record?.batches?.map((item) => ({
            label: item?.name,
            otherText: `${moment(item?.startDate)?.format('DD-MM-YYYY')} ➔ ${moment(
              item?.endDate,
            )?.format('DD-MM-YYYY')}`,
          }))}
          overflowCount={2}
        />
      ),
    },

    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 150,
      render: (_, record) => (
        <div className="m-0 font-medium justify-center flex gap-2 items-center">
          <Button
            type="link"
            onClick={() => {
              history.push(`/config/batches/edit/${record?._id}`);
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
        title="Batches"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Batches',
                path: '#',
              },
            ]}
          />
        }
        primaryAction={
          <Link
            to={{
              pathname: '/config/batches/add',
            }}
          >
            <Button type="primary" style={{ display: 'flex', alignItems: 'center' }} id="open">
              Add batch <ArrowRightOutlined />
            </Button>
          </Link>
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
              dataSource={batchList?.records}
              scroll={{ x: 1000 }}
              columns={columns}
              //   onRow={(record) => {
              //     return {
              //       onClick: (e) => {
              //         history.push(`/staff/${record?._id}/profile`);
              //         e.stopPropagation();
              //       },
              //     };
              //   }}
              locale={{
                emptyText: (
                  <div className="text-center flex justify-center items-center py-10">
                    <div>
                      <p className="text-lg">No Batch found!</p>
                      <img
                        className=""
                        src={SearchNotFound}
                        alt="No Batch found!"
                        style={{ height: '100px' }}
                      />
                    </div>
                  </div>
                ),
              }}
              footer={() => (
                <CheckValidation show={batchList?.count > 5}>
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
                      total={batchList?.count}
                      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                      onChange={handleChangePagination}
                    />
                  </Row>
                </CheckValidation>
              )}
            />
          </div>
        </div>
      </Page>
    </>
  );
};
export default connect(({ batches }) => ({ batchList: batches?.batchList }))(Batches);
