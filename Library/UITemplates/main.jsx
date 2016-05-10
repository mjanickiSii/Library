var AddButton = React.createClass({ render: function(){ return (<button className={this.props.className}>{this.props.Text}</button>); } });
var ListFooter = React.createClass({
    render: function(){
        return (
        <div><AddButton className="btn-success" Text="Add"/></div>);
    }
});
var BookListRowIsbn = React.createClass({
    render: function () {
        return (
            <td><b>{this.props.book.Isbn}</b></td>);}
});
var BookListRowTitle = React.createClass({
    render: function(){
        return (
        <td>{this.props.book.Title}</td>);
    }
});
var BookListRow = React.createClass({
    render: function(){
        return (
            <tr>
                <BookListRowIsbn {...this.props} />
                <BookListRowTitle {...this.props}/>
            </tr>);
    }
});
var BookList = React.createClass({
    renderItems: function (items) {
        return items.map(
            function (book) {
                return(
                    <BookListRow key={book.Isbn} book={book} />);});
    },
    getInitialState: function () {
        return {data:[]};
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function() {
                this.setState({data:data});
            }.bind(this)
        });
    },
    render: function(){
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