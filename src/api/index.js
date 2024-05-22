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

// 获取相关性数据
export function getCorrelationData() {
  return hyRequest.get({
    url: '/correlationData'
  })
}

// 获取状态转移视图的数据
export function getTransferData(month1 = 9, month2 = 10) {
  return hyRequest.post({
    url: '/transferData',
    params: {
      pre_month: month1,
      bk_month: month2
    }
  })
}
