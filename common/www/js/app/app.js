function startApp() {
    fetchImages("aww", function () {
        $.each($("img"), function (i, item) {
            //fit(item);
        });
        attachCarousel();
    });
    console.log("screen width=" + $(window).width());
}

function attachCarousel() {
    $("ul.gallery").carousel();
}

function fit(node) {
    var ratio = $(node).height() / $(node).width();
    var newHeight = $(window).width() * ratio;

    if (newHeight > $(window).width()) {
        var newWidth = $(window).height() / ratio;
        $(node).width(newWidth);
    } else {
        var newWidth = ratio * newHeight;
        $(node).width(newWidth);
    }
    console.log("new w=" + $(node).width() + " h=" + $(node).height() + " -ratio=" + ratio);
}

function fetchImages(subreddit, done) {
    $.getJSON("http://www.reddit.com/r/" + subreddit + "/.json?jsonp=?", function (data) {
        $.each(data.data.children, function (i, item) {
            var url = item.data.url;
            var ext = url.substr(url.length - 4, 4).toLowerCase();
            var node = null;
            if (ext == ".jpg" || ext == ".png" || ext == ".gif") {
                node = $("<img width=\"100%\"/>").attr("src", url);
                node.appendTo("ul.gallery");
            } else {
                if (url.search("imgur.com") !== 0) {
                    url += ".jpg";
                    node = $("<img  width=\"100%\"/>").attr("src", url);
                    node.appendTo("ul.gallery");
                }
            }
            //node.wrap("<a rel=\"external\" href=\"" + url + "\"/>").wrap("<li/>");
            node.wrap("<li/>");
        });
        done();
    });
}
