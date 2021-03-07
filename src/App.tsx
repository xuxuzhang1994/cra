import React from 'react';
import logo from './logo.svg';
import WhiteList from './pages/white-list/index'
import Login from './pages/login/index'
import BasicLayout from './layout/BaseLayout'
import UserLayout from './layout/UserLayout'

import './App.css';
import { useAuth } from './context/auth-context';
import { useCount } from './custom/use-asynnc';
import { Spin } from 'antd';

function App() {
  const { user, isFetching } = useAuth()
  if(isFetching){
    return <Spin size="large" spinning={isFetching}>
      <div style={{height: '100vh'}}></div>
    </Spin>
  }
  return (
    <div className="App">
      {
        user ? <BasicLayout>
          <WhiteList/> 
        </BasicLayout> : <UserLayout><Login/></UserLayout>
      }
      
    </div>
  );
}

export default App;
