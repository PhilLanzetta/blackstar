import Vue from 'vue'
import getAxiosConfig from '../axiosConfig'

export default (context, inject) => {
  let cmsUrl
  let baseUrl
  if (context.env) {
    cmsUrl = context.env.cmsUrl
    baseUrl = context.env.baseUrl
  } else {
    cmsUrl = process.env.CMS_URL
    baseUrl = process.env.BASE_URL
  }
  Vue.filter('replaceSiteUrl', (val) => {
    if (val.includes(`${cmsUrl}/?formstack-viewer=`)) {
      return val
    }
    if (val.includes(`${cmsUrl}/formstack/`)) {
      return val
    }
    if (val.includes(`${cmsUrl}/wp-content/uploads`)) {
      return val
    }
    if (val.includes(`${cmsUrl}/app/uploads`)) {
      return val
    }
    return val.replace(`${cmsUrl}/`, '/')
  })

  inject('axiosConfig', getAxiosConfig(cmsUrl, baseUrl))
  context.$axiosConfig = getAxiosConfig(cmsUrl, baseUrl)
}
