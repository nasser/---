CodeMirror.defineMode("qlb", function() {

	var letters = ["ـ", "أ", "ا", "ب", "ج", "د", "ه", "و", "ز", "ح", "ت", "ي", "ك", "ل", "م", "ن", "ق", "ش", "ع", "ر", "ت", "ط", "ة", "س", "د", "ف", "غ", "خ", "ص", "ذ", "ن", "م", "ظ", "ى", "آ", "إ", "ض", "ث"]
	var lettersRegexp = new RegExp("^(" + letters.join("|") + ")");
	
	var constants = ['نعم', 'لا', 'فارغ'];
	var constantRegexp = new RegExp("^("+constants.join("|")+")", 'i');
	
	var builtins = ['إذا', 'ثم', 'بينما', 'حد', 'إفعل', 'رد', 'كرر', 'حتى'];
	var builtinRegexp = new RegExp("^("+builtins.join("|")+")", 'i');

	var quoteCharacter = '"'
	
	return {
		token: function(stream, state) {
			if(state.instring) {
				if (stream.match(quoteCharacter)) { state.instring = false; return 'string'; }
				if (stream.match(/./)) { return 'string'; }

			} else if (stream.match(/^\w/)) {
				return 'error'; 

			} else if(state.inhead) {
				if (stream.match(lettersRegexp) || stream.match('؟') || stream.match('-')) { return 'head'; }
				if (stream.match(')')) { state.inhead = false; return 'paren'; }
				if (stream.match(/\s/)) { state.inhead = false; return 'head'; }

			} else {
				if (stream.match(quoteCharacter)) { state.instring = true; return 'string'; }
				if (stream.match('(')) { state.inhead = true; return 'paren'; }
				if (stream.match(')')) { return 'paren'; }

				if (stream.match(/^(١|٢|٣|٤|٥|٦|٧|٨|٩|٠)/)) { return 'number'; }
				if (stream.match(constantRegexp)) { return 'constant'; }
			}

			stream.next();
			return null;
		},
		startState: function() {
			return {
				instring: false,
				inhead: false
			};
		}
	};
});

CodeMirror.defineMIME("text/qlb", "qlb");
