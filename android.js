var sys = require('sys');
var exec = require('child_process').exec;

exports.isInstalled = function (pattern, isInstalledCallback) {

    var isInstalledCommand = "adb shell pm list packages| grep package:" + pattern;
    console.log(isInstalledCommand);
    exec(isInstalledCommand, function (err, stdout, stderr) {
        console.log("result:\n" + stdout);

        isInstalledCallback(stdout.indexOf(pattern) >= 0);
    });

}

exports.install = function (pathToApk, completedCallback) {


    sys.print("installing " + pathToApk);
    var install = "adb install " + pathToApk;

    exec(install, function (err, stdout, stderr) {
        sys.print("result of " + install + ": " + stdout);

        completedCallback();
    });

}

exports.firstDevice = function (callback) {
    adbDevices = exec("adb devices", function (error, stdout, stderr) {

        var findDeviceId = /\n([\d\w\.\:]+)\s+/m;
        var match = findDeviceId.exec(stdout);

        console.log("adb devices:\n" + stdout);

        if (match != null) {
            console.log("found a device");
            callback(match[1]);
        } else {
            callback();
        }
    });
}

exports.push = function (from, to, callback) {
    exec("adb push " + from + " " + to, function(error, stdout, stderr){
        callback(error);
    });
}

exports.sendBroadcast = function (options, callback) {
    var extras = "";

    for (key in options.extras) {
        extras += " -e \"" + key + "\" " + options.extras[key];
    }

    var broadcastCmd = "adb shell am broadcast -a \"" + options.action + "\"" + extras;
    console.log("sending command: " + broadcastCmd);
    exec(broadcastCmd, function (error, stdout, stderr) {

            var dataMatch = (/data="(\{.*\})"/m).exec(stdout);
            var response = {};
            if (dataMatch) {
                response.data = dataMatch[1];
                response.message = stdout;
            }
            callback(response);
        }
    );
};
