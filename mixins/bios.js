export default {
  data () {
    return {
      teamMember: null,
      height: false
    }
  },
  computed: {
    bios () {
      if (this.layout.bios) {
        return this.layout.bios
      }

      return this.items
    },
    biosWithContent () {
      return this.bios.filter((bio) => {
        return (bio.post_content || (bio.content && bio.content.rendered))
      })
    },
    teamMemberIndex () {
      if (!this.teamMember) {
        return false
      }

      let teamMemberIndex = 0

      this.biosWithContent.forEach((bio, index) => {
        if (bio.id) {
          if (bio.id === this.teamMember.id) {
            teamMemberIndex = index
          }
        } else if (bio.ID === this.teamMember.ID) {
          teamMemberIndex = index
        }
      })

      return teamMemberIndex
    },
    nextBio () {
      if (!this.teamMember) {
        return null
      }

      if ((this.teamMemberIndex + 1) >= this.biosWithContent.length) {
        return null
      }

      return this.bios[(this.teamMemberIndex + 1)]
    },
    previousBio () {
      if (!this.teamMember) {
        return null
      }

      if (this.teamMemberIndex === 0) {
        return null
      }

      return this.biosWithContent[(this.teamMemberIndex - 1)]
    },
    uniqueId () {
      return this._uid
    }
  },
  methods: {
    setActiveBio (bio) {
      this.teamMember = bio
    },
    closeBio () {
      this.teamMember = null
    },
    setHeight (height) {
      this.height = height
    }
  }
}
