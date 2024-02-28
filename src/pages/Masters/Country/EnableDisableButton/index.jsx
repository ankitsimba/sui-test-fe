import { Button, message } from 'antd';
import React, { useState } from 'react';
import { connect } from 'umi';

const EnableDisableButton = ({ record, getCountryList, dispatch }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      loading={loading}
      type={record?.enable ? 'danger' : 'primary'}
      onClick={() => {
        setLoading(true);
        dispatch({
          type: 'countries/updateCountry',
          payload: {
            body: {
              enable: !record?.enable,
            },
            pathParams: {
              countryId: record?._id,
            },
          },
        })
          .then((res) => {
            if (res?._id) {
              setLoading(false);
              message.success(`Country ${record?.enable ? 'disabled' : 'enabled'} successfully`);
              getCountryList();
            }
          })
          .catch((err) => {
            if (err) {
              setLoading(false);
              message.error(err?.data?.message);
            }
          });
      }}
    >
      {record?.enable ? 'Disable' : 'Enable'}
    </Button>
  );
};

export default connect(() => ({}))(EnableDisableButton);
