function cordovaInit() {
    $('.extlink').live('tap', function () {
        url = $(this).attr("rel");
        loadURL(url);
    });

    function loadURL(url) {
        if (mobile_system == '') {
            window.open(url);
        } else {
            console.log("open url: " + url);
            window.open(url, '_system');
            return false;
        }
    }
}
