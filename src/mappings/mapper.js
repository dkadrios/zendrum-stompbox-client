export default raw =>
  raw.map(item => {
    const props = /(\d+):([\w\s]+)\|([\w\s/]+)/.exec(item)

    return {
      note: parseInt(props[1], 10),
      group: props[2],
      name: props[3],
    }
  })
