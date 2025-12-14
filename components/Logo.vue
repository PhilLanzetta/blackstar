<template>
  <blackstar-logo class="block w-full h-auto" />
</template>

<script>
import BlackstarLogo from '~/assets/blackstar-logo.svg?inline'

export default {
  name: 'Logo',
  components: { BlackstarLogo }
}
</script>

<style scoped>
 svg path {
   fill: currentColor;
 }
</style>
