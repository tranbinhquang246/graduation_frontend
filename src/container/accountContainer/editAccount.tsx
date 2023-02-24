import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import axiosConfig from "../../axiosInterceptor/AxioConfig";
import { setLoading } from "../../redux/loading/actions";
import { setUserInforSuccess } from "../../redux/user-infor/action";
import { toast } from "react-toastify";
import { handleError } from "../../service";

const EditAccount: React.FC<Props> = ({ userInfor, setUserInforSuccess }) => {
  let initialValues = { firstName: "", lastName: "" };
  useEffect(() => {
    initialValues.firstName = userInfor?.firstName;
    initialValues.lastName = userInfor?.lastName;
  }, [userInfor]);
  const onFinishInfor = async (values: any) => {
    setUserInforSuccess(false);
    try {
      setLoading(true);
      await axiosConfig.patch(
        `${process.env.REACT_APP_API_URL}user-infor/edit/${userInfor?.userId}`,
        { firstName: values.firstName, lastName: values.lastName }
      );
      setUserInforSuccess(true);
      toast.success("Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishPassword = async (values: any) => {
    try {
      setLoading(true);
      await axiosConfig.patch(
        `${process.env.REACT_APP_API_URL}user/edit/${userInfor?.userId}`,
        { oldPassword: values.currentPassword, password: values.password }
      );
      toast.success("Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {};
  return (
    <div>
      <div>
        <div className="flex justify-start w-full mb-5">
          <p className="font-medium border-b-2 border-[#1e293b]">
            Change Information
          </p>
        </div>
        <Form
          id="changeinfor"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={initialValues}
          onFinish={onFinishInfor}
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
            <Input className="h-8" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
              { max: 10, message: "Max 10 character" },
            ]}
          >
            <Input className="h-8" />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </Form.Item>
        </Form>
      </div>

      {/* Change password part */}
      <div>
        <div className="flex justify-start w-full mb-5">
          <p className="font-medium border-b-2 border-[#1e293b]">
            Change Password
          </p>
        </div>
        <Form
          id="changepassword"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinishPassword}
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
            <Input.Password placeholder="Current Password" className="h-8" />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Please input your new password!" },
              { min: 8, message: "Minimum length 8 characters" },
            ]}
          >
            <Input.Password placeholder="New Password" className="h-8" />
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
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
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

const mapDispatchToProps = { setUserInforSuccess };

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
