/* eslint-disable prefer-promise-reject-errors */
import { Button, Input, Form, Col, Row, Avatar, Tooltip, Tag } from "antd";
import { getIntials } from "@/utils/utils";
import React, { useState } from "react";
import { connect, useParams } from "umi";
import UpdatePassword from "@/components/UpdatePassword";
import PhoneNumber from "@/components/PhoneNumber";
import classNames from "classnames";
import styles from "./index.less";

const BasicDetailsForm = ({ form, currentUser, getStaffMember }) => {
  const [visible, setVisible] = useState(false);
  const { staffId } = useParams();
  return (
    <div className="bg-white rounded shadow">
      <div className="w-full pb-4">
        <div className=" mb-4 p-4 px-4 border-b">
          <Row gutter={[24, 12]}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className="flex items-center  justify-between">
                <div className={classNames("ml-6", styles?.btnSyles)}>
                  {staffId ? (
                    <Tag color="magenta">
                      <span className="capitalize">
                        {getStaffMember?.role?.name}
                      </span>
                    </Tag>
                  ) : (
                    <Button
                      type="primary"
                      ghost
                      size="medium"
                      onClick={() => {
                        setVisible(true);
                      }}
                    >
                      Change Password
                    </Button>
                  )}
                </div>
                <Avatar
                  size={80}
                  className="text-center uppercase"
                  style={{ background: "#126E32" }}
                >
                  {currentUser?.name && getIntials(currentUser?.name)}
                </Avatar>
              </div>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <div className="xl:text-right">
                <Tooltip
                  title={!staffId ? currentUser?.email : getStaffMember?.email}
                >
                  <div className="text-blue-900 text-lg truncate w-full font-semibold">
                    {!staffId ? currentUser?.email : getStaffMember?.email}
                  </div>
                </Tooltip>
              </div>
            </Col>
          </Row>
        </div>
        <div className="px-4">
          <Row gutter={24}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name="email"
                label={<span className="FormLabel font-medium">Email</span>}
              >
                <Input
                  size="large"
                  disabled
                  rules={[
                    {
                      required: true,
                      message: `Email can't be blank`,
                    },
                  ]}
                  name="email"
                />
              </Form.Item>
            </Col>

            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: `first name can't be blank`,
                  },
                ]}
                label={
                  <span className="FormLabel font-medium">First Name</span>
                }
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: `last name can't be blank`,
                  },
                ]}
                label={<span className="FormLabel font-medium">Last Name</span>}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label={
                  <span className="FormLabel font-medium">Phone Number</span>
                }
              >
                <PhoneNumber
                  countryCode={["phone", "countryCode"]}
                  rules={[
                    {
                      required: true,
                      message: "Please enter valid mobile number",
                    },
                  ]}
                  form={form}
                  name={["phone", "number"]}
                />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                name="role"
                label={<span className="FormLabel font-medium">Role</span>}
              >
                <Input size="large" disabled />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>
      <UpdatePassword visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default connect(({ common, user, loading, staff }) => ({
  stateCodes: common.stateCodes,
  currentUser: user.currentUser,
  getStaffMember: staff.getStaffMember,
  updateProfileLoading: loading.effects["user/updateCurrent"],
}))(BasicDetailsForm);
