import factory from './lib';

const init = (sel, opts) => {
	let els = [].slice.call(document.querySelectorAll(sel));

	if(!els.length) return console.warn('No input clone buttons found');
    
	return els.map(el => Object.create(factory(el)));
};

export default { init };