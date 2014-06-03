module.exports = compose;
function compose() {
    var fns = arguments;
    for (var i = 0, length = fns.length; i < length; i++) {
        if (typeof fns[i] !== "function") {
            throw new TypeError("Can only compose functions.");
        }
    }
    return function(arg) {
        var i = length;
        
        while (i > 0) {
            // The utmost right function composed can receive multiple arguments.
            if (i == length) {
                arg = fns[--i].apply(null, arguments);
            } else {
                arg = fns[--i](arg);
            }
        }
        return arg;
    }
};