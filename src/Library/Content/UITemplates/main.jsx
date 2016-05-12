var AddButton = React.createClass({ render: function () { return (<button className={this.props.className }>{this.props.Text}</button>); } });
var ListFooter = React.createClass({
    render: function () {
        return (
        <div><AddButton className="btn-success" Text="Add" /></div>);
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
var BookList = React.createClass({
    renderItems: function (items) {
        return items.map(
            function (book) {
                return (
                    <BookListRow key={book.Isbn} book={book} />);
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
        return (
        <table className="table-responsive table-bordered">
            <thead>
            </thead>
            <tbody>
                {this.renderItems(this.state.data)}
            </tbody>
        </table>);
    }
});