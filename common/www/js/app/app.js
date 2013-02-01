"use strict";

function startApp() {
    console.log("startApp");
    bindOptions();
    optionChanged();
    // load options when panel opens
    $(document).delegate('#panelmenu', 'panelbeforeopen', function (ui, e) {
        loadOptions();
        hideAskForAddSubreddit();
    });
    $("#add").on("tap", function () {
        showAskForAddSubreddit();
    })
    $("#addit").on("tap", function () {
        addSubreddit();
    })
    $(window).scroll(function (data) {
        var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
        if (scrollBottom < 5000) {
            fetchImageAfterScroll();
        }
    });
}

function addSubreddit() {
    var newSubreddit = $("#add-text").val();
    var localStorage = window.localStorage;
    localStorage.setItem("subreddit-" + getSubredditNumbers(), newSubreddit);
    hideAskForAddSubreddit();
}

function showAskForAddSubreddit() {
    $('#add-text').parent('.ui-input-text').show();
    $('#addit').parent('.ui-btn').show();
    $('#add').closest('.ui-btn').hide();
}

function hideAskForAddSubreddit() {
    $('#add-text').parent('.ui-input-text').hide();
    $('#addit').parent('.ui-btn').hide();
    $('#add').closest('.ui-btn').show();
}

function getSubredditNumbers() {
    var i = 0;
    var subreddit = localStorage.getItem("subreddit-" + i);
    while (subreddit !== null) {
        i += 1;
        subreddit = localStorage.getItem("subreddit-" + i);
    }
    return i;
}

function showCustomSubreddits() {
    var localStorage = window.localStorage;
    $("#custom-subreddits").html("");
    var i = 0;
    var subreddit = localStorage.getItem("subreddit-" + i);
    var elt = $("#custom-subreddits");
    var subreddits = $('#option-sections input[type="radio"]').map(function() { return this.id; });
    while (subreddit !== null) {
        console.log("subreddit=" + subreddit + " - " + $.inArray(subreddit, subreddits));
        if ($.inArray(subreddit, subreddits) == -1) {
            subreddits.push(subreddit);
            var inp = '<input type="radio" name="option-sections" data-theme="b" id="' + subreddit + '"></input><label for="' + subreddit + '">' + subreddit + '</label>';
            elt.after(inp).parent().trigger("create");
        }
        i += 1;
        subreddit = localStorage.getItem("subreddit-" + i);
    }
    $("#option-sections input[type='radio']").checkboxradio("enable");

}

function loadOptions() {
    var subfilt = readSubredditAndFilter();
    $("#" + subfilt[1]).attr("checked", true);
    $("#option-filters input[type='radio']").checkboxradio("refresh");
    $("#" + subfilt[0]).attr("checked", true);
    $("#option-sections input[type='radio']").checkboxradio("refresh");
    showCustomSubreddits();
}

function bindOptions() {
    var localStorage = window.localStorage;
    $("#option-filters input[type='radio']").live("change", function (event, ui) {
        var optionId = $(this).attr("id");
        var currentId = localStorage.getItem("selected-filter");
        if (currentId !== optionId) {
            localStorage.setItem("selected-filter", optionId);
            optionChanged();
        }
    });
    $("#option-sections input[type='radio']").live("change", function (event, ui) {
        var optionId = $(this).attr("id");
        var currentId = localStorage.getItem("selected-section");
        if (currentId !== optionId) {
            localStorage.setItem("selected-section", optionId);
            optionChanged();
        }
    });
    $("#add-text").on("change", function (event, ui) {
        $("#addit").val("add /r/" + $(this).val()).button("refresh");
    });
}

function showError() {
    //FIXME
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
    var subfilt = readSubredditAndFilter();
    fetchImages(subfilt[0], subfilt[1], 20, null, false);
}

function optionChanged() {
    var subfilt = readSubredditAndFilter();
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
