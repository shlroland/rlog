import React from 'react';
import { useIntl, Link, SelectLang } from 'umi';
import styles from './index.less';

const Login: React.FC = ({ children }) => {
  const intl = useIntl();

  return (
    <div className={styles.container}>
      <div className={styles.lang}>{SelectLang && <SelectLang />}</div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>Ant Design</span>
            </Link>
          </div>
          <div className={styles.desc}>
            {intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          </div>
        </div>

        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
};

export default Login;
