import { Form, Input, Button, Alert, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.module.less'
import { useAuth } from '../../context/auth-context';
import { useAsync } from '../../custom/use-asynnc';

interface FormData {
  username: string,
  password: string
}

const Login = () => {
  const [err, setErr] = useState('')
  const { login, isFetching } = useAuth()
  const { isLoading, data } = useAsync()
  const onFinish = (values: FormData) => {
    login(values).then(() => {
      message.success('登录成功')
    }).catch(err => {
      setErr(err)
    })
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.main}>
      {
        err && <Alert message={err} type="error" showIcon style={{marginBottom: 20}} />
      }
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名！',
            },
          ]}
        >
          <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        >
          <Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item>
          <Button loading={isFetching} size="large" type="primary" htmlType="submit" style={{ width: '100%' }}>
            登录
        </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login