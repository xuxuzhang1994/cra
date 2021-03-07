import React, { ReactNode } from "react";
import styles from './UserLayout.module.less'

const UserLayout = (props : {children: ReactNode}) => {
  const {
    children,
  } = props;
  return (
    <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <a href="/">
                <img alt="logo" className={styles.logo} src="https://iconfont.alicdn.com/t/4eab84c9-630f-4778-9473-6c9d3948e41b.png" />
                <span className={styles.title}>Ant Design</span>
              </a>
            </div>
            <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
          </div>
          {children}
        </div>
      </div>
  );
};

export default UserLayout
