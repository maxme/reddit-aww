function startApp() {
    console.log("startApp");
    bindOptions();
    optionChanged();
    // load options when panel opens
    $(document).delegate('#panelmenu', 'panelbeforeopen', function (ui, e) {
        loadOptions();
    });
    $(window).scroll(function (data) {
        var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
        if (scrollBottom < 5000) {
            fetchImageAfterScroll();
        }
    });
}

function loadOptions() {
    var subfilt = readSubredditAndFilter();
    $("#" + subfilt[1]).attr("checked", true);
    $("#option-filters input[type='radio']").checkboxradio("refresh");
    $("#" + subfilt[0]).attr("checked", true);
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

function readSubredditAndFilter() {
    var localStorage = window.localStorage;
    var subreddit = localStorage.getItem("selected-section");
    if (subreddit == null) {
        subreddit = "aww";
    }
    var filter = localStorage.getItem("selected-filter");
    if (filter == null) {
        filter = "hot";
    }
    return [subreddit, filter];
}

function fetchImageAfterScroll() {
    subfilt = readSubredditAndFilter();
    fetchImages(subfilt[0], subfilt[1], 20, null, false);
}

function optionChanged() {
    subfilt = readSubredditAndFilter();
    fetchImages(subfilt[0], subfilt[1], 20, null, true);
    // Update title
    $("#apptitle").html("/r/" + subfilt[0] + " - " + subfilt[1]);
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
