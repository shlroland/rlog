import { Box, AppBar, Toolbar, Container, Button } from '@material-ui/core'
import { useRef, useEffect } from 'react'
import Vditor from 'vditor'
import { toolbar } from './editorConfig'
import { useFullSreenFn } from './hooks/useFullScreenFn'
import useStyle from './styles'
import Logo from 'src/assets/images/logo2.svg'
import 'vditor/src/assets/scss/index.scss'

const ArticleEditor = () => {
  const classes = useStyle()
  const vditorRef = useRef<HTMLDivElement>(null)
  const vditor = useRef<Vditor>()
  const [toggleFullScreen] = useFullSreenFn(vditorRef)

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
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <Button color="inherit">保存草稿</Button>
              <Button color="inherit">发布</Button>
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
