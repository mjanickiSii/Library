var DataProvider = {
    error: function (xhr, status, err) {
        console.error(this.getUrl(), status, err.toString());
        alert(err.toString());
    },
    getData: function(url,success) {
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: success,
            error: this.error
        });
    }
}

module.exports = DataProvider;