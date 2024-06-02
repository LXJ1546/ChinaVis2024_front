import { memo } from 'react'
import { ConfigProvider } from 'antd'
import Layout from './layout'
const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#316c72'
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
