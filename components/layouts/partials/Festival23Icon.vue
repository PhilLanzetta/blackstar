<template>
  <div class="festival-23-icon" :class="{'festival-23-icon--large': large}">
    <svg>
      <use :xlink:href="`#icon-${icon}`" />
    </svg>
    <span v-if="label" class="sr-only">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: 'Festival23Icon',
  props: {
    icon: {
      type: String,
      required: true
    },
    large: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>
.festival-23-icon svg {
  @apply block w-8 h-8 2xl:w-11 2xl:h-11;
}

.festival-23-icon--large svg {
  @apply w-10 h-10 2xl:w-20 2xl:h-20;
}
</style>
