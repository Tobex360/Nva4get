import React, { useState } from 'react';
import { Input, Button, message, Form, Card, Typography, Row, Col, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import User from "../../assets/user.jpg";
import AuthServices from '../../services/authservices';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  LockOutlined 
} from '@ant-design/icons';
import './login.css';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const { Title, Text } = Typography;

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

  const handleSubmit = async (values) => {
  console.log("Form values being sent:", values);
  setLoading(true);
  try {
    const response = await AuthServices.loginUser(values);
    localStorage.setItem('user', JSON.stringify(response.data));
    window.dispatchEvent(new Event('authChange'));
    message.success("User logged in successfully");
    navigate('/todo');
  } catch(err) {
    console.log(err);
    message.error("Invalid username or password"); // ✅ also add this
  } finally {
    setLoading(false);
  }
}

const handleGoogleSuccess = async (credentialResponse) => {
  try {
    console.log("Google response:", credentialResponse);

    // Send token to backend
    const res = await axios.post(
      `${API_URL}/user/google-login`,
      {
        token: credentialResponse.credential
      }
    );

    localStorage.setItem("user", JSON.stringify(res.data));
    message.success("Google login successful");
    navigate("/todo");

  } catch (err) {
    console.log(err);
    message.error("Google login failed");
  }
};




  return (
    <div className="login-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <Card 
        className="auth-card register-card" 
        style={{ maxWidth: 500, width: '100%', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
      >
        {/* Header Section with Centered Image */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              overflow: 'hidden', 
              border: '3px solid #E9762B' // Using your brand color
            }}>
              <img 
                src={User} 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>
          <Title level={3} style={{ marginBottom: '4px' }}>Login</Title>
          <Text type="secondary">View your Lists</Text>
        </div>

        <Form layout="vertical" size="large" requiredMark={false} onFinish={handleSubmit}>

          <Form.Item name="username" rules={[{ required: true, message: 'Username is required' }]}>
            <Input prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} placeholder="Username" style={{ borderRadius: '8px' }} />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Password is required' }]}>
            <Input.Password prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} placeholder="Password" style={{ borderRadius: '8px' }} />
          </Form.Item>

          <Form.Item style={{ marginBottom: '16px' }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              loading={loading}
              style={{ 
                height: '50px', 
                borderRadius: '8px', 
                fontWeight: 'bold', 
                fontSize: '16px',
                background: '#E9762B',
                border: 'none'
              }}
            >
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => message.error("Google Login Failed")}
                theme="outline"
                size="large"
                text="signin_with"
              />
            </div>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
              Dont have an account? <Link to="/register" style={{ color: '#E9762B', fontWeight: '600' }}>Register</Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Login;