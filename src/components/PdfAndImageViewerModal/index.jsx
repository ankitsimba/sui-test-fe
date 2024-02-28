import { FilePdfFilled } from '@ant-design/icons';
import { Image, message, Modal, Spin, Tooltip } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const PdfAndImageViewerModal = ({ mediaUrl, setMediaUrl, title, footer, useForThumbNail }) => {
  const [base64Data, setBase64Data] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchPdf = () => {
    setLoading(true);
    axios({
      url: mediaUrl,
      method: 'GET',
      responseType: 'arraybuffer',
    })
      .then((response) => {
        const data = Buffer.from(response.data, 'binary').toString('base64');
        setBase64Data(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, 'err');
        setLoading(false);
        return message.error('Something went wrong viewer');
      });
  };
  useEffect(() => {
    if (!useForThumbNail && mediaUrl) {
      fetchPdf();
    }
    if (useForThumbNail && isModalOpen) {
      fetchPdf();
    }
  }, [mediaUrl, isModalOpen]);
  const openModal = () => {
    if (!useForThumbNail) {
      return mediaUrl;
    }
    return isModalOpen;
  };
  return (
    <>
      {useForThumbNail ? (
        <div
          className={
            mediaUrl?.includes('.pdf')
              ? ` h-[100px] w-[100px] border rounded-md flex items-center justify-center`
              : ''
          }
        >
          {mediaUrl?.includes('.pdf') ? (
            <Tooltip title="Click To View">
              <FilePdfFilled
                className="text-5xl text-red-700 w-full h-full flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              />
            </Tooltip>
          ) : (
            <Image src={mediaUrl} width={100} style={{ border: '1px solid black' }} />
          )}
        </div>
      ) : null}
      <Modal
        title={title || 'Document Preview'}
        open={openModal()}
        width={1000}
        footer={footer}
        onCancel={() => {
          if (useForThumbNail) {
            setIsModalOpen(false);
          } else {
            setMediaUrl('');
          }
        }}
        okText={
          <a
            download=""
            href={`${
              mediaUrl?.includes('.pdf') ? 'data:application/pdf;base64,' : 'data:image/png;base64,'
            }${base64Data}`}
          >
            Download
          </a>
        }
        okButtonProps={{ disabled: loading || !base64Data }}
        cancelText="Close"
        style={{
          top: 20,
        }}
      >
        <Spin spinning={loading}>
          {base64Data ? (
            <iframe
              src={`${
                mediaUrl?.includes('.pdf')
                  ? 'data:application/pdf;base64,'
                  : 'data:image/png;base64,'
              }${base64Data}`}
              height="100%"
              style={{ height: '75vh' }}
              width="100%"
            />
          ) : null}
        </Spin>
      </Modal>
    </>
  );
};

export default PdfAndImageViewerModal;
