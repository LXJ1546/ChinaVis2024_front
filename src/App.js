import { memo, useEffect } from 'react'
import { getBanners } from './test/api'
import { ConfigProvider } from 'antd'
import Layout from './layout'
const App = () => {
  useEffect(() => {
    getBanners().then((res) => {
      console.log(res)
    })
  }, [])
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#316c72'
        }
      }}
    >
      <Layout />
    </ConfigProvider>
  )
}

export default memo(App)
