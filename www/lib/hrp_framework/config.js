var hostName = "http://172.24.30.19:8080/HRP";
var fileFunc = {
    attachProps: function(code, label) {
        var filelist = {
            ':file-list': code,
            'auto-upload': false,
            'limit': 10,
            'label': label,
            'multiple': true,
            'action': '',
            'before-upload': function(file) {
                console.log(file);
            },
            'on-preview': function(file) {
                if (file.status == 'finished') {
                    console.log(file);
                }
            },
            'on-remove': function(file, fileList) {
                if (file.status == 'finished') {
                    console.log(file);
                }
            },
            'on-error': function(err, file, fileList) {

            }

        }
        return filelist;
    }
};