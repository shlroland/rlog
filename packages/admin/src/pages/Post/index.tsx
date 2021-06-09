import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, Link } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { removeRule } from '@/services/ant-design-pro/api';
import { getRandomColor } from '@/utils/colors';
import { useQuery } from '@apollo/client';
import type { PostListResult, PostListVar } from './typeDefs';
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
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  // const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [, handleUpdateModalVisible] = useState<boolean>(false);

  const [, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);

  const [pageState, setPageState] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { data, loading } = useQuery<PostListResult, PostListVar>(POST_LIST, {
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

  /** 国际化配置 */
  const intl = useIntl();

  const columns: ProColumns[] = [
    {
      title: '标题',
      dataIndex: 'title',
      fixed: 'left',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
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
      width: 200,
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
      title: '发布时间',
      sorter: true,
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
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.config" defaultMessage="配置" />
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          <FormattedMessage id="pages.searchTable.subscribeAlert" defaultMessage="订阅警报" />
        </a>,
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
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              {/* <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="服务调用次数总计"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span> */}
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除" />
          </Button>
          <Button type="primary">
            <FormattedMessage id="pages.searchTable.batchApproval" defaultMessage="批量审批" />
          </Button>
        </FooterToolbar>
      )}
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
