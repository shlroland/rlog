import { SettingTwoTone } from '@ant-design/icons';
import ProForm, {
  DrawerForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { FormInstance } from 'antd';
import { Button } from 'antd';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { useRef } from 'react';
import { initialSettingState } from '..';

type FormRefType<T = Record<string, any>> =
  | (FormInstance & {
      getFieldsFormatValue?: () => T;
    })
  | undefined;

export type FormRefMethods = {
  setDrawerVisit: React.Dispatch<React.SetStateAction<boolean>>;
  formRef: FormRefType;
};

const SettingDrawer = forwardRef<FormRefMethods, Record<string, unknown>>((_props, ref) => {
  const formRef = useRef<FormRefType>();
  const [drawerVisit, setDrawerVisit] = useState(false);

  useImperativeHandle(ref, () => ({
    setDrawerVisit,
    formRef: formRef.current,
    // async validate() {
    //   const result = await formRef.current?.validateFields();
    //   return result;
    // },
    // getFieldsValue: formRef.current?.getFieldsValue,
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
