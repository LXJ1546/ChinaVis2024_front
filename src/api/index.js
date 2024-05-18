import hyRequest from '@/service'

export function getBanners() {
  return hyRequest.get({
    url: '/back'
  })
}

export function getClassBasicInfo() {
  return hyRequest.get({
    url: '/basicInfo'
  })
}
