export default {
    setInitialState: (state, data) => Object.assign({}, state, data),
    addInput: (state, data) => Object.assign({}, state, {
                                        clones: Object.assign({}, state.clones, data),
                                        count: state.count + 1
                                })
};