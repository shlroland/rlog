export const extractPostId = () => {
  const id = window.location.pathname.split('/').pop()
  if (id === 'editor') {
    return ''
  }
  return id
}
