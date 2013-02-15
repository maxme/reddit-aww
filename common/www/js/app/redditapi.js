var fetchImages = (function () {
    var afterId = "";
    var loading = false;

    function fetchImages(subreddit, filter, limit, done, resetList, error) {
        // If page is loading, return
        if (loading) {
            return;
        }
        loading = true;

        // Default argument
        if (typeof(resetList) === 'undefined') {
            resetList = false;
        }

        // Keep "after" id when the user scrolls
        if (resetList == true) {
            afterId = "";
        }

        if (afterId == null) {
            afterId = "";
        }

        // Reddit json API
        var jsonpUrl = "http://www.reddit.com/r/" + subreddit + "/" + filter + "/.json?limit=" + limit
            + "&after=" + afterId + "&jsonp=?";

        // FIXME: console.log("reddit url=" + jsonpUrl);
        // HTTP request
        $.ajax({
            dataType:"json",
            url:jsonpUrl,
            beforeSend:function (request) {
                request.setRequestHeader("User-Agent",
                    "Reddit Aww viewer for mobile device by /u/maxme - https://github.com/maxme/reddit-aww");
            },
            success:function (data, textStatus, jqXHR) {
                if (jqXHR.status !== 200)
                    return ;
                // Reset list
                if (resetList == true) {
                    $("#imagecontainer").html("<ul class=\"gallery\"></ul>");
                }
                // For each reddit link
                afterId = data.data.after;
                $.each(data.data.children, function (i, item) {
                    var url = item.data.url;
                    var ext = url.substr(url.length - 4, 4).toLowerCase();
                    var node = null;
                    if (ext == ".jpg" || ext == ".png" || ext = "jpeg") {
                        node = $("<img width=\"100%\"/>").attr("src", url);
                        node.appendTo("ul.gallery");
                    }
                    if (node != null) {
                        node.wrap("<li/>");
                    }
                });
                if (done) {
                    done();
                }
                loading = false;
            },
            error: error,
        });
    }
    return fetchImages;
})();