var AddButton = React.createClass({
    displayName: "AddButton",
    render: function () {
        return React.createElement(
            "button",
            { className: this.props.className },
            this.props.Text
        );
    } });
var ListFooter = React.createClass({
    displayName: "ListFooter",

    render: function () {
        return React.createElement(
            "div",
            null,
            React.createElement(AddButton, { className: "btn-success", Text: "Add" })
        );
    }
});
var BookListRowIsbn = React.createClass({
    displayName: "BookListRowIsbn",

    render: function () {
        return React.createElement(
            "td",
            null,
            React.createElement(
                "b",
                null,
                this.props.book.Isbn
            )
        );
    }
});
var BookListRowTitle = React.createClass({
    displayName: "BookListRowTitle",

    render: function () {
        return React.createElement(
            "td",
            null,
            this.props.book.Title
        );
    }
});
class BookListRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement(
            "tr",
            null,
            React.createElement(BookListRowIsbn, this.props),
            React.createElement(BookListRowTitle, this.props)
        );
    }
}
var BookList = React.createClass({
    displayName: "BookList",

    renderItems: function (items) {
        return items.map(function (book) {
            return React.createElement(BookListRow, { key: book.Isbn, book: book });
        });
    },
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        $.ajax({
            url: this.getUrl(),
            dataType: 'json',
            cache: false,
            success: this.success,
            error: this.error
        });
    },
    success: function (data) {
        this.setState({ data: data });
    },
    error: function (xhr, status, err) {
        console.error(this.getUrl(), status, err.toString());
        alert(err.toString());
    },
    getUrl: function () {
        return this.props.url;
    },
    render: function () {
        return React.createElement(
            "table",
            { className: "table-responsive table-bordered" },
            React.createElement("thead", null),
            React.createElement(
                "tbody",
                null,
                this.renderItems(this.state.data)
            )
        );
    }
});