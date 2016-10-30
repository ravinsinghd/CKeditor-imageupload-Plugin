CKEDITOR.plugins.add('ImageUpload', {
    icons: 'ImageUpload',
    init: function (editor) {

        editor.addCommand('ImageUpload', new CKEDITOR.dialogCommand('ImageUploadDialog'));
        editor.ui.addButton('ImageUpload', {
            label: 'Insert Image',
            command: 'ImageUpload',
            toolbar: 'insert'
        });
        CKEDITOR.dialog.add('ImageUploadDialog', function (editor) {
            return {
                title: 'Upload Image',
                minWidth: 400,
                minHeight: 70,
                contents: [
                    {
                        id: 'tab-basic',
                        label: 'Basic Settings',
                        elements: [
                            {
                                type: 'file',
                                id: 'imgUpload',
                                validate: CKEDITOR.dialog.validate.notEmpty("image field cannot be empty."),
                                commit: function (element) {
                                    fileInput = this.getInputElement().$;
                                    file = fileInput.files[0];

                                    var formData = new FormData();
                                    formData.append(file.name, file);

                                    var xhr = new XMLHttpRequest();
                                    xhr.open('POST', 'http://localhost:63901/api/blob/assessmentImage', true);
                                    xhr.onload = function (e) {
                                        console.log(e);
                                    };
                                    xhr.onreadystatechange = function () {
                                        if (xhr.readyState == 4 && xhr.status == 201) {
                                            var imagePath = JSON.parse(xhr.responseText);
                                        }
                                    }
                                    xhr.send(formData);
                                }
                            }
                        ]
                    },
                ],
                onOk: function () {
                    var dialog = this;
                    var abbr = this.element;
                    this.commitContent(abbr);

                    if (this.insertMode)
                        editor.insertElement(abbr);
                }
            };
        });
    }
});

