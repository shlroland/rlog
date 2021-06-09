import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, Button } from 'antd';
import type { FC } from 'react';
import { FormattedMessage, history } from 'umi';
import Container from '../components/Container';
import styles from '../components/index.less';
import { LockOutlined, UserOutlined, BlockOutlined, MailOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import type { RegisterData } from '../typeDefs';
import { REGISTER } from '../typeDefs';
import { omit } from 'lodash';

const RegisterForm: FC = () => {
  const [register, { loading }] = useMutation<RegisterData>(REGISTER, {
    onCompleted(data) {
      if (data.register.id) {
        message.success('注册成功', 1);
        history.goBack();
      }
    },
  });

  return (
    <Container>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          searchConfig: {
            submitText: '注册账号',
          },
          render: (props) => (
            <>
              <Button
                style={{ width: '100%', marginBottom: '16px' }}
                type="primary"
                size="large"
                onClick={() => props?.form?.submit()}
                loading={loading}
              >
                提交
              </Button>
              <Button style={{ width: '100%' }} size="large" onClick={() => history.goBack()}>
                返回
              </Button>
            </>
          ),
        }}
        onFinish={async (values: API.RegisterParams) => {
          await register({ variables: { input: omit(values, ['confirmPassword']) } });
        }}
      >
        <>
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder="用户名"
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
          <ProFormText
            name="email"
            fieldProps={{
              size: 'large',
              prefix: <MailOutlined className={styles.prefixIcon} />,
            }}
            placeholder="电子邮箱"
            rules={[
              {
                type: 'email',
                message: '请输入合法电子邮箱!',
              },
              {
                required: true,
                message: '请输入电子邮箱!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
              {
                min: 6,
                message: '密码必须大于六位',
              },
              {
                max: 20,
                message: '密码必须小于二十位',
              },
            ]}
          />
          <ProFormText.Password
            name="confirmPassword"
            fieldProps={{
              size: 'large',
              prefix: <BlockOutlined className={styles.prefixIcon} />,
            }}
            dependencies={['password']}
            hasFeedback
            placeholder="确认密码"
            rules={[
              {
                required: true,
                message: '请再次确认密码！',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不匹配'));
                },
              }),
            ]}
          />
        </>
      </ProForm>
    </Container>
  );
};

export default RegisterForm;
