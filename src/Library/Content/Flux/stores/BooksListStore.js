var CoreDispatcher = require('../dispatcher/CoreDispatcher');
var BooksListConstants = require('../constants/BooksListConstants')
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var DataProvider = require('../utils/DataProvider');

var CHANGE_EVENT = 'change';

_books = [{Isbn:'1234',Title:'Title'}];

var BooksListStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    success: function (data) {
        _books= data;
    },
    dispatcherIndex: CoreDispatcher.register(function (payload) {
        var action = payload.action;
        switch (action.actionType) {
            case BooksListConstants.RELOAD:
                DataProvider.getData(action.url, data => {
                    _books = data;
                    BooksListStore.emitChange();
                });
                break;
        }
        return true;
    }),
    getAll: function () {
        return _books;
    }
});

module.exports = BooksListStore;
