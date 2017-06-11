var utility = (function () {
    function debounce (time, func) {
        var timeoutCallback;
        return function() {
            var args = arguments;
            clearTimeout(timeoutCallback);
            timeoutCallback = setTimeout(function() {
                timeoutCallback = null;
                func.apply(this, args);
            }.bind(this), time);
        };
    }

    return {
        debounce: debounce
    }

}) ()