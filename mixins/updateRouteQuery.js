export default {
  methods: {
    updateQueryVar (key, value) {
      this.updateQueryVars([{
        key,
        value
      }])
    },
    updateQueryVars (queryVars) {
      let updatedQuery = {}

      if (this.$route.query) {
        updatedQuery = { ...this.$route.query }
      }

      queryVars.forEach((queryVar) => {
        if (queryVar.value) {
          updatedQuery[queryVar.key] = queryVar.value
        } else if (updatedQuery[queryVar.key]) {
          delete updatedQuery[queryVar.key]
        }
      })

      this.$router.push({
        path: this.$route.path,
        query: updatedQuery
      })
    }
  }
}
