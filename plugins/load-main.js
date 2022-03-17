import { SKIN_PREFIX } from './utils/constants'
export default function ({ skins }) {
  return {
    name: 'mkh-load-main',
    load(id) {
      let reg = new RegExp(`${SKIN_PREFIX}[^.]+.js`)
      if (reg.test(id)) {
        var skinCode = reg.exec(id)[0].replace(SKIN_PREFIX, '').split('.')[0]
        if (!skins.includes(skinCode)) skins.push(skinCode)
      }

      return null
    },
  }
}
