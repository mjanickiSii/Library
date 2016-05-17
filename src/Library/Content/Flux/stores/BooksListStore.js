var CoreDispatcher = require('../dispatcher/CoreDispatcher');
var BooksListConstants = require('../constants/BooksListConstants')
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var BooksListAPI = require('../utils/CoreAPI');

var CHANGE_EVENT = 'change';

_books = [];

var BooksListStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on('change',callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    getAll: function () {
        return _book;
    }
});

CoreDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case core.RELOAD:
            break;
    }
    return true;
});

module.exports = BooksListStore;
