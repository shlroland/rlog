// import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export default makeStyles(() => ({
  editorPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifySelf: 'center',
    width: '100%',
    height: '100%',
    backgroundClor: '#fff',
  },
  vditor: {
    position: 'absolute',
    top: '60px',
    width: '80%',
    maxWidth: '1440px',
    height: 'calc(100vh - 100px)',
    margin: '20px auto',
    textAlign: 'left',
  },
}))
