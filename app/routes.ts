import { type RouteConfig, index, layout } from '@react-router/dev/routes'

// export default [index('routes/home/index.tsx')] satisfies RouteConfig

export default [
  layout('./App.tsx', { id: 'app-data' }, [
    index('routes/home/index.tsx', { id: 'home' }),
  ]),
] satisfies RouteConfig
