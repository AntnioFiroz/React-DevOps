import {
    ArrowLeftOutlined,
    CloseCircleOutlined,
    DatabaseOutlined,
    LockOutlined,
    MailOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Button, DatePicker, Form, Input, Select, Typography } from "antd";
  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { createUser } from "../../service/authApi";
  import { useDispatch } from "react-redux";
  import { setUserData } from "../../redux/features/userSlice";
  import { toast } from "react-toastify";
  import { Option } from "antd/es/mentions";
  import moment from "moment";
  
  const SignUpPage = () => {
    const navigate = useNavigate();
    const [animation, setAnimation] = useState(false);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
  
    const onFinish = (values) => {
      createUserFn(values);
      dispatch(setUserData(values));
    };
  
    const [selectedDate, setSelectedDate] = useState(null);
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const handleKeyPress = (event) => {
      // Allow only numeric input (digits 0-9) and some special keys (e.g., backspace, delete)
      const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete'];
  
      if (!allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    };
  
    //make function of Create user
    // const createUserFn = async (values) => {
    //   const response = await createUser({ data: values });
    //   if (response.success) {
    //     navigate(
    //       "/verify-email",
  
    //       {
    //         state: {
    //           userId: response.payload.userId,
    //         },
    //       }
    //     );
  
    //     toast.success("User created Successfully");
    //   } else {
    //     toast.error("Email-ID Already Exists !!");
    //   }
    // };
  
    const handleNavigate = () => {
      setAnimation(false);
      setTimeout(() => {
        navigate("/");
      }, 500);
    };
  
  
    useEffect(() => {
      setTimeout(() => {
        setAnimation(true);
      }, 10);
    }, []);
  
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select
          style={{
            width: 70,
            height: 50,
          }}
          className="flex justify-center items-center font-sans"
          defaultValue={"+91"}
        >
          <Select.Option value="91">+91</Select.Option>
          <Select.Option value="86">+86</Select.Option>
          <Select.Option value="87">+87</Select.Option>
        </Select>
      </Form.Item>
    );
  
    return (
      <div>
        <div
          className="border-t border-[#D9D9D9] w-[100%] bg-black opacity-50 h-[100vh] absolute top-0"
          onClick={handleNavigate}
        >
        </div>
        <div
          className={`absolute transition-all duration-500 w-full ${animation ? "right-0" : "-right-[100%]"
            } md:w-[60%] lg:w-[40%] border h-[100%] top-0 bg-[#FAFAFA] px-10 py-6 md:py-10 overflow-y-scroll`}
        >
          <Form
            name="normal_login"
            className="signup-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <div className="h-[80vh] flex flex-col justify-between">
              <div>
                <Typography className="mb-[36px] text-2xl text-[#0057A3] flex flex-col items-left justify-between font-sans">
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
                    {" "}
                    Sign up{" "}
                    <CloseCircleOutlined
                      onClick={handleNavigate}
                      className="text-[#8C8C8C] cursor-pointer md:block hidden"
                    />{" "}
                  </Typography>{" "}
                </Typography>
  
                <div className="flex gap-2 w-100">
                  {/* ----------------------- First Name ----------------------*/}
                  <div className="w-[49%]">
                    <Typography className="text-[#595959] mb-[8px] font-sans">
                      First Name
                    </Typography>
  
                    <Form.Item
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your First Name!',
                        },
                        {
                          min: 3,
                          message: 'Must be at least 3 characters long!',
                        },
                        {
                          max: 35,
                          message: 'Must not exceed 35 characters!',
                        },
                      ]}
                    >
                      <Input
                        placeholder="First Name"
                        prefix={
                          <UserOutlined className="site-form-item-icon mr-1 h-8 flex items-center justify-center" />
                        }
                        className="rounded font-sans"
                        onChange={(event) => setFirstName(event.target.value)}
                      />
                    </Form.Item>
                  </div>
                  {/* ----------------------------------------------------------- */}
  
                  {/* ----------------------- Last Name ----------------------*/}
                  <div className="w-[49%]">
                    <Typography className="text-[#595959] mb-[8px] font-sans">
                      Last Name
                    </Typography>
  
                    <Form.Item
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Last Name!',
                        },
                        {
                          min: 3,
                          message: 'Must be at least 3 characters long!',
                        },
                        {
                          max: 35,
                          message: 'Must not exceed 35 characters!',
                        },
                      ]}
                    >
                      <Input
                        placeholder="Last Name"
                        prefix={
                          <UserOutlined className="site-form-item-icon mr-1 h-8 flex items-center justify-center" />
                        }
                        className="rounded font-sans"
                        onChange={(event) => setLastName(event.target.value)}
                      />
                    </Form.Item>
                  </div>
                  {/* ----------------------------------------------------------- */}
                </div>
  
                <div className="flex gap-2 w-100">
                  {/* ----------------------- First Name ----------------------*/}
                  <div className="w-[49%]">
                    <Typography className="text-[#595959] mb-[8px] font-sans">
                      DOB
                    </Typography>
  
                    <Form.Item
                      name="dob"
                      rules={[
                        {
                          required: true,
                          message: "Please input your DOB!",
                        },
                      ]}
                    >
                      <DatePicker placeholder="yyyy/mm/dd" className="w-full p-2 rounded-sm pl-4" prefixIcon={<DatabaseOutlined />} value={selectedDate}
                        onChange={handleDateChange}
                        disabledDate={(current) => current && current > moment().endOf('day')}
                      />
                    </Form.Item>
                  </div>
                  {/* ----------------------------------------------------------- */}
  
                  {/* ----------------------- Gender ----------------------*/}
                  <div className="w-[49%] my-select-container">
                    <Typography className="text-[#595959] mb-[8px] font-sans">
                      Gender
                    </Typography>
  
                    <Form.Item
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: "Please Select your Gender!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Gender"
                        allowClear
                        prefix={
                          <UserOutlined className="site-form-item-icon mr-1 h-8 flex items-center justify-center" />
                        }
                        size="large"
                      >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  {/* ----------------------------------------------------------- */}
                </div>
  
  
  
                {/*-------------------- Phone Number -------------------------- */}
                <Typography className="text-[#595959] mb-[8px] font-sans">
                  Phone No.
                </Typography>
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Phone Number!",
                    },
                    {
                      pattern: new RegExp(/^[6-9]\d{9}$/i),
                      message: "Please Enter a Valid Phone Number",
                    }
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{
                      width: "100%",
                    }}
                    placeholder="Phone No."
                    className="font-sans"
                    onChange={(event) => { setPhoneNo(event.target.value) }}
                    type="text"
                    onKeyDown={handleKeyPress}
                  />
                </Form.Item>
                {/*------------------------------------------------------------ */}
  
                {/*-------------------- Email Id ------------------------------ */}
                <Typography className="text-[#595959] mb-[8px] font-sans">
                  Email ID
                </Typography>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not a valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="mr-1" />}
                    placeholder="Email Address"
                    className="rounded h-10 font-sans"
                    onChange={(event) => setEmailId(event.target.value)}
                  />
                </Form.Item>
  
                <Typography className="text-[#8C8C8C] text-[12px] mb-4 -mt-4 font-sans">
                  Use Corporate Email ID to avail benefits
                </Typography>
                {/*------------------------------------------------------------ */}
  
                {/*-------------------- Password ------------------------------ */}
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
                    {
                      pattern: new RegExp(/.{8,}$/i),
                      message: "Atleast 8 Characters",
                    },
                    {
                      pattern: new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+,\-.:;<=>?@[\\\]^_`{|}~])/g),
                      message: "Should contain number & symbol",
                    },
                    {
                      pattern: new RegExp(
                        /^(?=.*[A-Z])/g
                      ),
                      message: "Must have Atleast One Uppercase",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter Password"
                    prefix={<LockOutlined className="site-form-item-icon mr-1" />}
                    className="h-10 rounded font-sans"
                    minLength={8}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Item>
              </div>
              {/*------------------------------------------------------------ */}
  
              {/*-------------------- SignUp Button ------------------------------ */}
              <div>
                <Form.Item className="">
                  <Button
                    type="default"
                    htmlType="submit"
                    className="login-form-button w-full disabled:bg-[#BFBFBF] h-10 absolute -bottom-2 rounded-sm bg-[#0057A3] font-sans"
                    disabled={
                      firstName === "" ||
                      lastName === "" ||
                      phoneNo === "" ||
                      emailId === "" ||
                      password === ""
                    }
                  >
                    <Typography className="text-white font-sans">
                      Sign Up
                    </Typography>
                  </Button>
                  <Typography className="absolute -bottom-10 lg:-bottom-10 font-semibold font-sans">
                    Already Have an Account?{" "}
                    <span
                      className="ml-1 text-[#0057A3] cursor-pointer font-sans"
                      onClick={() => navigate("/login")}
                    >
                      Log In
                    </span>
                  </Typography>
                </Form.Item>
              </div>
            </div>
            {/*------------------------------------------------------------ */}
          </Form>
          <style jsx>
            {`
            .ant-input {
              padding: 9px 11px;
            }
          `}
          </style>
        </div>
      </div>
  
    );
  };
  
  export default SignUpPage;
  