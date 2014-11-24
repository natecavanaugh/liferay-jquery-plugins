$.fn.$prop = function(name, value) {
	return $.access(this, $.$prop, name, value, arguments.length > 1);
};

$.$prop = function(elem, name, value) {
	var nested = name.indexOf('.') > -1;
	var names = null;
	var length = 0;

	if (nested) {
		names = name.split('.');

		name = names.shift();

		length = names.length;
	}

	var getter = value === undefined;

	var i;
	var obj;
	var propName;
	var res;

	if (getter) {
		res = $.prop(elem, name, value);

		if (nested) {
			obj = res;

			for (i = 0; obj !== undefined && i < length; i++) {
				propName = names[i];

				obj = obj[propName];
			}

			res = obj;
		}
		if (typeof res === 'object' || typeof res === 'function') {

			if (res && (('nodeType' in res) || $.isWindow(res) || (res.item && !res.jquery) || (res[0] && res[0].nodeType))) {
				res = $(res);
			}
		}
	}
	else {
		if (nested) {
			length -= 1;

			obj = elem[name];

			if (obj === undefined) {
				obj = {};
				elem[name] = obj;
			}

			for (i = 0; i < length; i++) {
				propName = names[i];

				obj[propName] = obj[propName] || {};
				obj = obj[propName];
			}

			obj[names[length]] = value;
		}
		else {
			res = $.prop(elem, name, value);
		}
	}

	return res;
};