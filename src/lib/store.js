export default {
    state: {
        count: 1,
        clones: {}
    },
    update(reducer, nextState){ 
        this.state = reducer(this.state, nextState);
        console.log(this.state);
    },
    getState() { return this.state }
};