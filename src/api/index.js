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
export function getClassKnowledgeInfo(data, title) {
  return hyRequest.post({
    url: '/knowledgeMasterInfo',
    data: { data: data, title: title }
  })
}

//

// 获取聚类数据
export function getClusterData(classNum = 'all') {
  return hyRequest.post({
    url: '/clusterData',
    data: { classNum: classNum }
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

//获取题目掌握程度的数据
export function getTitleMasterInfo(data) {
  return hyRequest.post({
    url: '/titleMasterInfo',
    data: { data: data }
  })
}

//获取题目内存用时数据
export function getTitleMemoryInfo(data, titleName) {
  return hyRequest.post({
    url: '/titleTimeMemoryInfo',
    data: { data: data, name: titleName }
  })
}
//获取选中的多个学生的学生日历
export function getCalenderInfo(studentID, month) {
  return hyRequest.post({
    url: '/learnCalendarInfo',
    data: { data: studentID, month: month }
  })
}

//获取日历中选中的该学生当天的提交时间
export function getEventInfo(studentID, date) {
  return hyRequest.post({
    url: '/personalSubmitInfo',
    data: { data: studentID, date: date }
  })
}

//获取所有时间段的特征
export function getAllPeriodInfo() {
  return hyRequest.get({
    url: '/allPeriodInfo'
  })
}

//获取单个时间段的特征
export function getOnePeriodInfo(month, is_weekday, period) {
  return hyRequest.post({
    url: '/onePeriodInfo',
    data: { month: month, is_weekday: is_weekday, period: period }
  })
}

//获取答题模式的月统计数据
export function getMonthStatisticInfo(month) {
  return hyRequest.post({
    url: '/featureStatisticsInfo',
    data: { data: month }
  })
}

//获取某个学生在某月的答题情况（每道题的提交次数）
export function getMonthQuestionSubmit(id, month) {
  return hyRequest.post({
    url: '/monthQuestionSubmit',
    params: { id: id, month: month }
  })
}

//时间模式下，右下象形柱图
export function getTimeStudentInfo(feature) {
  return hyRequest.post({
    url: '/timeStudentInfo',
    data: { data: feature }
  })
}

//改变掌握程度的权重，并重新初始化系统
export function getNewMasterDegree(score, correct, time, memory) {
  return hyRequest.post({
    url: '/setWeightInfo',
    data: {
      score: score,
      correct: correct,
      time: time,
      memory: memory
    }
  })
}

//时间模式下，右下雷达图图
export function getTimeRadarInfo() {
  return hyRequest.post({
    url: '/timeRadarInfo'
  })
}

//获取时间模式演变
export function getEvolutionInfo() {
  return hyRequest.post({
    url: '/timeEvolutionInfo'
  })
}
