import { CheckCircleFilled, CopyOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyToClipBoard = ({ text, beforeCopyTextMessage, afterCopyTextMessage, type }) => {
  const [clickToClipboard, setClickToClipboard] = useState(false);
  useEffect(() => {
    if (clickToClipboard) {
      setTimeout(() => {
        setClickToClipboard(false);
      }, 3000);
    }
  }, [clickToClipboard]);
  return (
    <CopyToClipboard text={text} onCopy={() => setClickToClipboard(true)}>
      <Tooltip title={!clickToClipboard ? beforeCopyTextMessage : afterCopyTextMessage}>
        <Button type={type || 'link'} style={{ display: 'flex', alignItems: 'center' }}>
          {!clickToClipboard ? <CopyOutlined /> : <CheckCircleFilled />}
        </Button>
      </Tooltip>
    </CopyToClipboard>
  );
};

export default CopyToClipBoard;
