import { getRandomColor } from '@/utils/colors';
import { CloseOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useMutation, useQuery } from '@apollo/client';
import type { FormInstance } from 'antd';
import { Popconfirm, Space, Tag } from 'antd';
import { useRef } from 'react';
import type { CreateCategoryVar, ListCategoryResult } from './typeDefs';
import { DELETE_CATEGORY } from './typeDefs';
import { LIST_CATEGORY } from './typeDefs';
import { CREATE_CATEGORY } from './typeDefs';

export default () => {
  const formRef = useRef<FormInstance>();
  const { data, refetch } = useQuery<ListCategoryResult>(LIST_CATEGORY, {
    fetchPolicy: 'network-only',
  });
  const [createCategory] = useMutation<{ _id: string }, CreateCategoryVar>(CREATE_CATEGORY, {
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

  return (
    <ProCard split="vertical">
      <ProCard title="管理分类" colSpan="30%" headerBordered>
        <ProForm<{
          name: string;
          label: string;
        }>
          onFinish={async (params) => {
            createCategory({
              variables: {
                input: params,
              },
            });
          }}
          formRef={formRef}
        >
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
                  {`${category.name}  `}
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
