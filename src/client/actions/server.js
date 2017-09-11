export const create = ({room, player}) => {
  return {
    type: 'server/create',
    room: {
      name: room
    },
    player: {
      name: player
    }
  }
}

export const join = ({room, player}) => {
  return {
    type: 'server/join',
    room: {
      name: room
    },
    player: {
      name: player
    }
  }
}

export const start = () => {
  return {
    type: 'server/start',
  }
}

export const ask_newtetro = () => {
  return {
    type: 'server/ask newtetro',
    linesDeleted: [1 ,2, 3],
    index: 1,
  }
}

export const board_change = () => {
  return {
    type: 'server/board change',
    board: [0, 0],
  }
}

export const loose = () => {
  return {
    type: 'server/loose',
  }
}

export const exit = () => {
  return {
    type: 'server/exit',
  }
}