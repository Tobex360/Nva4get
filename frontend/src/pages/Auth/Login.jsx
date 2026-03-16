import React from 'react';
import { Input, Button, Form, Card, Typography, Row, Col, Space } from 'antd';
import { Link } from 'react-router-dom';
import User from "../../assets/user.jpg";
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  LockOutlined 
} from '@ant-design/icons';
import './login.css';

const { Title, Text } = Typography;

function Login() {
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

        <Form layout="vertical" size="large" requiredMark={false}>

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