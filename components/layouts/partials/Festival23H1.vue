<template>
  <h1 :class="headingSizes"><slot /></h1>
</template>

<script>
import festival23HeadingSizes from '~/mixins/festival23HeadingSizes'

export default {
  name: 'Festival23H1',
  mixins: [festival23HeadingSizes]
}
</script>

<style scoped>

</style>
