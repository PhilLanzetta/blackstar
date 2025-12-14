<template>
  <button class="help-icon" @click.prevent="$store.commit('festival/setHelpText', helpText)">
    <span class="sr-only">Toggle help information</span>
    <svg class="help-icon__outline">
      <use xlink:href="#icon-help-info-outline" />
    </svg>
    <svg class="help-icon__solid">
      <use xlink:href="#icon-help-info" />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'Festival23HelpTextButton',
  props: {
    helpText: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.help-icon .help-icon__outline {
  @apply block;
}

.help-icon .help-icon__solid {
  @apply hidden;
}

.help-icon:hover .help-icon__outline {
  @apply hidden;
}

.help-icon:hover .help-icon__solid {
  @apply block;
}

.help-icon svg {
  @apply block w-5 h-5 2xl:w-6 2xl:h-6;
}
</style>
