import Rellax from 'rellax'

export default (context, inject) => {
  inject('rellax', Rellax)
  context.$rellax = Rellax
}
