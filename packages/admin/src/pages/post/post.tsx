import type { GridColDef } from '@material-ui/data-grid'
import { DataGrid } from '@material-ui/data-grid'

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
  return (
    <div style={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  )
}

export default DataGridDemo
