export default {
  data () {
    return {
      appendSeoTitle: false
    }
  },
  head () {
    if (this._redirect) {
      return {
        title: 'Page has moved',
        meta: [
          { 'http-equiv': 'refresh', content: `0;${this._redirect.target}` }
        ]
      }
    }

    let currentObject = false

    if (this.post) {
      currentObject = this.post
    }

    if (this.page) {
      currentObject = this.page
    }

    if (this.category) {
      currentObject = this.category
    }

    if (this.tag) {
      currentObject = this.tag
    }

    if (currentObject) {
      const metaArray = []
      if (currentObject.yoast_head_json) {
        for (const key in currentObject.yoast_head_json) {
          if (['title', 'canonical', 'schema'].includes(key)) {
            continue
          }

          if (key === 'description') {
            if (currentObject.yoast_head_json[key] && typeof currentObject.yoast_head_json[key] === 'string') {
              metaArray.push({
                hid: key,
                name: key,
                content: currentObject.yoast_head_json[key].replace(this.$axiosConfig.cmsUrl, this.$axiosConfig.siteUrl)
              })
            }
          } else if (key === 'og_image') {
            metaArray.push({
              hid: 'og_image',
              property: 'og:image',
              content: currentObject.yoast_head_json[key][0].url
            })
            metaArray.push({
              hid: 'og_image_width',
              property: 'og:image:width',
              content: currentObject.yoast_head_json[key][0].width
            })
            metaArray.push({
              hid: 'og_image_height',
              property: 'og:image:height',
              content: currentObject.yoast_head_json[key][0].height
            })
            metaArray.push({
              hid: 'og_image_type',
              property: 'og:image:type',
              content: currentObject.yoast_head_json[key][0].type
            })
          } else if (key === 'robots') {
            const robotsMetaValue = []
            robotsMetaValue.push(currentObject.yoast_head_json[key].follow)
            robotsMetaValue.push(currentObject.yoast_head_json[key].index)
            robotsMetaValue.push(currentObject.yoast_head_json[key]['max-image-preview'])
            robotsMetaValue.push(currentObject.yoast_head_json[key]['max-snippet'])
            robotsMetaValue.push(currentObject.yoast_head_json[key]['max-video-preview'])
            metaArray.push({
              hid: 'robots',
              name: 'robots',
              content: robotsMetaValue.join(', ')
            })
          } else if (currentObject.yoast_head_json[key] && typeof currentObject.yoast_head_json[key] === 'string') {
            metaArray.push({
              hid: key,
              property: key.replace('og_', 'og:').replace('twitter_', 'twitter:').replace('article_', 'article:'),
              content: currentObject.yoast_head_json[key].replace(this.$axiosConfig.cmsUrl, this.$axiosConfig.siteUrl).replace('/news/category/', '/news/')
            })
          }
        }

        return {
          title: (currentObject.yoast_head_json.title + (this.appendSeoTitle ? this.appendSeoTitle : '')),
          meta: metaArray
        }
      }
    }
  },
  methods: {
    replaceHtmlEntities (content) {
      if (!content) {
        return content
      }

      return content.replace(/&amp;/g, '&')
    }
  }
}
