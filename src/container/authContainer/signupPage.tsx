import { Form, Input, Button, Checkbox } from "antd";

import { IMAGES } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { signupRequest } from "../../redux/auth/actions";
import { useEffect } from "react";
import { Footer } from "../../components";

type SignUpType = {
  agreement: boolean;
  email: string;
  password: string;
  repassword: string;
};
const SignupPage: React.FC<Props> = ({
  loading,
  isAuthenticated,
  signupRequest,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      return;
    }
  }, [isAuthenticated]);

  const onFinish = async (values: SignUpType) => {
    signupRequest({ email: values.email, password: values.password });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col font-ubuntu">
      <div className="flex bg-white">
        <div className="flex w-0 sm:w-1/2 items-center justify-center">
          <img
            src={IMAGES.loginImage}
            alt="illutration login"
            className="w-3/4 h-1/2"
          />
        </div>
        <div className="w-full sm:w-1/2 p-4 flex flex-col items-center justify-center mt-5 sm:mt-[50px]">
          <div className="w-full flex flex-col items-center text-slate-800">
            <p className="font-bold text-2xl text-center">Signup to Grapro</p>
            <p className="font-thin text-xs text-center">
              Please signup to enjoy exclusive privileges for you
            </p>
          </div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="w-3/4 pt-5"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Email" className="h-8" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 8, message: "Minimum length 8 characters" },
              ]}
            >
              <Input.Password placeholder="Password" className="h-8" />
            </Form.Item>

            <Form.Item
              name="repassword"
              rules={[
                { required: true, message: "Please input your password!" },
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

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
            >
              <Checkbox>I agree to your terms and services</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                loading={false}
                htmlType="submit"
                className="w-full h-8 bg-blue-600"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="flex flex-row justify-center items-center text-xs">
            <p>Have an account?</p>
            &nbsp;
            <Link
              to="/login"
              className="text-blue-700 justify-center text-center"
            >
              Sign In
            </Link>
          </div>
          <div className="w-3/4 h-[1px] bg-slate-300 m-5"></div>
          <div className="flex flex-col justify-center items-center text-xs w-full">
            <p className="mb-3">Get the app</p>
            <div className="flex w-[160px] h-12 justify-around">
              <img
                src={IMAGES.googlePlayIcon}
                className="w-[60px] h-[60px]"
                alt="Google Play"
              ></img>
              <img
                src={IMAGES.appStoreIcon}
                alt="App Store"
                className="w-[60px] h-[60px]"
              ></img>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.authReducer.loading,
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

const mapDispatchToProps = { signupRequest };

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
