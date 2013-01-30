(function () {
    var device_ready = false;
    var jqm_mobile_init = false;

    var initApp = function () {
        if ((device_ready && jqm_mobile_init) || (jqm_mobile_init && !mobile_system)) {
            console.log('start app');
            startApp();
        }
    };

    var onDeviceReady = function () {
        device_ready = true;
        console.log('dev ready');
        initApp();
    };

    var onMobileInit = function () {
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        jqm_mobile_init = true;
        console.log('jqm ready');
        initApp();
    };

    $(document).bind('mobileinit', onMobileInit);
    document.addEventListener("deviceready", onDeviceReady, false);
})();