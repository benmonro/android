android
=======

a node module for adb &amp; android

Examples:

```javascript
var adb = require("android");
```

Get attached device id
----------------------
```javascript
adb.firstDevice(function(deviceId){
	if(deviceId) {
		//there's a device attached, do cool stuff
	} else {
		//no device attached
	}
});
```

Checking to see if a package is installed (wildcards allowed)
-------------------------------------------------------------
```javascript
adb.isInstalled("com.example.*", function(isInstalled) {
	if(isInstalled) {
		//do cool stuff
	}
});
```

Installing an APK
-----------------

```javascript
adb.install("/path/to/my.apk", function() {
	//do cool stuff
});
```

Pushing a file
--------------
```javascript
adb.push("/path/to/src", "/path/to/target", function (err) {
	if(!err) {
		//do cool stuff
	}
});
```

Sending a broadcast
-------------------
```javascript
var options = {action:"com.example.ACTION_JACKSON", extras:{key:"lime", pie: "good"};

adb.sendBroadcast(options, function(response){
	console.log("response data: " + response.data);
	console.log("response message: " + response.message);
});
```