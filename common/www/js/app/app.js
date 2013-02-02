"use strict";

function startApp() {
    console.log("startApp");
    bindOptions();
    optionChanged();
    showCustomSubreddits();
    // load options when panel opens
    $(document).delegate('#panelmenu', 'panelbeforeopen', function (ui, e) {
        loadOptions();
        hideAskForAddSubreddit();
    });
    $("#add").on("tap", function () {
        showAskForAddSubreddit();
    });
    $("#addit").on("tap", function () {
        addSubreddit();
        showCustomSubreddits();
        $("#panelmenu").panel("close");
    });
    $("#clearall").on("tap", function () {
        clearAllSubReddits();
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
    console.log("set #" + subfilt[0]);
    $("#" + subfilt[0]).attr("checked", true);
    $("#option-sections input[type='radio']").checkboxradio("refresh");
}

function selectSubreddit(selected) {
    var currentId = localStorage.getItem("selected-section");
    if (currentId !== selected) {
        localStorage.setItem("selected-section", selected);
        optionChanged();
    }
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
        selectSubreddit(optionId);
    });
    $("#add-text").on("change", function (event, ui) {
        $("#addit").val("add /r/" + $(this).val()).button("refresh");
    });
}

function showError() {
    //FIXME
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
