import React, { useState } from "react";
import { Button, Flex, Form, Input } from "antd";
import Logo from "../../../assets/icons/logo";
import { userSignup } from "../../../services/authentication.services";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form] = Form.useForm();
  const [isLoading, setLoadingState] = useState(false);
  const navigate = useNavigate()

  const onFinish = async (values) => {
    setLoadingState(true);
    try {
      await onSignup(values);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }

  };

  const onSignup = (data) => {
    return new Promise((resolve, reject) => {
      return userSignup(data, resolve, reject);
    });
  };

  return (
    <div className="auth-components"
    >
      <Logo />
      <Flex align="center" justify="center" vertical>
        <Form
          form={form}
          name="register"
          className="signup-form"
          onFinish={onFinish}
          scrollToFirstError
          disabled={isLoading}
        >
          <h2 className="auth-headings">Welcome!</h2>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Full name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Please input valid email!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="E-mail" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:'"\\|,.<>?`~])(?=.*[^\w\d\s]).{8,}$/,
                message:
                  "Password must contain at least 1 letter, 1 number, 1 special character, and minimum length of 8 characters",
              },
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              Register
            </Button>
            Or{" "}
            <a href="/login" disabled={isLoading}>
              Already have account? Login!
            </a>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
};
export default Signup;
