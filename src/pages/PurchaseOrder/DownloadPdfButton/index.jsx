import { hostname } from '@/utils/apiUtils';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

const DownloadPdfButton = ({ id }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      type="link"
      loading={loading}
      onClick={(e) => {
        setLoading(true);
        axios({
          method: 'GET',
          url: `${hostname()}/purchaseOrder/${id}/pdf`,
          responseType: 'arraybuffer',
        })
          .then((res) => {
            const data =
              'data:application/pdf;base64,' + Buffer.from(res.data, 'binary').toString('base64');

            const link = document.createElement('a');
            link.href = data;
            link.download = `${id}-order.pdf`;
            link.click();
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
            message.error('Something went while download invoice pdf');
          });
      }}
    >
      <DownloadOutlined />
    </Button>
  );
};

export default DownloadPdfButton;
