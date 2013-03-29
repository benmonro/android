var sys = require('sys');
var exec = require('child_process').exec;

exports.isInstalled = function (pattern, isInstalledCallback) {

    var isInstalledCommand = "adb shell ls /data/app/" + pattern; //com.zonarsystems.mockvehicledeviceinfo*";
    exec(isInstalledCommand, function (err, stdout, stderr) {
        isInstalledCallback(stdout.indexOf("No such file or directory") === -1);
    });

}

exports.installApk = function (pathToApk, completedCallback) {


    sys.print("installing " + pathToApk);
    var install = "adb install " + pathToApk;

    exec(install, function (err, stdout, stderr) {
        sys.print("result of " + install + ": " + stdout);

        completedCallback();
    });

}

exports.firstDevice = function (callback) {
    adbDevices = exec("adb devices", function (error, stdout, stderr) {

        var findDeviceId = /\n([\d\w]+)\s+/m;
        var match = findDeviceId.exec(stdout);


        if (match != null) {
            callback(match[1]);
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
