'use strict';

describe('<%= name %> Tests', function () {
	it('is loaded', function () {
		expect(jQuery.fn.<%= name %>).to.not.be.undefined;
	});
});