function clearAllSubReddits() {
    var i = 0;
    var subreddit = localStorage.getItem("subreddit-" + i);
    while (subreddit !== null) {
        subreddit = localStorage.getItem("subreddit-" + i);
        localStorage.removeItem("subreddit-" + i);
        i += 1;
    }
    showCustomSubreddits();
}

function addSubreddit() {
    var newSubreddit = $("#add-text").val();
    var localStorage = window.localStorage;
    localStorage.setItem("subreddit-" + getSubredditNumbers(), newSubreddit);
    selectSubreddit(newSubreddit);
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
    var subreddits = $('#option-sections input[type="radio"]').map(function () {
        return this.id;
    });
    while (subreddit !== null) {
        if ($.inArray(subreddit, subreddits) == -1) {
            subreddits.push(subreddit);
            var inp = '<input type="radio" name="option-sections" data-theme="b" id="' + subreddit + '"></input><label for="' + subreddit + '">' + subreddit + '</label>';
            elt.append(inp).parent().trigger("create");
        }
        i += 1;
        subreddit = localStorage.getItem("subreddit-" + i);
    }
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
    console.log("subreddit=" + subreddit + " filter=" + filter);
    return [subreddit, filter];
}