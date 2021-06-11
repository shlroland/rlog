import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useMutation } from '@apollo/client';
import type { CreateCategoryVar } from './typeDefs';
import { CREATE_CATEGORY } from './typeDefs';

export default () => {
  const [createCategory] = useMutation<{ _id: string }, CreateCategoryVar>(CREATE_CATEGORY);

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
        >
          <ProFormText name="name" label="名称" placeholder="分类名称" />
          <ProFormText name="label" label="代号" placeholder="代号用来标记路由" />
        </ProForm>
      </ProCard>
      <ProCard title="所有分类" headerBordered>
        <div style={{ height: 360 }}>右侧内容</div>
      </ProCard>
    </ProCard>
  );
};
