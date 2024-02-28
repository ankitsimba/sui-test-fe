import React from 'react';
import { Input, Row, Col, Form, Divider, InputNumber, Button } from 'antd';
import PhoneNumber from '@/components/PhoneNumber';

import Address from '@/components/Address';
import CardSection from '@/components/CardSection';

import UploadDocument from './UploadDocument';
import PdfAndImageViewerModal from '@/components/PdfAndImageViewerModal';
import CheckValidation from '@/components/CheckValidation';
import { useParams, connect } from 'umi';

const VendorAddForm = ({ form, setDocuments, documents, loading, loadingUpdate }) => {
  const { vendorId } = useParams();
  return (
    <>
      <CardSection
        noPadding
        leftContent={
          <div className="pr-8">
            <div className="text-blue-900 font-semibold text-xl">Vendor information</div>
            <div className="text-gray-600">
              <p className="mt-4">Here you add the basic details of vendor.</p>
            </div>
          </div>
        }
        rightContent={
          <div className="bg-white shadow rounded">
            <div className="p-4 border-b">
              <Row gutter={24}>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    name="firstName"
                    label={<span className="formLabel">First name</span>}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Firstname can't be blank!",
                      },
                      {
                        pattern: /^[a-zA-Z ]*$/,
                        message: 'Accept only alphabetic characters only',
                      },
                    ]}
                  >
                    <Input size="large" autoFocus placeholder="Enter first name" />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    name="lastName"
                    label={<span className="formLabel">Last name</span>}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Lastname can't be blank!",
                      },
                      {
                        pattern: /^[a-zA-Z ]*$/,
                        message: 'Accept only alphabetic characters only',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter last name" />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    label={<span className="formLabel">Email</span>}
                    name="email"
                    initialValue=""
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Email can't be blank!",
                      },
                      {
                        message: 'Please enter a valid email address!',
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      type="email"
                      name="staff-email"
                      id="staff-email"
                      placeholder="Enter staff email address"
                      // onChange={() => {
                      //   form
                      //     .validateFields(['email'])
                      //     .then(({ email }) => {
                      //       checkUniqueness({
                      //         pathParams: { email: email.toLowerCase() },
                      //       }).then(({ isUnique }) => {
                      //         if (!isUnique) {
                      //           form.setFields([
                      //             {
                      //               name: 'email',
                      //               errors: ['This email already exist'],
                      //             },
                      //           ]);
                      //         }
                      //       });
                      //     })
                      //     .catch(() => {});
                      // }}
                    />
                  </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item required label={<span className="formLabel">Phone Number</span>}>
                    <PhoneNumber
                      countryCode="countryCode"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the contact number of service user',
                        },
                      ]}
                      form={form}
                      name="phone"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Address form={form} />
            </div>
          </div>
        }
      />
      <div className="my-5">
        <Divider />
      </div>
      <CardSection
        noPadding
        leftContent={
          <div className="pr-8">
            <div className="text-blue-900 font-semibold text-xl">Bussiness Details</div>
            <div className="text-gray-600">
              <p className="mt-4">Here you add the bussiness details of vendor.</p>
            </div>
          </div>
        }
        rightContent={
          <div className="bg-white shadow  rounded">
            <div className="p-4">
              <Row gutter={24}>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    name="gstNo"
                    label={<span className="formLabel"> Gst no.</span>}
                    rules={[
                      {
                        required: true,
                        message: "Gst no. can't be blank!",
                      },
                    ]}
                  >
                    <Input size="large" style={{ width: '100%' }} placeholder="Enter gst no." />
                  </Form.Item>
                </Col>
                <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                  <Form.Item
                    name="creditLimit"
                    label={<span className="formLabel"> Credit Limit</span>}
                  >
                    <InputNumber
                      size="large"
                      min={0}
                      style={{ width: '100%' }}
                      placeholder="Enter credit limit"
                    />
                  </Form.Item>
                </Col>
                <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                  <Form.Item
                    name="dueDays"
                    label={<span className="formLabel"> Due days</span>}
                    rules={[
                      {
                        required: true,

                        message: "Due days can't be blank!",
                      },
                    ]}
                  >
                    <InputNumber
                      size="large"
                      style={{ width: '100%' }}
                      min={0}
                      placeholder="Enter due days"
                    />
                  </Form.Item>
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Form.Item name="remarks" label={<span className="formLabel">Remarks</span>}>
                    <Input.TextArea
                      size="large"
                      style={{ width: '100%' }}
                      placeholder="Enter remarks...."
                    />
                  </Form.Item>
                </Col>
                {/* <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item name="" label={<span className="formLabel">Logo</span>}>
                    <UploadDocument
                      onUploadDone={(data) => setDocuments((prev) => ({ ...prev, logo: data }))}
                    />
                  </Form.Item>
                  <CheckValidation show={documents?.logo?.Location}>
                    <h1 className="text-sm font-medium">Uploaded file</h1>

                    <PdfAndImageViewerModal
                      useForThumbNail={true}
                      mediaUrl={documents?.logo?.Location}
                    />
                  </CheckValidation>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item name="" label={<span className="formLabel">Sign</span>}>
                    <UploadDocument
                      onUploadDone={(data) => setDocuments((prev) => ({ ...prev, sign: data }))}
                    />
                  </Form.Item>
                  <CheckValidation show={documents?.sign?.Location}>
                    <h1 className="text-sm font-medium">Uploaded file</h1>

                    <PdfAndImageViewerModal
                      useForThumbNail={true}
                      mediaUrl={documents?.sign?.Location}
                    />
                  </CheckValidation>
                </Col> */}
              </Row>
            </div>
            <Divider />
            <div className="p-4 flex justify-end">
              <Button
                onClick={() => {
                  form.submit();
                }}
                type="primary"
                size="large"
                loading={Boolean(loading) || Boolean(loadingUpdate)}
              >
                {vendorId ? 'Update Vendor' : 'Add Vendor'}
              </Button>
            </div>
          </div>
        }
      />
    </>
  );
};
export default connect(({ loading }) => ({
  loading: loading?.effects['vendors/createVendor'],
  loadingUpdate: loading?.effects['vendors/updateVendor'],
}))(VendorAddForm);
