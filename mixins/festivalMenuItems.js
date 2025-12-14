export default {
  methods: {
    festivalMenuItemsByTheme (theme) {
      let year = 2021

      if (theme === 'bsf11') {
        year = 2022
      }

      if (theme === 'bsf12') {
        year = 2023
      }

      if (theme === 'bsf13') {
        year = 2024
      }

      if (theme === 'bsf14') {
        year = 2025
      }

      if (!this.$store.state.settings) {
        return []
      }

      if (!this.$store.state.settings.header_menus) {
        return []
      }

      if (!this.$store.state.settings.header_menus.festival) {
        return []
      }

      if (!this.$store.state.settings.header_menus.festival.length) {
        return []
      }

      const matches = this.$store.state.settings.header_menus.festival.filter((menu) => {
        return parseInt(menu.year.slug) === year
      })

      if (!matches.length) {
        return []
      }

      return matches[0].menu_items
    },
    festivalTopMenuItemsByTheme (theme) {
      let year = 2021

      if (theme === 'bsf11') {
        year = 2022
      }

      if (theme === 'bsf12') {
        year = 2023
      }

      if (theme === 'bsf13') {
        year = 2024
      }

      if (theme === 'bsf14') {
        year = 2025
      }

      if (!this.$store.state.settings) {
        return []
      }

      if (!this.$store.state.settings.header_menus) {
        return []
      }

      if (!this.$store.state.settings.header_menus.festival) {
        return []
      }

      if (!this.$store.state.settings.header_menus.festival.length) {
        return []
      }

      const matches = this.$store.state.settings.header_menus.festival.filter((menu) => {
        return parseInt(menu.year.slug) === year
      })

      if (!matches.length) {
        return []
      }

      if (!matches[0].top_menu_items) {
        return []
      }

      if (!matches[0].top_menu_items.length) {
        return []
      }

      return matches[0].top_menu_items
    }
  }
}
