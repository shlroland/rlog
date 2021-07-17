import { Box, AppBar, Toolbar, Container, Button, Input } from '@material-ui/core'
import { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react'
import Vditor from 'vditor'
import { toolbar } from './editorConfig'
import { useFullSreenFn } from './hooks/useFullScreenFn'
import useStyle from './styles'
import Logo from 'src/assets/images/logo2.svg'
import 'vditor/src/assets/scss/index.scss'
import { extractPostId } from 'src/utils'
import SnackbarUtils from 'src/components/Toast'
import { useMutation } from '@apollo/client'
import type { ReleaseResult, ReleaseInput, DraftInput, DraftResult } from './typeDefs'
import { RELEASE, DRAFT as DRAFT_GQL } from './typeDefs'
import SettingDrawer from './SettingDrawer'
import dayjs from 'dayjs'
import { TIME_FORMAT } from 'src/utils/constant'
import SaveIcon from '@material-ui/icons/Save'
import PublishIcon from '@material-ui/icons/Publish'
interface TitleComMethods {
  getTitle: () => string
  setTitle: (title: string) => void
}

const TitleCom = forwardRef<TitleComMethods, Record<string, unknown>>((_props, ref) => {
  const [title, setTitle] = useState('')
  const classes = useStyle()
  useImperativeHandle(ref, () => ({
    getTitle: () => title,
    setTitle(propTitle) {
      setTitle(propTitle)
    },
  }))

  return (
    <Input
      className={classes.titleInput}
      placeholder="请输入文章标题"
      value={title}
      onChange={(event) => {
        setTitle(event.target.value)
      }}
    />
  )
})

TitleCom.displayName = 'TitleCom'

const ArticleEditor = () => {
  const classes = useStyle()
  const vditorRef = useRef<HTMLDivElement>(null)
  const vditor = useRef<Vditor>()
  const draftTimer = useRef<number>(0)

  const [toggleFullScreen] = useFullSreenFn(vditorRef)

  const id = useRef(extractPostId())

  const [updatedTime, setUpdatedTime] = useState<string>('')

  const [release, { loading: isReleasing }] = useMutation<ReleaseResult, ReleaseInput>(
    RELEASE,
    {
      onCompleted() {
        SnackbarUtils.success('发布成功')
        window.clearInterval(draftTimer.current)
      },
    },
  )

  const [draft, { loading: isSaving }] = useMutation<DraftResult, DraftInput>(DRAFT_GQL, {
    onCompleted(data) {
      const {
        saveDraft: { _id, updatedAt },
      } = data
      setUpdatedTime(dayjs(updatedAt).format(TIME_FORMAT))
      if (!id.current) {
        window.history.replaceState(null, '', `editor/${_id}`)
        id.current = _id
      }
      window.clearInterval(draftTimer.current)
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      // handleDraftTimer()
    },
  })

  // const handleDraftTimer = useCallback(() => {
  //   draftTimer.current = window.setInterval(() => {
  //     handleDraft()
  //   }, 60000)
  // }, [handleDraft])

  useEffect(() => {
    if (!vditor.current && vditorRef.current) {
      vditor.current = new Vditor(vditorRef.current, {
        width: '80%',
        cache: {
          id: 'vditor',
          enable: false,
        },
        counter: {
          enable: true,
        },
        toolbar: [...toolbar(toggleFullScreen)],
        // input: handleDraft,
      })

      // if (id.current) {
      //   getPost({
      //     variables: {
      //       id: id.current as string,
      //     },
      //   })
      // }
    }

    return () => {
      if (vditor.current) {
        vditor.current?.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box
              sx={{
                // float: 'left',
                height: '60px',
                lineHeight: '60px',
              }}>
              <img src={Logo} alt="" height={45} style={{ verticalAlign: 'middle' }} />
            </Box>
            <Box sx={{ flexGrow: 1, marginLeft: '32px' }}>
              <TitleCom />
            </Box>
            <Box>
              <Button color="inherit" startIcon={<SaveIcon />}>
                保存草稿
              </Button>
              <SettingDrawer />
              <Button color="inherit" startIcon={<PublishIcon />}>
                发布
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth={'lg'} fixed>
        <div id="vditor" className={classes.vditor} ref={vditorRef} />
      </Container>
    </>
  )
}

export default ArticleEditor
