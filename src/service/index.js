import HYRequest from './request'

const hyRequest = new HYRequest({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 30000,
  interceptors: {
    requestSuccessFn: (config) => {
      return config
    }
  }
})

export default hyRequest
