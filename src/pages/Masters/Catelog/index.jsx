import React, { useState } from 'react';
import { Button, Table, Input, Divider, Row, Pagination } from 'antd';
import { Link, history } from 'umi';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';

import { connect } from 'umi';

import { debounce } from 'lodash';
import CheckValidation from '@/components/CheckValidation';

const { Search } = Input;

const Catelog = ({ catelogList, loading }) => {
  const [, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [, setStartIndex] = useState(0);

  function handleChangePagination(current, size) {
    setStartIndex(size * (current - 1));
    setCurrentPage(current);
  }
  const action = (value) => {
    setCurrentPage(1);
    setKeyword(value);
    setStartIndex(0);
  };
  //   const getAllCatelog = () => {
  //     dispatch({
  //       type: 'catelog/getAllCatelog',
  //       payload: {
  //         query: {
  //           startIndex,
  //           viewSize,
  //           keyword,
  //         },
  //       },
  //     });
  //   };
  //     useEffect(() => {
  //       getAllCatelog();
  //     }, [startIndex, viewSize, keyword]);
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
    },
    {
      title: 'Full Name',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: 'HSN Code',
      key: 'hsncode',
      dataIndex: 'hsncode',
    },
    {
      title: 'Color',
      key: 'color',
      dataIndex: 'color',
    },
    {
      title: 'Size',
      key: 'size',
      dataIndex: 'size',
    },
    {
      title: 'Pcs',
      key: 'pcs',
      dataIndex: 'pcs',
    },
    {
      title: 'Qty.',
      key: 'qty',
      dataIndex: 'qty',
    },
    {
      title: 'Scale',
      key: 'scale',
      dataIndex: 'scale',
    },
    {
      title: 'Level',
      key: 'level',
      dataIndex: 'level',
    },
    {
      title: 'Weight',
      key: 'weight',
      dataIndex: 'weight',
    },
    {
      title: 'Region',
      key: 'region',
      dataIndex: 'region',
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
              history.push(`/config/vendor/edit/${record?._id}`);
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
        title="Catelog"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Catelog',
                path: '#',
              },
            ]}
          />
        }
        primaryAction={
          <Link
            to={{
              pathname: '/config/catelog/add',
            }}
          >
            <Button type="primary" style={{ display: 'flex', alignItems: 'center' }} id="open">
              Add Catelog <ArrowRightOutlined />
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

          <Table
            className="no-shadow zcp-fixed-w-table"
            rowClassName="cursor-pointer"
            pagination={false}
            loading={Boolean(loading)}
            dataSource={catelogList?.records}
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
                    <p className="text-lg">No item found!</p>
                    <img
                      className=""
                      src={SearchNotFound}
                      alt="No item found!"
                      style={{ height: '100px' }}
                    />
                  </div>
                </div>
              ),
            }}
            footer={() => (
              <CheckValidation show={catelogList?.count > 5}>
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
                    total={catelogList?.count}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    onChange={handleChangePagination}
                  />
                </Row>
              </CheckValidation>
            )}
          />
        </div>
      </Page>
    </>
  );
};
export default connect(({ catelog, loading }) => ({
  catelogList: catelog?.catelogList,
  loading: loading?.effects['catelog/getAllCatelog'],
}))(Catelog);
