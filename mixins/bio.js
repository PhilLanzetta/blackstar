export default {
  computed: {
    eventPosition () {
      if (this.eventId) {
        if (this.teamMember.acf.event_positions && this.teamMember.acf.event_positions.length) {
          return this.teamMember.acf.event_positions.filter((position) => {
            return position.event === this.eventId
          })[0]
        }
      }

      return false
    },
    position () {
      if (this.eventPosition) {
        return this.eventPosition.position
      }

      return (this.teamMember.acf.position ? this.teamMember.acf.position : null)
    },
    moderator () {
      if (this.eventPosition) {
        return this.eventPosition.moderator
      }

      return false
    }
  }
}
