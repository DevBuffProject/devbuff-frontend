export const createContextFromVue = ({ $route, $store }) => {
  return {
    route: $route,
    store: $store,
  }
}

export const resolveWithContext = async (dialog, context) => {
  const { middleware } = await dialog()
  if (middleware) await middleware(context)
  return dialog
}

export default { resolveWithContext }
