/* eslint-disable no-param-reassign */
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';

import { Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, history, useParams } from 'umi';
import VendorAddForm from './VendorAddForm';

const InviteVendor = ({ dispatch }) => {
  const [form] = Form.useForm();
  const [documents, setDocuments] = useState({});
  const { vendorId } = useParams();
  useEffect(() => {
    if (vendorId) {
      dispatch({
        type: 'vendors/getSingleVendor',
        payload: {
          pathParams: { vendorId },
        },
      }).then((res) => {
        form.setFieldsValue({
          ...res,
          countryCode: res?.phoneNumber?.countryCode,
          phone: res?.phoneNumber?.number,
        });
        setDocuments({ sign: res?.sign, logo: res?.logo });
      });
    }
  }, [vendorId]);

  return (
    <>
      <div className="container mx-auto ">
        <Page
          title={vendorId ? 'Update Vendor' : 'Add Vendor'}
          breadcrumbs={
            <Breadcrumbs
              path={[
                {
                  name: 'Dashboard',
                  path: '/dashboard',
                },
                {
                  name: 'Vendor',
                  path: '',
                },
                {
                  name: vendorId ? 'Update Vendor' : 'Add Vendor',
                  path: '#',
                },
              ]}
            />
          }
        >
          <Form
            layout="vertical"
            autoComplete="off"
            colon={false}
            form={form}
            onFinish={(values) => {
              const body = { ...values };
              delete body.phone;
              delete body.countryCode;
              body.phoneNumber = {
                countryCode: values?.countryCode,
                number: values?.phone,
              };
              body.sign = documents?.sign;
              body.logo = documents?.logo;
              body.name = `${values?.firstName} ${values?.lastName}`;
              if (vendorId) {
                dispatch({
                  type: 'vendors/updateVendor',
                  payload: {
                    body,
                    pathParams: {
                      vendorId,
                    },
                  },
                })
                  .then((res) => {
                    if (res?._id) {
                      message.success('Vendor updated successfully');
                      history.push('/config/vendor/all');
                    }
                  })
                  .catch((err) => {
                    if (err) {
                      message.error(err?.data?.message);
                    }
                  });
                return;
              }
              dispatch({
                type: 'vendors/createVendor',
                payload: {
                  body,
                },
              })
                .then((res) => {
                  if (res?._id) {
                    message.success('Vendor created successfully');
                    history.push('/config/vendor/all');
                  }
                })
                .catch((err) => {
                  if (err) {
                    message.error(err?.data?.message);
                  }
                });
            }}
          >
            <VendorAddForm form={form} setDocuments={setDocuments} documents={documents} />
          </Form>
        </Page>
      </div>
    </>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['vendors/createVendor'],
}))(InviteVendor);
