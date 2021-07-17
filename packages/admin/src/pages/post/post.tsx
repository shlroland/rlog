import { useQuery } from '@apollo/client'
import { Button, Chip } from '@material-ui/core'
import type { GridColDef, GridCellParams } from '@material-ui/data-grid'
import { DataGrid } from '@material-ui/data-grid'
import dayjs from 'dayjs'
import { useState } from 'react'
import type { PostItem, PostListResult, PostListVar } from './typeDefs'
import { POST_LIST } from './typeDefs'

interface CategoryTagType {
  name: string
}

const renderCategory = ({ value }: GridCellParams) => {
  const name = (value as CategoryTagType).name
  return <Chip label={name} />
}

const renderStatus = ({ value }: GridCellParams) => {
  let label = ''
  let color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning' = 'default'
  switch (value) {
    case 'draft':
      label = '草稿'
      color = 'info'
      break
    case 'released':
      label = '已发布'
      color = 'success'
      break
    case 'hidden':
      label = '已隐藏'
      color = 'default'
      break
    default:
      break
  }
  return <Chip label={label} color={color} />
}

const renderTags = ({ value }: GridCellParams) => {
  const tags = value as CategoryTagType[]
  return (
    <>
      {tags.map((tag) => (
        <Chip label={tag.name} key={tag.name} />
      ))}
    </>
  )
}

const columns: GridColDef[] = [
  { headerName: '标题', field: 'title', flex: 2 },
  {
    field: 'articleStatus',
    headerName: '状态',
    width: 120,
    renderCell: (cell) => renderStatus(cell),
  },
  {
    field: 'category',
    headerName: '分类',
    width: 120,
    renderCell: (cell) => renderCategory(cell),
  },
  {
    field: 'tags',
    headerName: '标签',
    flex: 1,
    renderCell: (cell) => renderTags(cell),
  },
  {
    field: 'updatedAt',
    headerName: '更新时间',
    valueFormatter: ({ value }) => {
      return dayjs(value as string).format('YYYY-MM-DD HH:mm:ss')
    },
    width: 200,
  },
  {
    headerName: '发布时间',
    field: 'createdAt',
    width: 200,
    valueFormatter: ({ value }) => {
      return dayjs(value as string).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  {
    headerName: '操作',
    field: 'option',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    sortable: false,
    renderCell: function Option() {
      return (
        <>
          <Button variant="text">编辑</Button>
          <Button variant="text" color="error">
            删除
          </Button>
        </>
      )
    },
  },
]

const DataGridDemo = () => {
  const [pageState, setPageState] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })

  const { data, loading, refetch } = useQuery<PostListResult, PostListVar>(POST_LIST, {
    variables: {
      input: {
        current: pageState.current,
        pageSize: pageState.pageSize,
      },
    },
    onCompleted({ getPosts: { current, pageSize, total } }) {
      setPageState((preState) => {
        return { ...preState, current, pageSize, total }
      })
    },
  })
  return (
    <div style={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
      <DataGrid
        loading={loading}
        rows={data?.getPosts.items ?? []}
        columns={columns}
        page={pageState.current}
        pageSize={pageState.pageSize}
        getRowId={(row) => row._id}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  )
}

export default DataGridDemo
