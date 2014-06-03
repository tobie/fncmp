fncmp
=====

`fncmp` provides function composition in JavaScript.

This lets you write very expressive code, combining simple functions into more complex ones.

For example, instead of writing:

``` javascript
array.map(doStuff).map(moreStuff).map(yetMore);
```

or the more performant, but uglier:

``` javascript
array.map(function(item) {
    item = doStuff(item);
    item = moreStuff(item);
    item = yetMore(item);
    return item;
});
```

Just use function composition:

``` javascript
var compose = require("fncmp");
array.map(compose(yetMore, moreStuff, doStuff));
// Notice how functions are composed from right to left.
```

License
-------

MIT
