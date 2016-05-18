var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var VIEW_ACTION = 'VIEW_ACTION';

var CoreDispatcher = assign(new Dispatcher(), {
    handleViewAction: function (action) {
        var payload = {
            source: VIEW_ACTION,
            action: action
        };
        this.dispatch(payload);
    }
});

module.exports = CoreDispatcher;