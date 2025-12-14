export default (cmsUrl, siteUrl) => {
  const axiosConfig = {
    cmsUrl,
    siteUrl,
    config: {},
    timeout: 600000
  }

  axiosConfig.config.baseURL = siteUrl

  if (axiosConfig.cmsUrl.includes('^')) {
    const parts = axiosConfig.cmsUrl.split('^')

    axiosConfig.config.auth = {
      username: parts[1],
      password: parts[2]
    }
    axiosConfig.cmsUrl = parts[0]
  }
  return axiosConfig
}
