import { getRandomColor } from '@/utils/colors';
import { CloseOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useMutation, useQuery } from '@apollo/client';
import type { FormInstance } from 'antd';
import { Popconfirm, Space, Tag } from 'antd';
import { useRef } from 'react';
import type { TagItem, UpsertTagVar, ListTagResult } from './typeDefs';
import { DELETE_TAG } from './typeDefs';
import { LIST_TAG } from './typeDefs';
import { UPSERT_TAG } from './typeDefs';

export default () => {
  const formRef = useRef<FormInstance>();
  const { data, refetch } = useQuery<ListTagResult>(LIST_TAG, {
    fetchPolicy: 'network-only',
  });
  const [upsertTag] = useMutation<{ _id: string }, UpsertTagVar>(UPSERT_TAG, {
    async onCompleted() {
      await refetch();
      formRef.current?.resetFields();
    },
  });
  const [deleteTag] = useMutation(DELETE_TAG, {
    onCompleted() {
      refetch();
    },
  });

  const handleChooseTag = (tag: TagItem) => {
    formRef.current?.setFields([{ name: '_id', value: tag._id }]);
    formRef.current?.setFieldsValue({ ...tag });
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
            upsertTag({
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
      <ProCard title="所有便签" headerBordered>
        <Space>
          {data &&
            data.getTags.map((tag) => {
              return (
                <Tag color={getRandomColor(tag.name)} key={tag._id}>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleChooseTag(tag)}
                  >{`${tag.name}`}</span>
                  <Popconfirm
                    placement="top"
                    title={`确定删除${tag.name}标签`}
                    onConfirm={() => {
                      deleteTag({
                        variables: {
                          id: tag._id,
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
