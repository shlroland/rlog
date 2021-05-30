import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { FC } from 'react';
import { useState } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { LOGIN } from './typeDefs';
import { useMutation } from '@apollo/client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message, Alert } from 'antd';
import styles from './index.less';

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

const LoginForm: FC = () => {
  const intl = useIntl();
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState] = useState<API.LoginResult>({});
  const [loginMutate] = useMutation(LOGIN);
  const { status } = userLoginState;

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);
    try {
      // 登录
      const result = await loginMutate({
        variables: { input: { ...values } },
      });
      console.log(result);
      // const msg = await login({ ...values, type });

      // if (msg.status === 'ok') {
      //   const defaultloginSuccessMessage = intl.formatMessage({
      //     id: 'pages.login.success',
      //     defaultMessage: '登录成功！',
      //   });
      //   message.success(defaultloginSuccessMessage);
      //   // await fetchUserInfo();
      //   // goto();
      //   return;
      // }
      // 如果失败去设置用户错误信息
      // setUserLoginState(msg);
    } catch (error) {
      console.log(error);
      const defaultloginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });

      message.error(defaultloginFailureMessage);
    }
    setSubmitting(false);
  };

  return (
    <>
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
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={async (values) => {
          handleSubmit(values as API.LoginParams);
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
      </ProForm>
      {/* <Space className={styles.other}>
    <FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式" />
    <AlipayCircleOutlined className={styles.icon} />
    <TaobaoCircleOutlined className={styles.icon} />
    <WeiboCircleOutlined className={styles.icon} />
  </Space> */}
    </>
  );
};

export default LoginForm;
