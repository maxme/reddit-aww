(function ($) {
    var gPreferences = {};

    function loadPreferences(loadSuccessful, loadError) {
        var db = window.openDatabase("_preferences", "1.0", "PreferencesDB", 1000000);
        db.transaction(readDB(loadSuccessful), errorCB(loadError));
    }

    function readDB(loadSuccessful) {
        return function (transation) {
            transation.executeSql('SELECT * FROM ints', [], readDBSuccess(loadSuccessful), errorCB(loadError));
        };
    }

    function readDBSuccess(loadSuccessful) {
        return function (transation, results) {
            console.log("Returned rows = " + results.rows.length);
            if (!results.rowsAffected) {
                gPreferences[]
                // select OK
            } else {
                // insert OK: row ID results.insertId
            }
            loadSuccessful();
        };
    }

    function errorCB(err) {
        return function(err) {
            loadError(err);
        };
    }

    function savePreferences() {
        var db = window.openDatabase("_preferences", "1.0", "PreferencesDB", 1000000);
        // loop
    }

    function getInt(key, defaultValue) {

    }

    function getString(key, defaultValue) {

    }

})(jQuery);