export default {
  query() {
    return new Promise((resolve) => {
      resolve({
        successful: true,
        data: {
          rows: [
            {
              id: 1,
              username: 'admin',
              name: '管理员',
            },
          ],
        },
      })
    })
  },
  remove: () => {
    return new Promise((resolve) => {
      resolve([])
    })
  },
}
