export const CHANGE_APP_THEME = 'CHANGE_APP_THEME'

export const changeAppTheme = (payload: any): any => {
  return ({
    type: CHANGE_APP_THEME,
    payload
  })
}

