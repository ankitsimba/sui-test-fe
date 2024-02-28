import { uploadDocument } from '@/services/uploadDocuments';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import React, { useState } from 'react';

const UploadDocument = ({ onUploadDone }) => {
  const [loading, setLoading] = useState(false);
  const uploadDocs = async ({ file }) => {
    setLoading(true);
    const formData = new FormData();

    formData.append('files', file);
    let fileObject = null;
    await uploadDocument({ body: formData })
      .then((res) => {
        setLoading(false);
        fileObject = res?.data;
      })
      .catch((e) => message.error(e.message));
    return fileObject;
  };
  return (
    <Upload
      beforeUpload={async (file) => {
        onUploadDone(await uploadDocs({ file }));
        return false;
      }}
      showUploadList={false}
      accept="image/*"
    >
      <Button
        size="large"
        type="primary"
        loading={loading}
        // disabled={documentName}
        className="w-full"
      >
        <UploadOutlined />
      </Button>
    </Upload>
  );
};

export default UploadDocument;
