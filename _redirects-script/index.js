const fs = require('fs')
const axios = require('axios')

const args = process.argv.slice(2)
if (!args.length) {
  console.log('enter a cms URL')
  return
}

const cmsUrl = args[0]
if (!(cmsUrl.includes('http://') || cmsUrl.includes('https://'))) {
  console.log('invalid url')
  return
}

const generate = async () => {
  const redirects = await axios.get(`${cmsUrl}/wp-json/blackstar/v1/redirects?time=` + Date.now())

  let redirectsNginxConf = ''

  redirects.data.forEach((redirect) => {
    if (redirect.enabled) {
      redirectsNginxConf += `rewrite ^${redirect.match_url}$ ${redirect.action_data.url} permanent;\n`

      if (redirect.match_url !== redirect.url) {
        redirectsNginxConf += `rewrite ^${redirect.url}$ ${redirect.action_data.url} permanent;\n`
      }
    }
  })

  fs.writeFile('dist/nginx.conf', redirectsNginxConf, (err) => {
    if (err) {
      console.error(err)
    }
  })
}
generate().then(() => {
  console.log('done')
})
