function startApp() {
    bindOptions();
    optionChanged();
    // load options when panel opens
    $(document).delegate('#panelmenu', 'panelbeforeopen', function (ui, e) {
        loadOptions();
    });
}

function loadOptions() {
    // load filters
    var filter = localStorage.getItem("selected-filter");
    if (filter == null) {
        filter = "top";
    }
    $("#" + filter).attr("checked", true).checkboxradio("refresh");
    $("#option-filters input").checkboxradio("refresh");

    // load options
    var option = localStorage.getItem("selected-section");
    if (option == null) {
        option = "aww";
    }
    $("#" + option).attr("checked", true);
    $("#option-sections input[type='radio']").checkboxradio("refresh");
}

function bindOptions() {
    var localStorage = window.localStorage;
    $("#option-filters input").live("change", function (event, ui) {
        var optionId = $(this).attr("id");
        var currentId = localStorage.getItem("selected-filter");
        if (currentId !== optionId) {
            localStorage.setItem("selected-filter", optionId);
            optionChanged();
        }
    });
    $("#option-sections input").live("change", function (event, ui) {
        var optionId = $(this).attr("id");
        var currentId = localStorage.getItem("selected-section");
        if (currentId !== optionId) {
            localStorage.setItem("selected-section", optionId);
            optionChanged();
        }
    });
}

function optionChanged() {
    var localStorage = window.localStorage;
    var subreddit = localStorage.getItem("selected-section");
    if (subreddit == null) {
        subreddit = "aww";
    }
    var filter = localStorage.getItem("selected-filter");
    if (filter == null) {
        filter = "hot";
    }
    console.log("optionChanged - selected subreddit=" + subreddit + " sort=" + filter);
    fetchImages(subreddit, filter, 5);
}

function attachCarousel() {
    console.log("attach carousel");
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

function fetchImages(subreddit, filter, limit, done) {
    var jsonpUrl = "http://www.reddit.com/r/" + subreddit + "/" + filter + "/.json?limit=" + limit + "&jsonp=?";
    $.ajax({
        dataType:"json",
        url:jsonpUrl,
        beforeSend:function (request) {
            request.setRequestHeader("User-Agent",
                "Reddit Aww viewer for mobile device by /u/maxme - https://github.com/maxme/reddit-aww");
        },
        success:function (data) {
            // Reset list
            $("#imagecontainer").html("<ul class=\"gallery\"></ul>");
            // For each reddit link
            $.each(data.data.children, function (i, item) {
                var url = item.data.url;
                var ext = url.substr(url.length - 4, 4).toLowerCase();
                var node = null;
                if (ext == ".jpg" || ext == ".png" || ext == ".gif") {
                    node = $("<img width=\"100%\"/>").attr("src", url);
                    node.appendTo("ul.gallery");
                } else {
                    /*
                     // Try to fix imgur.com url - doesn't work really well
                     if (url.search("imgur.com") !== 0) {
                     url += ".jpg";
                     node = $("<img  width=\"100%\"/>").attr("src", url);
                     node.appendTo("ul.gallery");
                     }
                     */
                }
                //node.wrap("<a rel=\"external\" href=\"" + url + "\"/>").wrap("<li/>");
                if (node != null) {
                    node.wrap("<li/>");
                }
            });
            if (done) {
                done();
            }
        }
    });
}
