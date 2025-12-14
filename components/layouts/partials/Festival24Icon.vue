<template>
  <span class="festival-24-icon" :class="{'festival-24-icon--large': large, 'festival-24-icon--small': small}">
    <svg>
      <use :xlink:href="`#icon-${icon}`" />
    </svg>
    <span v-if="label" class="sr-only">{{ label }}</span>
  </span>
</template>

<script>
export default {
  name: 'Festival24Icon',
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
    small: {
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
.festival-24-icon svg {
  @apply block w-9 h-9 2xl:w-12 2xl:h-12;
}

.festival-24-icon--large svg {
  @apply block w-12 h-12 2xl:w-14 2xl:h-14;
}

.festival-24-icon--small svg {
  @apply block w-6 h-6;
}
</style>
