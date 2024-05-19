import hyRequest from '@/service'

// export function getBanners() {
//   return hyRequest.get({
//     url: '/back'
//   })
// }

export function getClassBasicInfo() {
  return hyRequest.get({
    url: '/basicInfo'
  })
}

// 获取聚类数据
export function getClusterData() {
  return hyRequest.get({
    url: '/clusterData'
  })
}
