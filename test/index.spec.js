import should from 'should';
import 'jsdom-global/register';
import InputClone from '../dist/storm-input-clone.standalone';

const html = `<form method="post" action="" autocomplete="off">
<fieldset>
  <div class="form-group">
    <label for="clen_0_">Text</label>
    <input id="clen_0_" name="clen[0]" type="text">
    <span class="text-danger field-validation-valid" data-valmsg-for="cn" data-valmsg-replace="true"></span>
    <div role="button" class="js-input__clone" data-input="clen_0_" data-name="clen">Clone input</div>
  </div>
</div>
<input type="submit" value="Submit">
<!-- <input type="reset" value="Reset"> -->
</fieldset>
</form>`;

document.body.innerHTML = html;
  
let InputClone = InputClone.init('.js-input__clone');


describe('Initialisation', () => {

  it('should return an Object with validate and addMethod functions', () => {

//     validator.should.be.an.instanceOf(Object).and.not.empty();
//     validator[form].should.have.property('validate').Function()
//     validator[form].should.have.property('addMethod').Function();

  });

});