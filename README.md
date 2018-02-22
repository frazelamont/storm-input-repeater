# Storm Input Repeater

For cloning and managing repeating fields.

Maintains continuous id/naming for repeating items, so it re-names/re-ids all repeaters when an input is deleted.

Elm-style model/state management and vNode-powered DOM manipulation.

## Usage
HTML
=======
```
<label for="field_0_">Label</label>
<input id="field_0_" name="field[0]" type="text">
<div role="button" class="js-input__clone" tabindex="0" data-input-id="field_0_" data-input-name-base="field">Add</div>
```

JS
```
either using es6 import
```
import InputRepeater from 'storm-input-repeater';

InputRepeater.init('.js-input__clone');
```
aynchronous browser loading (use the .standalone version in the /dist folder)
```
import Load from 'storm-load';

Load('/content/js/async/storm-input-repeater.standalone.js')
    .then(() => {
        InputRepeater.init('.js-input__clone');
    });

## Options
```
{
    serverRenderedSelector: '.js-input__clone-item', //selector for any input groups rendered by the server that need to be consumed
    deleteButton: { //vNode describing the delete button
        type: 'div',
        attributes: { role: 'button', class: 'repeater__delete', tabindex: 0 },
        innerHTML: '<svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>'
    },
    container: { //vNode describing the repeated input container
        type: 'div',
        attributes: { class: 'relative repeater__container' }, 
    },
    name(name, index){ return `${name}[${index}]` }, //function used to name new inputs
    id(name, index){ return `${name}_${index}_`; } //function used to give id to new inputs
}
```
e.g.
```
InputRepeater.init('.js-input__clone', {
    name(name, index){ return `${name}--${index}` },
    id(name, index){ return `${name}__${index}`; }
});

## Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends upon Object.assign so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfils for Array functions and eventListeners.

## Dependencies
None

## License
MIT