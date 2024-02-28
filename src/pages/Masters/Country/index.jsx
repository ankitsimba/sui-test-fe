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
  Select,
  Tabs,
} from 'antd';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';

import { connect } from 'umi';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import CheckValidation from '@/components/CheckValidation';
import { ShowOverFlowTags } from '@/components/ShowOverFlowTags';
import UploadCsvModal from '@/components/UploadCsvModal';
import EnableDisableButton from './EnableDisableButton';

const { Search } = Input;

const CountryList = ({ dispatch, countriesList, updateLoading, loading, addLoading }) => {
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(null);
  const [enable, setEnable] = useState('enable');
  const [form] = Form.useForm();
  const getCountryList = () => {
    dispatch({
      type: 'countries/getAllCountries',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword,
          enable: enable === 'enable' ? true : false,
        },
      },
    });
  };
  useEffect(() => {
    getCountryList();
  }, [startIndex, viewSize, keyword, enable]);
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
      title: 'Country',
      key: 'country',
      dataIndex: 'country',
      render: (text) => <p className="m-0 font-medium capitalize">{text}</p>,
    },
    {
      title: 'States',
      key: 'states',
      render: (_, record) => (
        <ShowOverFlowTags
          data={record?.states?.map((item) => ({ label: item }))}
          overflowCount={4}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 150,
      render: (_, record) => (
        <div className="m-0 font-medium flex gap-2 justify-center items-center">
          <Button
            type="link"
            onClick={() => {
              setIsModalVisible(record?._id);
              form.setFieldsValue(record);
            }}
          >
            <EditOutlined />
          </Button>
          <EnableDisableButton record={record} getCountryList={getCountryList} />
        </div>
      ),
    },
  ];
  return (
    <>
      <Page
        title="Enabled Country"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Country',
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
            Add Country <ArrowRightOutlined />
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
              type="countries/importCountriesCSVData"
              modalTitle={'Import Countries'}
              apiMessage="Csv successfully updated"
              refetch={getCountryList}
            />
          </div>
          <Divider />
          <Tabs activeKey={enable} onChange={(e) => setEnable(e)}>
            <Tabs.TabPane tab={<span className="px-4">Enabled</span>} key={'enable'}></Tabs.TabPane>
            <Tabs.TabPane
              tab={<span className="px-4">Disabled</span>}
              key={'disable'}
            ></Tabs.TabPane>
          </Tabs>
          <div>
            <Table
              className="no-shadow zcp-fixed-w-table"
              rowClassName="cursor-pointer"
              pagination={false}
              loading={Boolean(loading)}
              dataSource={countriesList?.records}
              scroll={{ x: 1000 }}
              columns={columns}
              locale={{
                emptyText: (
                  <div className="text-center flex justify-center items-center py-10">
                    <div>
                      <p className="text-lg">No country found!</p>
                      <img
                        className=""
                        src={SearchNotFound}
                        alt="No country found!"
                        style={{ height: '100px' }}
                      />
                    </div>
                  </div>
                ),
              }}
              footer={() => (
                <CheckValidation show={countriesList?.count > 5}>
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
                      total={countriesList?.count}
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
            <p className="font-bold m-0">{isModalVisible === 'add' ? 'Add' : 'Update'} country</p>
          }
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(null);
            form.resetFields();
          }}
          onOk={() => {
            form.submit();
          }}
          okButtonProps={{ loading: Boolean(updateLoading) || Boolean(addLoading) }}
          okText={isModalVisible === 'add' ? 'Add' : 'Update'}
        >
          <div className="p-4">
            <Form
              layout="vertical"
              form={form}
              onFinish={(values) => {
                const body = { ...values, country: values?.country?.trim() };
                if (isModalVisible === 'add') {
                  return dispatch({
                    type: 'countries/createCountry',
                    payload: { body },
                  })
                    .then((res) => {
                      if (res?._id) {
                        message.success('Country added successfully');
                        setIsModalVisible(null);
                        getCountryList();
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
                  type: 'countries/updateCountry',
                  payload: {
                    body,
                    pathParams: {
                      countryId: isModalVisible,
                    },
                  },
                })
                  .then((res) => {
                    if (res?._id) {
                      message.success('Country updated successfully');
                      setIsModalVisible(null);
                      getCountryList();
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
                name="country"
                label={<span className="formLabel">Country Name</span>}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Country can't be blank!",
                  },
                  {
                    pattern: /^[a-zA-Z ]*$/,
                    message: 'Accept only alphabetic characters only',
                  },
                ]}
              >
                <Input size="large" autoFocus placeholder="Enter country name" />
              </Form.Item>
              <Form.Item
                name="states"
                label={<span className="formLabel">State</span>}
                rules={[
                  {
                    required: true,
                    message: "Country can't be blank!",
                  },
                ]}
              >
                <Select size="large" mode="tags" placeholder="Enter state name" />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </Page>
    </>
  );
};
export default connect(({ loading, countries }) => ({
  updateLoading: loading?.effects['countries/updateCountry'],
  countriesList: countries?.countriesList,
  addLoading: loading?.effects['countries/createCountry'],
  loading: loading?.effects['countries/getAllCountries'],
}))(CountryList);
