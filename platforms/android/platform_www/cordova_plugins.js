cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "cordova-hot-code-push-plugin.chcp",
        "file": "plugins/cordova-hot-code-push-plugin/www/chcp.js",
        "pluginId": "cordova-hot-code-push-plugin",
        "clobbers": [
            "chcp"
        ]
    },
    {
        "id": "cordova-hot-code-push-local-dev-addon.chcpLocalDev",
        "file": "plugins/cordova-hot-code-push-local-dev-addon/www/chcpLocalDev.js",
        "pluginId": "cordova-hot-code-push-local-dev-addon",
        "clobbers": [
            "chcpLocalDev"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-statusbar": "2.4.3-dev",
    "cordova-hot-code-push-plugin": "1.5.3",
    "cordova-hot-code-push-local-dev-addon": "0.4.2"
};
// BOTTOM OF METADATA
});