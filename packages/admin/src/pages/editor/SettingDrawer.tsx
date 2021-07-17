import { Button, Drawer } from '@material-ui/core'
import { forwardRef, useRef, useState } from 'react'

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

    const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      //     if (
      //       event.type === 'keydown' &&
      //       ((event as React.KeyboardEvent).key === 'Tab' ||
      //         (event as React.KeyboardEvent).key === 'Shift')
      //     ) {
      //       return
      //     }
      //     setState({ ...state, [anchor]: open })
    }

    return (
      <>
        <Button color="inherit">设置</Button>
        <Drawer anchor="right" open={drawerVisit} onClose={toggleDrawer(false)}>
          list(anchor)
        </Drawer>
      </>
    )
  },
)

SettingDrawer.displayName = 'SettingDrawer'
