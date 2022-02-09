import { IMPORT_SKIN_PREFIX } from './constants'

export default function (skins) {
  return {
    name: 'mkh-load-skin',
    resolveId(id) {
      if (id.startsWith(IMPORT_SKIN_PREFIX)) {
        skins.push(id)
        return id
      }

      return null
    },
  }
}
