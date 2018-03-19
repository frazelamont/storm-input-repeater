import should from 'should';
import 'jsdom-global/register';
import InputClone from '../dist/storm-input-repeater.standalone';

const html = `<form method="post" action="" autocomplete="off">
<fieldset>
<div class="form-group">
<label for="a_0_">Label</label>
<input id="a_0_" name="a[0]" type="text">
<div class="relative repeater__container" data-alpha-input="a_0_"><input id="a_1_" name="a[1]" type="text" aria-label="Label"><div role="button" class="repeater__delete" tabindex="0"><svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg></div></div>
<div class="relative repeater__container" data-alpha-input="a_0_"><input id="a_2_" name="a[2]" type="text" aria-label="Label"><div role="button" class="repeater__delete" tabindex="0"><svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg></div></div>
<div role="button" class="js-input__clone" tabindex="0" data-input-id="a_0_" data-input-name-base="a">Add</div>
</div>
</div>
<input type="submit" value="Submit">
<!-- <input type="reset" value="Reset"> -->
</fieldset>
</form>`;

document.body.innerHTML = html;
  
let clone = InputClone.init('.js-input__clone');


describe('Initialisation', () => {

  it('should return an Object with validate and addMethod functions', () => {

    clone.should.be.an.instanceOf(Array).and.have.lengthOf(1);
    clone[0].should.have.property('addInput').Function();

  });

});