import { store } from '..'

export const logout = async (ctx) => {
  store.resetCredential()
  ctx.status = 200
}
