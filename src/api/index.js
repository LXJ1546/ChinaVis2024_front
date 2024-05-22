import hyRequest from '@/service'

// export function getBanners() {
//   return hyRequest.get({
//     url: '/back'
//   })
// }
//获取分布特征
export function getClassBasicInfo(data) {
  // return hyRequest.get({
  //   url: '/basicInfo'
  // })
  return hyRequest.post({
    url: '/basicInfo',
    data: { data: data }
  })
}

//知识点掌握程度
export function getClassKnowledgeInfo(data) {
  return hyRequest.post({
    url: '/knowledgeMasterInfo',
    data: { data: data }
  })
}

//

// 获取聚类数据
export function getClusterData() {
  return hyRequest.get({
    url: '/clusterData'
  })
}
