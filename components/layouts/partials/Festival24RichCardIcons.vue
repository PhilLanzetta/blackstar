<template>
  <ul v-if="icons&&icons.length" class="flex" :class="{'flex-col space-y-1': vertical, 'flex-wrap mb-1 gap-x-1': !vertical}">
    <li v-for="(icon, key) in icons" :key="`icon${key}`">
      <Festival24Tooltip :tooltip="icon.description">
        <Festival24Icon :icon="icon.name" :label="icon.label" />
      </Festival24Tooltip>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Festival24RichCardIcons',
  props: {
    card: {
      type: Object,
      required: true
    },
    vertical: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    icons () {
      if (this.card.type === 'festival-event' || this.card.type === 'festival-film') {
        const icons = []

        let object = this.card.event
        if (this.card.type === 'festival-film') {
          object = this.card.film
        }

        if (object.accessibility) {
          object.accessibility.forEach((accessItem) => {
            icons.push({ name: accessItem.slug, description: accessItem.description, label: accessItem.name })
          })
        }

        if (this.card.type === 'festival-film') {
          if (object.acf.events && object.acf.events.length) {
            object.acf.trigger_warning = object.acf.events[0].acf.trigger_warning
          }
        }

        if (object.acf.trigger_warning) {
          icons.push({ name: 'trigger', description: 'Trigger warning: ' + object.acf.trigger_warning, label: 'Trigger Warning' })
        }

        return icons
      }

      return false
    }
  }
}
</script>

<style scoped>

</style>
