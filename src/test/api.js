import hyRequest from '@/service'

export function getBanners() {
  return hyRequest.get({
    url: '/back'
  })
}
