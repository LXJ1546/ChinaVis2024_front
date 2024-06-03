import { memo } from 'react'
import { ConfigProvider } from 'antd'
import Layout from './layout'
import zhCN from 'antd/locale/zh_CN'
const App = () => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#008B8B'
        },
        components: {
          Table: {
            cellPaddingBlockSM: 1,
            cellPaddingInlineSM: 8
          },
          Slider: {
            railSize: 5,
            dotSize: 6
          }
        }
      }}
    >
      <Layout />
    </ConfigProvider>
  )
}

export default memo(App)
