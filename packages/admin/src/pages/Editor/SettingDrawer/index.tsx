import { SettingTwoTone } from '@ant-design/icons';
import ProForm, {
  DrawerForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { FormInstance } from 'antd';
import { Button, message } from 'antd';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { useRef } from 'react';
import { initialSettingState } from '..';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type FormRefType<T = Record<string, any>> =
  | (FormInstance & {
      getFieldsFormatValue?: () => T;
    })
  | undefined;

export type FormRefMethods = {
  setDrawerVisit: React.Dispatch<React.SetStateAction<boolean>>;
  validate: () => Promise<any>;
};

const SettingDrawer = forwardRef<FormRefMethods, Record<string, unknown>>((_props, ref) => {
  const formRef = useRef<FormRefType>();
  const [drawerVisit, setDrawerVisit] = useState(false);

  useImperativeHandle(ref, () => ({
    setDrawerVisit,
    async validate() {
      const result = await formRef.current?.validateFields();
      return result;
    },
  }));
  return (
    <DrawerForm
      width={500}
      title="文章设置"
      formRef={formRef}
      visible={drawerVisit}
      trigger={
        <Button icon={<SettingTwoTone />} onClick={() => setDrawerVisit(true)}>
          设置
        </Button>
      }
      drawerProps={{
        forceRender: true,
      }}
      submitter={{
        render: (props) => <Button onClick={() => props.form?.resetFields()}>重置</Button>,
      }}
      initialValues={initialSettingState}
      onVisibleChange={setDrawerVisit}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        console.log(formRef.current);
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <ProFormTextArea
        name="excerpt"
        label="文章摘要"
        rules={[{ required: true, message: '请输入文章摘要' }]}
      />
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
        rules={[{ required: true, message: '请输入选择标签' }]}
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
        rules={[{ required: true, message: '请输入选择标签' }]}
      />
      {/* <ProForm.Item name="imageUrl" label="封面图片"></ProForm.Item> */}
    </DrawerForm>
  );
});

export default SettingDrawer;
