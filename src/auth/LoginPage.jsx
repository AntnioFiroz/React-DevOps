import {
    ArrowLeftOutlined,
    CloseCircleOutlined,
    LockOutlined,
    MailOutlined,
  } from "@ant-design/icons";
  import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
  import React, { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";
//   import { userLogin } from "../../service/authApi";
  
  const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [animation, setAnimation] = useState(false);
    const [passwordFilled, SetpasswordFilled] = useState("");
    const [emailFilled, SetEmailFilled] = useState("");
  
    const [form] = Form.useForm();
    const [disabledSave, setDisabledSave] = useState(true);
  
    const handleFormChange = () => {
      const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
      const formValues = form.getFieldsValue();
      const isEmailEmpty = !formValues.email?.trim();
      const isPasswordEmpty = !formValues.password?.trim();
      setDisabledSave(hasErrors || isEmailEmpty || isPasswordEmpty);
    };
    const onFinish = (values) => {
      setEmail(values.email);
      userloginFn({ values });
    };
  
    //make function of login
    const userloginFn = async ({ values }) => {
      const response = await userLogin({ data: values });
      if (response.status === 200) {
        if (response.data.success) {
          localStorage.setItem("token", JSON.stringify(response.data.payload));
          localStorage.setItem("accessToken", response.data.payload.accessToken);
          localStorage.setItem(
            "refreshToken",
            response.data.payload.refreshToken
          );
          toast.success("Login successfully ");
          const timer = setTimeout(() => {
            navigate("/");
            window.location.reload(true);
          }, 1000);
          timer();
        }
      } else if (response.status === 206) {
        navigate("/verify-email", {
          state: {
            //...values
            userId: response.data.payload.userId,
            email: email,
          },
        });
      } else {
        toast.error("Invalid Credentials");
      }
    };
  
    const handleNavigate = () => {
      setAnimation(false);
      setTimeout(() => {
        navigate("/");
      }, 500);
    };
    const location = useLocation();
  
    useEffect(() => {
      setTimeout(() => {
        setAnimation(true);
      }, 10);
    }, []);
  
    return (
      <div>
        <div
          className="border-t border-[#D9D9D9] lg:w-[100%] bg-black opacity-50 h-[100vh] absolute top-0"
          onClick={handleNavigate}
        ></div>
        <div
          className={`absolute transition-all duration-500 w-full ${
            animation ? "right-0" : "-right-[100%]"
          } md:w-[60%] lg:w-[40%] border top-0 bg-[#FAFAFA] px-10 py-6 md:py-10 h-[100%]`}
        >
          <Form
            name="normal_login"
            className="login-form"
            form={form}
            onFieldsChange={handleFormChange}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <div className="h-[85vh] flex justify-between flex-col">
              <div>
                <Typography className="mb-[2.5rem] text-2xl text-[#0057A3] flex flex-col items-left justify-between font-sans">
                  {" "}
                  <div
                    className="flex items-center gap-2 mb-4 cursor-pointer md:hidden"
                    onClick={handleNavigate}
                  >
                    {" "}
                    <ArrowLeftOutlined className="text-[#8C8C8C] text-lg mb-1" />{" "}
                    <Typography className="text-lg text-[#8C8C8C] font-sans">
                      Back
                    </Typography>{" "}
                  </div>{" "}
                  <Typography className="text-2xl text-[#0057A3] flex items-center justify-between font-semibold font-sans">
                    Log In
                    <CloseCircleOutlined
                      onClick={handleNavigate}
                      className="text-[#8C8C8C] cursor-pointer md:block hidden"
                    />{" "}
                  </Typography>{" "}
                </Typography>
  
                <Typography className="text-[#595959] mb-[8px] font-sans">
                  Email ID
                </Typography>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="mr-1" />}
                    placeholder="Enter Email ID"
                    className="rounded h-10 font-sans"
                    onChange={(event) => SetEmailFilled(event.target.value)}
                  />
                </Form.Item>
  
                <Typography className="text-[#595959] mb-[8px] font-sans">
                  Password
                </Typography>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter Password"
                    prefix={<LockOutlined className="site-form-item-icon mr-1" />}
                    className="rounded h-10 font-sans"
                    onChange={(event) => SetpasswordFilled(event.target.value)}
                  />
                </Form.Item>
  
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="flex gap-1 items-center text-[#0057A3] font-normal font-sans">
                      Remember me
                    </Checkbox>
                  </Form.Item>
  
                  <span
                    className="login-form-forgot text-[#0057A3] absolute right-0 top-1 cursor-pointer font-semibold font-sans"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot password
                  </span>
                </Form.Item>
              </div>
              <div>
                <Form.Item className="">
                  <Button
                    type="default"
                    htmlType="submit"
                    enableButton
                    className="login-form-button w-full disabled:bg-[#BFBFBF] h-10 lg:mt-20  bg-[#0057A3] font-sans rounded-[4px]"
                    disabled={disabledSave}
                  >
                    <Typography className="text-white font-sans">
                      Login
                    </Typography>
                  </Button>
                  <Typography className="mt-[12px] font-semibold font-sans">
                    Don't have an account?{" "}
                    <span
                      href=""
                      className="ml-1 text-[#0057A3] cursor-pointer"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </span>
                  </Typography>
                </Form.Item>
              </div>
            </div>
          </Form>
          <style jsx>
            {`
              .ant-checkbox-checked .ant-checkbox-inner {
                background: #0057a3 !important;
  
                border-color: #0057a3 !important;
              }
              .ant-checkbox-inner:after {
                background-color: #0057a3 !important;
              }
            `}
          </style>
        </div>
      </div>
    );
  };
  
  export default LoginPage;
  