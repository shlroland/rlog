import {
  Button,
  Drawer,
  TextField,
  Select,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormControl,
  Stack,
  MenuItem,
  InputLabel,
} from '@material-ui/core'
import { forwardRef, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import SettingsIcon from '@material-ui/icons/Settings'
import useStyles from './styles'
import { useQuery } from '@apollo/client'
import type { ListCategoryResult } from '../categories/typeDefs'
import { LIST_CATEGORY } from '../categories/typeDefs'
import type { ListTagResult } from '../tags/typeDefs'
import { LIST_TAG } from '../tags/typeDefs'
interface InitialSettingStateProp {
  excerpt: string
  isRecommended: boolean
  isCommentable: boolean
  category: string
  tags: string[]
}

export const initialSettingState = {
  excerpt: '',
  isRecommended: false,
  isCommentable: false,
  category: '',
  tags: [],
}

type FormRefType =
  | {
      getFieldsFormatValue?: () => InitialSettingStateProp
    }
  | undefined

export type FormRefMethods = {
  setDrawerVisit: React.Dispatch<React.SetStateAction<boolean>>
  formRef: FormRefType
}

const SettingDrawer = forwardRef<FormRefMethods, Record<string, unknown>>(
  (_props, ref) => {
    const formRef = useRef<FormRefType>()
    const [drawerVisit, setDrawerVisit] = useState(false)
    const classes = useStyles()

    const { data: categoryData } = useQuery<ListCategoryResult>(LIST_CATEGORY)
    const { data: tagData } = useQuery<ListTagResult>(LIST_TAG)

    const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setDrawerVisit(open)
    }

    const { handleSubmit, control } = useForm<InitialSettingStateProp>({
      defaultValues: {
        ...initialSettingState,
      },
    })

    const onSubmit = (data: InitialSettingStateProp) => {
      console.log(data)
    }

    return (
      <>
        <Button
          color="inherit"
          startIcon={<SettingsIcon />}
          onClick={() => setDrawerVisit(true)}>
          设置
        </Button>
        <Drawer
          anchor="right"
          open={drawerVisit}
          ModalProps={{
            keepMounted: true,
          }}
          onClose={toggleDrawer(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.settingDrawer}>
              <Stack spacing={4}>
                <Controller
                  name="excerpt"
                  control={control}
                  rules={{
                    required: '请输入文章摘要!',
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      id="excerpt"
                      label="文章摘要*"
                      variant="standard"
                      fullWidth
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      size="medium"
                    />
                  )}
                />
                <div className={classes.settingFormGroup}>
                  <Controller
                    control={control}
                    name="isRecommended"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <FormControl error={!!error} variant="standard">
                        <FormControlLabel
                          label="首页推荐"
                          checked={value}
                          control={
                            <Checkbox
                              id="isRecommended"
                              checked={value}
                              onChange={onChange}
                            />
                          }
                        />
                        <FormHelperText>{error ? error.message : null}</FormHelperText>
                      </FormControl>
                    )}
                  />
                  <Controller
                    control={control}
                    name="isCommentable"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <FormControl error={!!error} variant="standard">
                        <FormControlLabel
                          label="开启评论"
                          checked={value}
                          control={
                            <Checkbox
                              id="isCommentable"
                              checked={value}
                              onChange={onChange}
                            />
                          }
                        />
                        <FormHelperText>{error ? error.message : null}</FormHelperText>
                      </FormControl>
                    )}
                  />
                </div>
                <Controller
                  name="category"
                  control={control}
                  rules={{
                    required: '请选择分类!',
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <FormControl error={!!error}>
                      <InputLabel id="category-label">分类</InputLabel>
                      <Select
                        id="category"
                        label="分类"
                        value={value}
                        onChange={onChange}>
                        {categoryData?.getCategories.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.name}
                          </MenuItem>
                        ))}
                        <FormHelperText>{error ? error.message : null}</FormHelperText>
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  name="tags"
                  control={control}
                  rules={{
                    required: '请选择标签!',
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <FormControl error={!!error}>
                      <InputLabel id="tags-label">标签</InputLabel>
                      <Select
                        id="tags"
                        label="标签"
                        multiple
                        value={value}
                        onChange={onChange}>
                        {tagData?.getTags.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.name}
                          </MenuItem>
                        ))}
                        <FormHelperText>{error ? error.message : null}</FormHelperText>
                      </Select>
                    </FormControl>
                  )}
                />
              </Stack>
              <Button
                style={{ marginTop: '24px' }}
                type="submit"
                color="primary"
                variant="contained"
                fullWidth>
                提交
              </Button>
              <Button
                style={{ marginTop: '24px' }}
                type="submit"
                variant="contained"
                color="info"
                fullWidth>
                重置
              </Button>
            </div>
          </form>
        </Drawer>
      </>
    )
  },
)

SettingDrawer.displayName = 'SettingDrawer'
export default SettingDrawer
