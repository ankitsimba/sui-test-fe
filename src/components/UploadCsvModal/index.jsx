import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Upload, message } from 'antd';
import React, { useState } from 'react';
import { connect } from 'umi';

const UploadCsvModal = ({ refetch, dispatch, type, apiMessage, modalTitle }) => {
  const [form] = Form.useForm();
  const [files, setFiles] = useState(null);
  const [syncModal, setSyncModal] = useState(false);
  const [uploadCSVLoading, setLoading] = useState(false);

  const importCsvData = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('files', files);

    dispatch({
      type,
      payload: { body: formData },
    })
      .then((res) => {
        if (res) {
          setTimeout(() => {
            message.success(apiMessage);
            refetch();
            setLoading(false);
            form.resetFields();
            setFiles(null);
            setSyncModal(false);
          }, 2000);
        }
      })
      .catch((err) => {
        if (err) {
          setLoading(false);
          message.error(err?.data?.message);
        }
      });
  };

  return (
    <>
      <Button
        onClick={() => {
          setSyncModal(true);
          form.resetFields();
          setFiles(null);
        }}
        size="large"
        type="primary"
      >
        Import Csv
      </Button>
      <Modal
        visible={syncModal}
        onCancel={() => {
          setSyncModal(false);
          setFiles(null);
          form.resetFields();
        }}
        title={modalTitle}
        okText="Upload"
        okButtonProps={{
          loading: uploadCSVLoading,
        }}
        onOk={() => {
          if (!files) {
            return message.error('Please add csv file');
          }
          return form.submit();
        }}
      >
        <div className="p-4">
          {' '}
          <Form form={form} onFinish={importCsvData} layout="vertical">
            <div className="flex justify-center items-center">
              {' '}
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
                <Button
                  size="large"
                  type="primary"
                  style={{ width: '100%' }}
                  disabled={files}
                  className="w-full"
                >
                  Add CSV <UploadOutlined />
                </Button>
              </Upload>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default connect(() => ({}))(UploadCsvModal);
