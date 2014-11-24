'use strict';

var assert = chai.assert;
var expect = chai.expect;

chai.should();

describe('fm Tests', function () {
	var form = $('#_130_fm');

	it('is loaded', function () {
		expect(jQuery.fn.fm).to.not.be.undefined;
	});

	it('has the correct namespace', function () {
		assert.equal((form.data('fm.namespace') || form.data('fm-namespace')), '_130_', 'has a defined namespace');
	});

	it('grabs text inputs', function () {
		var field = form.fm('text');

		field.should.exist;
		field.should.have.value('some text field');
		field.should.match('#_130_text');
	});

	it('grabs hidden inputs', function () {
		var field = form.fm('hidden');

		field.should.exist;
		field.should.be.hidden;
		field.should.be.input;
		field.should.have.value('some hidden field');
		field.should.match('#_130_hidden');
	});

	it('grabs checkbox inputs', function () {
		var field = form.fm('checkbox');

		field.should.exist;
		field.should.be.input;
		field.should.have.value('some checkbox field');
		field.should.match('#_130_checkbox');
		field.should.not.be.checked
		field.prop('checked', true);
		field.should.be.checked;
	});

	it('grabs radio inputs', function () {
		var field = form.fm('radio');

		field.should.have.length(3);
		field.filter(':checked').should.have.value('some radio field 3');
		field.filter(':checked').should.match('#_130_radio3');
	});

	it('grabs textareas', function () {
		var field = form.fm('textarea');

		field.should.exist;
		field.should.have.value('some textarea');
		field.should.match('#_130_textarea');
	});

	it('grabs buttons', function () {
		var field = form.fm('button');

		field.should.exist;
		field.should.have.value('some button field');
		field.should.match('#_130_button');
	});

	it('grabs fieldsets', function () {
		var field = form.fm('fieldset');

		field.should.exist;
		field.should.match('#_130_fieldset');
	});

	it('grabs selects', function () {
		var field = form.fm('select');

		field.should.have.length(1);
		field.should.have.value('some select option 4');
		field.should.match('#_130_select');
	});

	it('can set a namespace dynamically', function () {
		var newForm = $('#_200_fm');

		newForm.fm('namespace', '_200_');

		var field = newForm.fm('select');

		field.should.have.length(1);
		field.should.have.value('some select option 4');
		field.should.match('#_200_select');
	});
});