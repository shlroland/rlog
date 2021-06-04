import { SettingTwoTone } from '@ant-design/icons';
import ProForm, {
  DrawerForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Button, message } from 'antd';
import type { FC } from 'react';
import { useRef } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const SettingDrawer: FC = () => {
  const formRef = useRef();
  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      title="文章设置"
      formRef={formRef}
      trigger={<Button icon={<SettingTwoTone />}>设置</Button>}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <ProFormTextArea name="excerpt" label="文章摘要" />
      <ProForm.Group>
        <ProFormSwitch width="md" name="isRecommended" label="首页推荐" />
        <ProFormSwitch width="md" name="isCommentable" label="开启评论" />
      </ProForm.Group>

      <ProFormSelect
        width="lg"
        options={[
          {
            value: 'chapter',
            label: '盖章后生效',
          },
        ]}
        name="category"
        label="分类"
      />
      <ProFormSelect
        width="lg"
        mode="multiple"
        options={[
          {
            value: 'time',
            label: '履行完终止',
          },
        ]}
        name="tags"
        label="标签"
      />
      <ProForm.Item name="imageUrl" label="封面图片"></ProForm.Item>
    </DrawerForm>
  );
};

export default SettingDrawer;
