import { useQuery } from '@apollo/client'
import type { GridColDef } from '@material-ui/data-grid'
import { DataGrid } from '@material-ui/data-grid'
import { useState } from 'react'
import type { PostItem, PostListResult, PostListVar } from './typeDefs'
import { POST_LIST } from './typeDefs'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 120 },
  {
    field: 'articleStatus',
    headerName: '状态',
    width: 150,
  },
  {
    field: 'category',
    headerName: '分类',
  },
  {
    field: 'tags',
    headerName: '标签',
    width: 110,
  },
  {
    field: 'updatedAt',
    headerName: '更新时间',
    // description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    width: 160,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.getValue(params.id, 'firstName') || ''} ${
    //     params.getValue(params.id, 'lastName') || ''
    //   }`,
  },
  {
    headerName: '发布时间',
    field: 'createdAt',
    width: 200,
  },
]

const rows = [
  {
    id: 1,
    title: 'Snow',
    articleStatus: 'Jon',
    category: 35,
    tags: 'tags',
    updatedAt: '2020-06-12',
    createdAt: '2020-07-01',
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
