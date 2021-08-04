const data = [
  { id: 1, name: '将进酒', author: '李白', dynasty: '唐代', type: '诗' },
  { id: 2, name: '水调歌头·明月几时有', author: '苏轼', dynasty: '宋代', type: '词' },
  { id: 3, name: '桃花源记', author: '陶渊明', dynasty: '魏晋', type: '词' },
  { id: 4, name: '长恨歌', author: '白居易', dynasty: '唐代', type: '诗' },
  { id: 5, name: '念奴娇·赤壁怀古', author: '苏轼', dynasty: '宋代', type: '词' },
  { id: 6, name: '春江花月夜', author: '张若虚', dynasty: '唐代', type: '诗' },
  { id: 7, name: '滕王阁序', author: '王勃', dynasty: '唐代', type: '诗' },
  { id: 8, name: '醉翁亭记', author: '欧阳修', dynasty: '宋代', type: '词' },
  { id: 9, name: '天净沙·秋思', author: '马致远', dynasty: '元代', type: '曲' },
  { id: 10, name: '终身误', author: '曹雪芹', dynasty: '清代', type: '曲' },
  { id: 11, name: '天净沙·秋思', author: '马致远', dynasty: '元代', type: '曲' },
  { id: 12, name: '水调歌头·明月几时有', author: '苏轼', dynasty: '宋代', type: '词' },
  { id: 13, name: '桃花源记', author: '陶渊明', dynasty: '魏晋', type: '词' },
  { id: 14, name: '长恨歌', author: '白居易', dynasty: '唐代', type: '诗' },
  { id: 15, name: '念奴娇·赤壁怀古', author: '苏轼', dynasty: '宋代', type: '词' },
  { id: 16, name: '春江花月夜', author: '张若虚', dynasty: '唐代', type: '诗' },
  { id: 17, name: '滕王阁序', author: '王勃', dynasty: '唐代', type: '诗' },
  { id: 18, name: '醉翁亭记', author: '欧阳修', dynasty: '宋代', type: '词' },
  { id: 19, name: '将进酒', author: '李白', dynasty: '唐代', type: '诗' },
  { id: 20, name: '终身误', author: '曹雪芹', dynasty: '清代', type: '曲' },
]

export const query = () => {
  return new Promise(resolve => {
    resolve(data)
  })
}
