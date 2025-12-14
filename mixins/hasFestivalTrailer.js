import modal from '~/mixins/modal'

export default {
  mixins: [modal],
  mounted () {
    this.$nextTick(() => {
      const iframe = this.$refs.embed.getElementsByTagName('iframe')
      if (iframe) {
        iframe[0].setAttribute('src', iframe[0].src + '&autoplay=1')
        this.playing = true
      }
    })
  },
  methods: {
    closeModal () {
      this.$store.commit('festival/trailer', null)
      this.$store.commit('cursor/show')
    }
  }
}
