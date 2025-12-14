const getEventiveUrl = function () {
  return window.location.href.replace('https://festival.blackstarfest.org/', '').replace('https://testbsff.eventive.org/', '').replaceAll('&', '?').replaceAll('=', '-')
}

const blackstarPageCssClasses = function () {
  const $body = document.querySelector('body')
  $body.className = $body.className.replace(/blackstar-skin-helper.*/g, '')
  $body.classList.add('blackstar-skin-helper')
  const url = getEventiveUrl()
  const urlParts = url.split('/')
  urlParts.forEach(function (urlPart) {
    $body.classList.add('blackstar-skin-helper-' + urlPart)

    if (urlPart.includes('?')) {
      urlPart.split('?').forEach((part) => {
        $body.classList.add('blackstar-skin-helper-' + part)

      })
    }
  })

  if (urlParts.length === 1) {
    $body.classList.add('blackstar-skin-helper-parent')
  }
}

blackstarPageCssClasses()

let lastUrl = getEventiveUrl()

setInterval(function () {
  if (lastUrl !== getEventiveUrl()) {
    lastUrl = getEventiveUrl()
    blackstarPageCssClasses()
  }
}, 1000)
