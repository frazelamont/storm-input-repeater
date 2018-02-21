import InputClone from './libs/component';

const onDOMContentLoadedTasks = [() => {
    // console.log(inputClone);
    window.__INPUT_CLONE__ = InputClone.init('.js-input__clone');
}];

{ onDOMContentLoadedTasks.forEach((fn) => fn()); }