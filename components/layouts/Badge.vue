<template>
<Container class="overflow-hidden">
  <div :class="`text-${layout.colour}`" class="ml-10 lg:ml-52">
    <Spinner :text="layout.label"></Spinner>
  </div>
</Container>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'Badge',
  mixins: [layout]
}
</script>

<style scoped>

</style>
