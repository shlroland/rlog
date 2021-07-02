import '@material-ui/core'
// import '@material-ui/core/styles/createPalette'
declare module '@material-ui/core' {
  interface Theme {
    customShadows: {
      customShadows: string
      widget: string
      widgetDark: string
      widgetWide: string
    }
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface TypeText {
    hint: string
  }

  interface TypeBackground {
    hint: string
    light: string
  }
}
