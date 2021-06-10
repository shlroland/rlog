import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, Link } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getRandomColor } from '@/utils/colors';
import { useMutation, useQuery } from '@apollo/client';
import type { DeletePostResult, PostItem, PostListResult, PostListVar } from './typeDefs';
import { DELETE_ONE_POST } from './typeDefs';
import { POST_LIST } from './typeDefs';

/**
 * 添加节点
 *
 * @param fields
 */
// const handleAdd = async (fields: API.RuleListItem) => {
//   const hide = message.loading('正在添加');
//   try {
//     await addRule({ ...fields });
//     hide();
//     message.success('添加成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('添加失败请重试！');
//     return false;
//   }
// };

/**
 * 更新节点
 *
 * @param fields
 */
// const handleUpdate = async (fields: FormValueType) => {
//   const hide = message.loading('正在配置');
//   try {
//     await updateRule({
//       name: fields.name,
//       desc: fields.desc,
//       key: fields.key,
//     });
//     hide();

//     message.success('配置成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('配置失败请重试！');
//     return false;
//   }
// };

/**
 * 删除节点
 *
 * @param selectedRows
 */
// const handleRemove = async (selectedRows: API.RuleListItem[]) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     await removeRule({
//       key: selectedRows.map((row) => row.key),
//     });
//     hide();
//     message.success('删除成功，即将刷新');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('删除失败，请重试');
//     return false;
//   }
// };

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [pageState, setPageState] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const {
    data,
    loading,
    fetchMore: fetchListMore,
  } = useQuery<PostListResult, PostListVar>(POST_LIST, {
    variables: {
      input: {
        current: pageState.current,
        pageSize: pageState.pageSize,
      },
    },
    onCompleted({ getPosts: { current, pageSize, total } }) {
      setPageState((preState) => {
        return { ...preState, current, pageSize, total };
      });
    },
  });

  const [deletePostById, { loading: isDeleting }] = useMutation<DeletePostResult, { id: string }>(
    DELETE_ONE_POST,
    {
      onCompleted() {
        message.success('删除成功');
        fetchListMore({
          variables: {
            current: pageState.current,
            pageSize: pageState.pageSize,
          },
        });
      },
    },
  );

  /** 国际化配置 */
  const intl = useIntl();

  const columns: ProColumns<PostItem>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      fixed: 'left',
      render: (dom, entity) => {
        return (
          <Link to={`/editor/${entity._id}`} target="_blank">
            {dom}
          </Link>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'articleStatus',
      width: 120,
      valueEnum: {
        draft: {
          text: '草稿',
          status: 'Processing',
        },
        released: {
          text: '已发布',
          status: 'Success',
        },
        hidden: {
          text: '已隐藏',
          status: 'Error',
        },
      },
    },
    {
      title: '分类',
      key: 'category',
      dataIndex: 'category',
      width: 100,
      render: (category) =>
        category ? <Tag color={getRandomColor(category as string)}>{category}</Tag> : null,
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render() {
        return (
          <div>
            {/* {tags
              ? tags.map((tag) => {
                  return <Tag>{tag}</Tag>;
                })
              : null} */}
          </div>
        );
      },
    },
    // {
    //   title: <FormattedMessage id="pages.searchTable.titleCallNo" defaultMessage="服务调用次数" />,
    //   dataIndex: 'callNo',
    //   sorter: true,
    //   hideInForm: true,
    //   renderText: (val: string) =>
    //     `${val}${intl.formatMessage({
    //       id: 'pages.searchTable.tenThousand',
    //       defaultMessage: ' 万 ',
    //     })}`,
    // },
    // {
    //   title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="状态" />,
    //   dataIndex: 'status',
    //   hideInForm: true,
    //   valueEnum: {
    //     0: {
    //       text: (
    //         <FormattedMessage id="pages.searchTable.nameStatus.default" defaultMessage="关闭" />
    //       ),
    //       status: 'Default',
    //     },
    //     1: {
    //       text: (
    //         <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="运行中" />
    //       ),
    //       status: 'Processing',
    //     },
    //     2: {
    //       text: (
    //         <FormattedMessage id="pages.searchTable.nameStatus.online" defaultMessage="已上线" />
    //       ),
    //       status: 'Success',
    //     },
    //     3: {
    //       text: (
    //         <FormattedMessage id="pages.searchTable.nameStatus.abnormal" defaultMessage="异常" />
    //       ),
    //       status: 'Error',
    //     },
    //   },
    // },
    {
      title: '更新时间',
      sorter: true,
      width: 200,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      // renderFormItem: (item, { defaultRender, ...rest }, form) => {
      //   const status = form.getFieldValue('status');
      //   if (`${status}` === '0') {
      //     return false;
      //   }
      //   if (`${status}` === '3') {
      //     return (
      //       <Input
      //         {...rest}
      //         placeholder={intl.formatMessage({
      //           id: 'pages.searchTable.exception',
      //           defaultMessage: '请输入异常原因！',
      //         })}
      //       />
      //     );
      //   }
      //   return defaultRender(item);
      // },
    },
    {
      title: '发布时间',
      sorter: true,
      width: 200,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      // renderFormItem: (item, { defaultRender, ...rest }, form) => {
      //   const status = form.getFieldValue('status');
      //   if (`${status}` === '0') {
      //     return false;
      //   }
      //   if (`${status}` === '3') {
      //     return (
      //       <Input
      //         {...rest}
      //         placeholder={intl.formatMessage({
      //           id: 'pages.searchTable.exception',
      //           defaultMessage: '请输入异常原因！',
      //         })}
      //       />
      //     );
      //   }
      //   return defaultRender(item);
      // },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      width: 200,
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => [
        <Button type="link" key="edit">
          <Link to={`/editor/${record._id}`} target="_blank">
            编辑
          </Link>
        </Button>,
        <Popconfirm
          key="deleteConfirm"
          placement="top"
          title={`确定将${record.title || '无标题'}删除吗`}
          onConfirm={() => deletePostById({ variables: { id: record._id } })}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger key="delete" loading={isDeleting}>
            删除
          </Button>{' '}
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: '查询表格',
        })}
        actionRef={actionRef}
        rowKey="_id"
        search={{
          labelWidth: 120,
        }}
        loading={loading}
        pagination={{
          current: pageState.current,
          pageSize: pageState.pageSize,
          total: pageState.total,
        }}
        dataSource={data?.getPosts.items}
        toolBarRender={() => [
          <Button type="primary" key="primary">
            <Link to="/editor" target="_blank">
              <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
            </Link>
          </Button>,
        ]}
        columns={columns}
      />
      {/* <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: '新建规则',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="规则名称为必填项"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm> */}
      {/* <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      /> */}

      {/* <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer> */}
    </PageContainer>
  );
};

export default TableList;
