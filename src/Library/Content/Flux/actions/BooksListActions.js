var CoreDispatcher = require('../dispatcher/CoreDispatcher');
var BooksListConstants = require('../constants/BooksListConstants');

var BooksListActions = {
    reload: function (url) {
        CoreDispatcher.handleViewAction({
            actionType: BooksListConstants.RELOAD,
            url: url
        });
    }
}

module.exports = BooksListActions;
