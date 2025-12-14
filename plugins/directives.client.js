import Vue from 'vue'

Vue.directive('cursor-interact', {
  inserted: (el, binding, vnode) => {
    binding.handleMouseEnter = () => {
      vnode.context.$store.commit('cursor/enter')
    }
    binding.handleMouseLeave = () => {
      vnode.context.$store.commit('cursor/leave')
    }
    el.addEventListener('mouseenter', binding.handleMouseEnter)
    el.addEventListener('mouseleave', binding.handleMouseLeave)
  },
  unbind: (el, binding, vnode) => {
    el.removeEventListener('mouseenter', binding.handleMouseEnter)
    el.removeEventListener('mouseleave', binding.handleMouseLeave)
    vnode.context.$store.commit('cursor/leave')
  }
})

Vue.directive('cursor-interact-alt', {
  inserted: (el, binding, vnode) => {
    binding.handleMouseEnter = () => {
      vnode.context.$store.commit('cursor/enterAlt')
    }
    binding.handleMouseLeave = () => {
      vnode.context.$store.commit('cursor/leaveAlt')
    }
    el.addEventListener('mouseenter', binding.handleMouseEnter)
    el.addEventListener('mouseleave', binding.handleMouseLeave)
  },
  unbind: (el, binding, vnode) => {
    el.removeEventListener('mouseenter', binding.handleMouseEnter)
    el.removeEventListener('mouseleave', binding.handleMouseLeave)
    vnode.context.$store.commit('cursor/leaveAlt')
  }
})

Vue.directive('cursor-hint', {
  inserted: (el, binding, vnode) => {
    binding.handleMouseEnter = () => {
      vnode.context.$store.commit('cursor/hint', binding.value)
    }
    binding.handleMouseLeave = () => {
      vnode.context.$store.commit('cursor/hint', false)
    }
    el.addEventListener('mouseenter', binding.handleMouseEnter)
    el.addEventListener('mouseleave', binding.handleMouseLeave)
  },
  unbind: (el, binding, vnode) => {
    el.removeEventListener('mouseenter', binding.handleMouseEnter)
    el.removeEventListener('mouseleave', binding.handleMouseLeave)
    vnode.context.$store.commit('cursor/hint', false)
  }
})

Vue.directive('cursor-hint-alt', {
  inserted: (el, binding, vnode) => {
    binding.handleMouseEnter = () => {
      vnode.context.$store.commit('cursor/hintAlt', binding.value)
    }
    binding.handleMouseLeave = () => {
      vnode.context.$store.commit('cursor/hintAlt', false)
    }
    el.addEventListener('mouseenter', binding.handleMouseEnter)
    el.addEventListener('mouseleave', binding.handleMouseLeave)
  },
  unbind: (el, binding, vnode) => {
    el.removeEventListener('mouseenter', binding.handleMouseEnter)
    el.removeEventListener('mouseleave', binding.handleMouseLeave)
    vnode.context.$store.commit('cursor/hintAlt', false)
  }
})

Vue.directive('cursor-hide', {
  inserted: (el, binding, vnode) => {
    binding.handleMouseEnter = () => {
      vnode.context.$store.commit('cursor/hide')
    }
    binding.handleMouseLeave = () => {
      vnode.context.$store.commit('cursor/show')
    }
    el.addEventListener('mouseenter', binding.handleMouseEnter)
    el.addEventListener('mouseleave', binding.handleMouseLeave)
  },
  unbind: (el, binding, vnode) => {
    el.removeEventListener('mouseenter', binding.handleMouseEnter)
    el.removeEventListener('mouseleave', binding.handleMouseLeave)
    vnode.context.$store.commit('cursor/show')
  }
})
