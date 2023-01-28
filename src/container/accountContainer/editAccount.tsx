import React from "react";
import { Form, Input } from "antd";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";

const editAccount: React.FC<Props> = ({ userInfor }) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div>
        <p>Change information </p>
        <Form
          id="changeinfor"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            firstName: userInfor?.firstName,
            lastName: userInfor?.lastName,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
              { max: 10, message: "Max 10 character" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
              { max: 10, message: "Max 10 character" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <button type="submit">Submit</button>
          </Form.Item>
        </Form>
      </div>

      {/* Change password part */}
      <div>
        <p>Change password </p>
        <Form
          id="changepassword"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
            ]}
          >
            <Input.Password placeholder="Current Password" />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Please input your new password!" },
              { min: 8, message: "Minimum length 8 characters" },
            ]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>

          <Form.Item
            label="Re-input New Password"
            name="repassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Re-password" className="h-8" />
          </Form.Item>
          <Form.Item>
            <button type="submit">Submit</button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: RootState) => {
  return {
    userInfor: state.userInforReducer.userInfor,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(editAccount);
