import { Layout, Menu, Breadcrumb, Tooltip } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './index.module.less'
import { useAuth } from '../context/auth-context';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout


const BasicLayout = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth()
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left}>
                    <img className={styles.logo} src="https://iconfont.alicdn.com/t/4eab84c9-630f-4778-9473-6c9d3948e41b.png" alt="" />
                    <div className={styles.item}>夕阳红白名单Manage</div>
                </div>
                <div className={styles.right}>
                    <a className={styles.item}>Hi, {user?.username}
                        <Tooltip color="#87d068" placement="bottom" title='退出登录'>
                            <PoweroffOutlined style={{ marginLeft: 10 }} />
                        </Tooltip>
                    </a>
                </div>
            </Header>
            {/* <Layout> */}
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
            >
                {children}
            </Content>
            {/* </Layout> */}
        </Layout>
    )
}


export default BasicLayout