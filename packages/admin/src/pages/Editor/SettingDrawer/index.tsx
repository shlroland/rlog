import type { ListCategoryResult } from '@/pages/Category/typeDefs';
import { LIST_CATEGORY } from '@/pages/Category/typeDefs';
import type { ListTagResult } from '@/pages/Tag/typeDefs';
import { LIST_TAG } from '@/pages/Tag/typeDefs';
import { SettingTwoTone } from '@ant-design/icons';
import ProForm, {
  DrawerForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useQuery } from '@apollo/client';
import type { FormInstance } from 'antd';
import { Button } from 'antd';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { useRef } from 'react';

interface InitialSettingStateProp {
  excerpt: string;
  isRecommended: boolean;
  isCommentable: boolean;
  category: string;
  tags: string[];
}

export const initialSettingState = {
  excerpt: '',
  isRecommended: false,
  isCommentable: false,
  category: '',
  tags: [],
};

type FormRefType =
  | (FormInstance & {
      getFieldsFormatValue?: () => InitialSettingStateProp;
    })
  | undefined;

export type FormRefMethods = {
  setDrawerVisit: React.Dispatch<React.SetStateAction<boolean>>;
  formRef: FormRefType;
};

const SettingDrawer = forwardRef<FormRefMethods, Record<string, unknown>>((_props, ref) => {
  const formRef = useRef<FormRefType>();
  const [drawerVisit, setDrawerVisit] = useState(false);

  const { data: categoryData } = useQuery<ListCategoryResult>(LIST_CATEGORY);
  const { data: tagData } = useQuery<ListTagResult>(LIST_TAG);

  useImperativeHandle(ref, () => ({
    setDrawerVisit,
    formRef: formRef.current,
  }));
  return (
    <DrawerForm<InitialSettingStateProp>
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
        name="category"
        label="分类"
        options={categoryData?.getCategories.map((category) => ({
          label: category.name,
          value: category._id,
        }))}
        rules={[{ required: true, message: '请输入选择标签' }]}
      ></ProFormSelect>
      <ProFormSelect
        width="lg"
        mode="multiple"
        options={tagData?.getTags.map((tag) => ({
          label: tag.name,
          value: tag._id,
        }))}
        name="tags"
        label="标签"
        rules={[{ required: true, message: '请输入选择标签' }]}
      />
      {/* <ProForm.Item name="imageUrl" label="封面图片"></ProForm.Item> */}
    </DrawerForm>
  );
});

export default SettingDrawer;
