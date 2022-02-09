export default function (skins) {
  const filter = 'mkh-skin-'
  return {
    name: 'mkh-load-skin',
    resolveId(id, importer) {
      if (id.startsWith(filter)) {
        skins.push(id)
        return id
      }

      return null
    },
  }
}
