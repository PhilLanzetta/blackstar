<template>
  <Container>
    <Space :lg="true" />
    <SeenNewsletterSignup :alt="true" />
    <Space :lg="true" />
  </Container>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'SeenNewsletterSignupLayout',
  mixins: [layout]
}
</script>

<style scoped>

</style>
