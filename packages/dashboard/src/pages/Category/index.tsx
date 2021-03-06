import { getRandomColor } from '@/utils/colors';
import { CloseOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useMutation, useQuery } from '@apollo/client';
import type { FormInstance } from 'antd';
import { Popconfirm, Space, Tag } from 'antd';
import { useRef } from 'react';
import type { CategoryItem, UpsertCategoryVar, ListCategoryResult } from './typeDefs';
import { DELETE_CATEGORY } from './typeDefs';
import { LIST_CATEGORY } from './typeDefs';
import { UPSERT_CATEGORY } from './typeDefs';

export default () => {
  const formRef = useRef<FormInstance>();
  const { data, refetch } = useQuery<ListCategoryResult>(LIST_CATEGORY, {
    fetchPolicy: 'network-only',
  });
  const [upsertCategory] = useMutation<{ _id: string }, UpsertCategoryVar>(UPSERT_CATEGORY, {
    async onCompleted() {
      await refetch();
      formRef.current?.resetFields();
    },
  });
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted() {
      refetch();
    },
  });

  const handleChooseTag = (category: CategoryItem) => {
    formRef.current?.setFields([{ name: '_id', value: category._id }]);
    formRef.current?.setFieldsValue({ ...category });
  };

  return (
    <ProCard split="vertical">
      <ProCard title="管理分类" colSpan="30%" headerBordered>
        <ProForm<{
          _id: string;
          name: string;
          label: string;
        }>
          onFinish={async (params) => {
            upsertCategory({
              variables: {
                input: params,
              },
            });
          }}
          formRef={formRef}
        >
          <ProFormText name="_id" label="ID" placeholder="ID" hidden />
          <ProFormText name="name" label="名称" placeholder="分类名称" />
          <ProFormText name="label" label="代号" placeholder="代号用来标记路由" />
        </ProForm>
      </ProCard>
      <ProCard title="所有分类" headerBordered>
        <Space>
          {data &&
            data.getCategories.map((category) => {
              return (
                <Tag color={getRandomColor(category.name)} key={category._id}>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleChooseTag(category)}
                  >{`${category.name}`}</span>
                  <Popconfirm
                    placement="top"
                    title={`确定删除${category.name}标签`}
                    onConfirm={() => {
                      deleteCategory({
                        variables: {
                          id: category._id,
                        },
                      });
                    }}
                    okText="删除"
                    cancelText="取消"
                  >
                    <CloseOutlined style={{ cursor: 'pointer' }} />
                  </Popconfirm>
                </Tag>
              );
            })}
        </Space>
      </ProCard>
    </ProCard>
  );
};
