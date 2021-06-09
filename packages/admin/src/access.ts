/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
// export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
export default function access() {
  // const { currentUser } = initialState || {};
  return {
    canAdmin: true,
  };
}
