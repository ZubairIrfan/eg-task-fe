import React, { useState } from "react";
import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import Logo from "../../../assets/icons/logo";
import { userLogin } from "../../../services/authentication.services";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [isLoading, setLoadingState] = useState(false);
  const navigate = useNavigate();

  const onLogin = (data) => {
    return new Promise((resolve, reject) => {
      return userLogin(data, resolve, reject);
    });
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    setLoadingState(true);
    try {
      await onLogin(values);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  };
  return (
    <div className="auth-components"
    >
      <Logo />
      <Flex align="center" justify="center" vertical>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          disabled={isLoading}
          onFinish={onFinish}
        >
          <h2 className="auth-headings">Welcome Back!</h2>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input valid email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {isLoading ? <LoadingOutlined /> : "Log in"}
            </Button>
            Or{" "}
            <a href="/signup" disabled={isLoading}>
              Register now!
            </a>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
};

export default Login;
