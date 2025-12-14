<template>
  <h2 :class="headingSizes"><slot /></h2>
</template>

<script>
import festival23HeadingSizes from '~/mixins/festival23HeadingSizes'

export default {
  name: 'Festival23H2',
  mixins: [festival23HeadingSizes]
}
</script>

<style scoped>

</style>
