const initialState = {
  tableData: []
}

const rootReducer = (state = initialState, action) => {
  const newState = { ...state }

  switch (action.type) {
    case 'GET_TABLE_DATA_ASYNC':
      newState.tableData = action.payload.data
      break
    default: break
  }

  return newState
}

export default rootReducer
