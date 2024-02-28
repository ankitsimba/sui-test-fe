import { Divider, Input, Pagination, Row, Table, Tooltip } from 'antd';
import { connect, useParams, history } from 'umi';
import React, { useEffect, useState } from 'react';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import CheckValidation from '@/components/CheckValidation';

import { debounce } from 'lodash';

const VendorList = ({ loading, vendorItemsList, dispatch }) => {
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);

  const { itemId } = useParams();
  function handleChangePagination(current, size) {
    setStartIndex(size * (current - 1));
    setCurrentPage(current);
  }

  const getAllCatelog = () => {
    dispatch({
      type: 'catelog/getAllCatelog',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword,
          itemId,
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
      title: 'Name',
      key: 'name',
      dataIndex: 'vendorDetails',
      width: 200,
      render: (text) => (
        <Tooltip title={text?.name}>
          <p className="m-0 font-medium w-72">{text?.name}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Estimated Cost Price',
      key: 'price',
      dataIndex: 'price',
      width: 200,
      render: (text) => (
        <Tooltip title={text}>
          <p className="m-0 font-medium w-72">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'vendorDetails',
      render: (text) => (
        <Tooltip title={text?.email}>
          <p className="m-0 font-medium capitalize w-40 truncate">{text?.email}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Phone Number',
      key: 'phoneNumber',
      dataIndex: 'vendorDetails',
      render: (text) => (
        <Tooltip title={`${text?.phoneNumber?.countryCode} ${text?.phoneNumber?.number}`}>
          <p className="m-0 font-medium capitalize w-40 truncate">
            {text?.phoneNumber?.countryCode} {text?.phoneNumber?.number}
          </p>
        </Tooltip>
      ),
    },
    // {
    //   title: 'Address',
    //   key: 'address',
    //   dataIndex: 'vendorDetails',
    //   render: (text) => {
    //     const addressString = `${text?.address?.address1 || ''},${text?.address?.city || ''}
    //                   , ${text?.address?.state || ''}, ${text?.address?.country || ''},  ${
    //       text?.address?.pinCode || ''
    //     }`;
    //     return (
    //       <Tooltip title={addressString}>
    //         <p className="m-0 font-medium capitalize w-40 truncate">{addressString}</p>
    //       </Tooltip>
    //     );
    //   },
    // },
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
                history.push(`/config/vendor/profile/${record?.vendorDetails?._id}`);
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
    </div>
  );
};

export default connect(({ catelog }) => ({
  vendorItemsList: catelog?.vendorItemsList,
}))(VendorList);
