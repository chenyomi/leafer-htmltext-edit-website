import { onRequest as __api_changelog_ts_onRequest } from "/Users/chenyuming/Desktop/cym/leafer-htmltext-edit-website/functions/api/changelog.ts"

export const routes = [
    {
      routePath: "/api/changelog",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_changelog_ts_onRequest],
    },
  ]