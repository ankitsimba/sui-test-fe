import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Select, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';

const SyncModal = ({
  getAllMasterItem,
  uploadCSVLoading,
  dispatch,
  syncModal,
  setSyncModal,
  portsList,
}) => {
  const [form] = Form.useForm();
  const [files, setFiles] = useState(null);
  const getAllPorts = () => {
    dispatch({
      type: 'ports/getAllPorts',
      payload: {
        query: {
          startIndex: 0,
          viewSize: 1000000000,
        },
      },
    });
  };
  const importCsvData = (values) => {
    const formData = new FormData();
    formData.append('files', files);
    formData.append('port', values?.port);
    dispatch({
      type: 'masterItem/uploadCSV',
      payload: { body: formData },
    }).then((res) => {
      if (res) {
        message.success(`Inventory sync successfully`);
        getAllMasterItem();
        form.resetFields();
        setFiles(null);
        setSyncModal(false);
      }
    });
  };
  useEffect(() => {
    if (syncModal) {
      getAllPorts();
    }
  }, [syncModal]);
  console.log('files', files);
  return (
    <Modal
      visible={syncModal}
      onCancel={() => {
        setSyncModal(false);
        setFiles(null);
        form.resetFields();
      }}
      title="Sync Inventory"
      okText="Sync"
      okButtonProps={{
        loading: uploadCSVLoading,
      }}
      onOk={() => {
        if (!files) {
          return message.error('Please ad csv file');
        }
        return form.submit();
      }}
    >
      <div className="p-4">
        {' '}
        <Form form={form} onFinish={importCsvData} layout="vertical">
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
            <Select placeholder="Select port" size="large">
              {portsList?.records?.map((item) => (
                <Select.Option key={item?._id} value={item?.port}>
                  {item?.port}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Upload
            beforeUpload={async (file) => {
              setFiles(file);
              return false;
            }}
            // showUploadList={false}
            fileList={files?.name ? [{ name: files?.name }] : []}
            onRemove={() => setFiles(null)}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          >
            <Button size="large" type="primary" disabled={files} className="w-full">
              Upload CSV <UploadOutlined />
            </Button>
          </Upload>
        </Form>
      </div>
    </Modal>
  );
};

export default connect(({ ports, loading }) => ({
  portsList: ports?.portsList,
  uploadCSVLoading: loading?.effects['masterItem/uploadCSV'],
}))(SyncModal);
