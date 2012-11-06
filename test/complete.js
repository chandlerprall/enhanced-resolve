/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var should = require("should");
var path = require("path");
var resolve = require("../");

var options = {};

var fixtures = path.join(__dirname, "fixtures");

var testCases = {
	"./b*": [
		{ insert: "", seqment: "b", part: "./b", result: "./b" },
		{ insert: ".js", seqment: "b.js", part: "./b.js", result: "./b.js" }
	],
	"./a*": [
		{ insert: "", seqment: "a", part: "./a", result: "./a" },
		{ insert: ".js", seqment: "a.js", part: "./a.js", result: "./a.js" },
		{ insert: "bc.txt", seqment: "abc.txt", part: "./abc.txt", result: "./abc.txt" }
	],
	".*": [
		{ insert: "./", seqment: "../", part: "../", result: "../" },
		{ insert: "/", seqment: "./", part: "./", result: "./" }
	],
	"./a!./b*": [
		{ insert: "", seqment: "b", part: "./b", result: "./a!./b" },
		{ insert: ".js", seqment: "b.js", part: "./b.js", result: "./a!./b.js" }
	],
	"./a*.txt": [{ insert: "bc", seqment: "abc.txt", part: "./abc.txt", result: "./abc.txt" }],
	"./main*": [
		{ insert: "1", seqment: "main1", part: "./main1", result: "./main1" },
		{ insert: "1.js", seqment: "main1.js", part: "./main1.js", result: "./main1.js" },
		{ insert: "2", seqment: "main2", part: "./main2", result: "./main2" },
		{ insert: "2.js", seqment: "main2.js", part: "./main2.js", result: "./main2.js" },
		{ insert: "3", seqment: "main3", part: "./main3", result: "./main3" },
		{ insert: "3.js", seqment: "main3.js", part: "./main3.js", result: "./main3.js" }
	],
	"./lib/*": [
		{ insert: "complex1", seqment: "complex1", part: "./lib/complex1", result: "./lib/complex1" },
		{ insert: "complex1.js", seqment: "complex1.js", part: "./lib/complex1.js", result: "./lib/complex1.js" }
	],
	"./lib/c*": [
		{ insert: "omplex1", seqment: "complex1", part: "./lib/complex1", result: "./lib/complex1" },
		{ insert: "omplex1.js", seqment: "complex1.js", part: "./lib/complex1.js", result: "./lib/complex1.js" }
	],
	"./lib/complex1*": [
		{ insert: "", seqment: "complex1", part: "./lib/complex1", result: "./lib/complex1" },
		{ insert: ".js", seqment: "complex1.js", part: "./lib/complex1.js", result: "./lib/complex1.js" }
	],
	"./lib/complex2*": [],
	"./*ib": [{ insert: "l", seqment: "lib", part: "./lib", result: "./lib" }],
	"./li*": [
		{ insert: "b", seqment: "lib", part: "./lib", result: "./lib" }
	],
	"./lib*": [
		{ insert: "", seqment: "lib", part: "./lib", result: "./lib" },
		{ insert: "/", seqment: "lib/", part: "./lib/", result: "./lib/" }
	],
	"./lib*/": [{ insert: "", seqment: "lib", part: "./lib/", result: "./lib/" }],
	"./lib*/complex1": [{ insert: "", seqment: "lib", part: "./lib/complex1", result: "./lib/complex1" }],

	"m1/a*": [
		{ insert: "", seqment: "a", part: "m1/a", result: "m1/a" },
		{ insert: ".js", seqment: "a.js", part: "m1/a.js", result: "m1/a.js" }
	],
	"m1/*": [
		{ insert: "a", seqment: "a", part: "m1/a", result: "m1/a" },
		{ insert: "a.js", seqment: "a.js", part: "m1/a.js", result: "m1/a.js" },
		{ insert: "b", seqment: "b", part: "m1/b", result: "m1/b" },
		{ insert: "b.js", seqment: "b.js", part: "m1/b.js", result: "m1/b.js" }
	],
	"m2/c*!": [
		{ insert: "", seqment: "c", part: "m2/c", result: "m2/c!" },
		{ insert: ".js", seqment: "c.js", part: "m2/c.js", result: "m2/c.js!" }
	],
	"m2/c*": [
		{ insert: "!", seqment: "c!", part: "m2/c", result: "m2/c!" },
		{ insert: ".js!", seqment: "c.js!", part: "m2/c.js", result: "m2/c.js!" }
	],
	"m2/b*": [
		{ insert: "", seqment: "b", part: "m2/b", result: "m2/b" },
		{ insert: ".js", seqment: "b.js", part: "m2/b.js", result: "m2/b.js" }
	],
	"m2*": [
		{ insert: "", seqment: "m2", part: "m2", result: "m2" },
		{ insert: "-loader", seqment: "m2-loader", part: "m2-loader", result: "m2-loader" },
		{ insert: "/", seqment: "m2/", part: "m2/", result: "m2/" }
	],
	"invalidPa*": [
		{ insert: "ckageJson", seqment: "invalidPackageJson", part: "invalidPackageJson", result: "invalidPackageJson" }
	],
	"*plexm": [
		{ insert: "../", seqment: "../", part: "../plexm", result: "../plexm" },
		{ insert: "./", seqment: "./", part: "./plexm", result: "./plexm" },
		{ insert: "com", seqment: "complexm", part: "complexm", result: "complexm" }
	],
	"co*lexm": [
		{ insert: "mp", seqment: "complexm", part: "complexm", result: "complexm" }
	],
	"co*lexm/step1": [
		{ insert: "mp", seqment: "complexm", part: "complexm/step1", result: "complexm/step1" }
	],
	"./shortcut*": [
		{ insert: "dir.js", seqment: "shortcutdir.js", part: "./shortcutdir.js", result: "./shortcutdir.js" }
	],
	"./*cutdir": [],
	"./*cutdir.js": [
		{ insert: "short", seqment: "shortcutdir.js", part: "./shortcutdir.js", result: "./shortcutdir.js" }
	],
	"./shortcutdir*/": [
		{ insert: ".js", seqment: "shortcutdir.js", part: "./shortcutdir.js/", result: "./shortcutdir.js/" }
	],
	"./shortcutdir.js*": [
		{ insert: "", seqment: "shortcutdir.js", part: "./shortcutdir.js", result: "./shortcutdir.js" },
		{ insert: "/", seqment: "shortcutdir.js/", part: "./shortcutdir.js/", result: "./shortcutdir.js/" }
	]
}

describe("complete", function() {
	Object.keys(testCases).forEach(function(testCase) {
		var result = testCases[testCase];
		it("should complete " + testCase + " (sync)", function() {
			var results = resolve.complete.sync(fixtures, testCase, options);
			should.exist(results);
			results.should.be.eql(result);
		});
		it("should complete " + testCase + " (async)", function(done) {
			resolve.complete(fixtures, testCase, options, function(err, results) {
				if(err) throw err;
				should.exist(results);
				results.should.be.eql(result);
				done();
			});
		});
	});
});