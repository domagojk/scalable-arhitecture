function Items () {
  return {
    interface: {
      activate$: 'observable',
      addItem$: 'observable',
      deleteItem$: 'observable'
    },

    actions (sources) {
      return [
        sources.activate$
          .reducer(function (state, id) {
            state.active = id
            return state
          }),

        sources.addItem$
          .reducer(function (state, item) {
            state.lastId += 1
            state.list = [...state.list, { ...item, id: state.lastId }]
            return state
          }),

        sources.deleteItem$
          .reducer(function (state, itemId) {
            state.list = state.list.filter(item => item.id !== itemId)
            return state
          })
      ]
    }
  }
}

export default Items
