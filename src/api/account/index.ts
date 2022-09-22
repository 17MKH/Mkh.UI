const rows = [
  {
    id: 1,
    username: 'admin',
    name: '管理员',
  },
]

export default {
  query() {
    return new Promise((resolve) => {
      resolve({
        total: 1,
        rows: rows.map((m) => m),
      })
    })
  },
  add(params) {
    return new Promise((resolve) => {
      rows.push({ id: rows.length + 1, username: params.username, name: params.name })
      resolve(0)
    })
  },
  edit(id: number) {
    return new Promise((resolve) => {
      resolve({
        id: 1,
        username: 'admin',
        name: '管理员',
      })
    })
  },
  update(params) {
    return new Promise((resolve) => {
      let s = rows.find((m) => m.id === params.id)
      if (s) {
        s.name = params.name
        s.username = params.username
      }
      resolve(0)
    })
  },
  remove: () => {
    return new Promise((resolve) => {
      resolve([])
    })
  },
}
