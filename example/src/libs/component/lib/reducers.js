export default {
    setInitialState: (state, data) => Object.assign({}, state, data),
    addInput: (state, data) => Object.assign({}, state, { clones: [...state.clones, data]}),
    deleteInput: (state, data) => Object.assign({}, state, { clones: state.clones.filter(clone => clone.button !== data.button)})
};