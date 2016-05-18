var React = require('react');
var ReactDOM = require('react-dom');
var BooksListActions = require('../Flux/actions/BooksListActions');
var BooksListStore = require('../Flux/stores/BooksListStore');
var Pager = require('./Paging/Pager');

var RefreshButton = React.createClass({
    propTypes: {
        onRefresh: React.PropTypes.func.isRequired,
        Text: React.PropTypes.string.isRequired,
        className: React.PropTypes.string
    },
    render: function () {
        return (<button className={this.props.className} onClick={this.props.onRefresh}>{this.props.Text}</button>);
    }
});

var BookListRowIsbn = React.createClass({
    render: function () {
        return (
            <td><b>{this.props.book.Isbn}</b></td>);
    }
});
var BookListRowTitle = React.createClass({
    render: function () {
        return (
        <td>{this.props.book.Title}</td>);
    }
});
class BookListRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <tr>
                <BookListRowIsbn {...this.props} />
                <BookListRowTitle {...this.props} />
            </tr>);
    }
}

function getState() {
    return { data: BooksListStore.getAll() };
};

var BookList = React.createClass({
    refresh: function () {
        BooksListActions.reload(this.getUrl());
    },
    renderItems: function (items) {
        return items.map(
            function (book) {
                return (
                    <BookListRow key={book.Isbn} book={book} />);
            });
    },
    getInitialState: function () {
        return getState();
    },
    componentUnmount: function () {
        BooksListStore.removeChangeListener(this._onChange);
    },
    componentDidMount: function () {
        BooksListStore.addChangeListener(this._onChange);
    },
    _onChange: function () {
        this.setState(getState());
    },
    getUrl: function () {
        return this.props.url;
    },
    render: function () {
        return (
        <div>
    <table className="table-responsive table-bordered">
        <thead>
        </thead>
        <tbody>
            {this.renderItems(this.state.data)}
        </tbody>
    </table>
<Pager />
    <RefreshButton className="btn-success" onRefresh={this.refresh} Text="Refresh"></RefreshButton>
        </div>);
    }
});

    ReactDOM.render(<BookList url="/Books/GetAll" />,document.getElementById("booksList"));

module.exports = BookList;