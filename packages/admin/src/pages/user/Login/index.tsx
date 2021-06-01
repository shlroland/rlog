import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { FC } from 'react';
import { useState } from 'react';
import { useIntl, FormattedMessage, Link, useModel, history } from 'umi';
import type { LoginData } from '../typeDefs';
import { LOGIN } from '../typeDefs';
import { useLazyQuery } from '@apollo/client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message, Alert } from 'antd';
import styles from '../components/index.less';
import Container from '../components/Container';
import { saveToken, saveUserId } from '@/utils/storage';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const LoginForm: FC = () => {
  const intl = useIntl();
  const [userLoginState] = useState<API.LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');

  const [loginMutate, { loading }] = useLazyQuery<LoginData>(LOGIN, {
    errorPolicy: 'none',
    fetchPolicy: 'no-cache',
    onError() {
      const defaultloginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });

      message.error(defaultloginFailureMessage);
    },
    onCompleted({ login }) {
      const { authorization, userId } = login;
      saveToken(authorization);
      saveUserId(userId);
      setInitialState({
        ...initialState,
        currentUser: userId,
      });
      goto();
    },
  });
  const { status } = userLoginState;

  return (
    <Container>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          searchConfig: {
            submitText: intl.formatMessage({
              id: 'pages.login.submit',
              defaultMessage: '登录',
            }),
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={async (values: API.LoginParams) => {
          await loginMutate({
            variables: { input: { ...values } },
          });
        }}
      >
        {status === 'error' && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: '账户或密码错误（admin/ant.design)',
            })}
          />
        )}

        <>
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.username.placeholder',
              defaultMessage: '用户名: admin or user',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.username.required"
                    defaultMessage="请输入用户名!"
                  />
                ),
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.password.placeholder',
              defaultMessage: '密码: ant.design',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.password.required"
                    defaultMessage="请输入密码！"
                  />
                ),
              },
            ]}
          />
        </>
        <div
          style={{
            marginBottom: 24,
            overflow: 'hidden',
          }}
        >
          <Link
            to="/user/register"
            style={{
              float: 'left',
            }}
          >
            <span>注册账号</span>
          </Link>
          <a
            style={{
              float: 'right',
            }}
          >
            <FormattedMessage id="pages.login.forgotPassword" defaultMessage="Forget password" />
          </a>
        </div>
      </ProForm>
      {/* <Space className={styles.other}>
    <FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式" />
    <AlipayCircleOutlined className={styles.icon} />
    <TaobaoCircleOutlined className={styles.icon} />
    <WeiboCircleOutlined className={styles.icon} />
  </Space> */}
    </Container>
  );
};

export default LoginForm;
