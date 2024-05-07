import { memo, useEffect } from 'react'
import { getBanners } from './test/api'
function App() {
  useEffect(() => {
    getBanners().then((res) => {
      console.log(res)
    })
  }, [])
  return <div>这是APP</div>
}

export default memo(App)
