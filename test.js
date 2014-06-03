var assert = require("assert");
var compose = require('./index.js');

test('compose always returns a function', function() {
    assert(typeof compose() == "function");
    assert(typeof compose(add1) == "function");
    assert(typeof compose(add1, add1) == "function");
});

test('compose pre-emptively throws a TypeError when passed anything but functions.', function() {
    assert.throws(function() { compose({}); }, TypeError);
});

test('The result of composing no functions is a function that returns its first argument untouched.', function() {
    assert.strictEqual(34, compose()(34));
    assert.strictEqual(null, compose()(null));
    var obj = {};
    assert.strictEqual(obj, compose()(obj));
    assert.strictEqual(obj, compose()(obj, 1, 2, 3, 4, 5));
});

function joinStrings() {
    return Array.prototype.join.call(arguments, " ");
}

test('Composing a single function returns a function exposing similar behaviour to the composed function', function() {
    assert.strictEqual("foo", compose(joinStrings)("foo"));
    assert.strictEqual("foo bar", compose(joinStrings)("foo", "bar"));
    assert.strictEqual("foo bar baz", compose(joinStrings)("foo", "bar", "baz"));
});

test('Composing a single function returns a function exposing similar behaviour to the composed function', function() {
    assert.strictEqual("foo", compose(joinStrings)("foo"));
    assert.strictEqual("foo bar", compose(joinStrings)("foo", "bar"));
    assert.strictEqual("foo bar baz", compose(joinStrings)("foo", "bar", "baz"));
});

function add1(x) { return x + 1; }
function square(x) { return x * x; }

test('Composing multiple functions', function() {
    assert.strictEqual(6, compose(add1, add1)(4));
    assert.strictEqual(17, compose(add1, square)(4));
    assert.strictEqual(18, compose(add1, add1, square)(4));
});

test('Composing functions is ordered from rigth to left', function() {
    assert.strictEqual(16, compose(square, add1, add1)(2));
    assert.strictEqual(6, compose(add1, add1, square)(2));
});

function add(x, y) { return x + y; }

test('Composing multiple functions and handling multiple arguments', function() {
    assert.strictEqual(64, compose(square, add1, add)(2, 5));
});