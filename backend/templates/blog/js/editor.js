window.addEventListener('load', function() {
    var editor;

    ContentTools.StylePalette.add([
      new ContentTools.Style('Author', 'author', ['p'])
    ]);

    // initialize the editor
    editor = ContentTools.EditorApp.get();
    editor.init('*[data-editable]', 'data-name');

    // Add support for auto-save
    editor.addEventListener('start', function (ev) {
      var _this = this;

      // Call save every 30 seconds
      function autoSave() {
          _this.save(true);
      };
      this.autoSaveTimer = setInterval(autoSave, 30 * 1000);
    });

    editor.addEventListener('stop', function (ev) {
      // Stop the autosave
      clearInterval(this.autoSaveTimer);
    });

    // listen for saved events
    editor.addEventListener('saved', function (ev) {
      var name, payload, regions, xhr;
      var onStateChange, passive;

      // debugger
      // Check if this was a passive save
      passive = ev.detail().passive;

      // Check that something changed
      regions = ev.detail().regions;
      console.log(regions);
      if (Object.keys(regions).length == 0) {
          return;
      }

      // Set the editor as busy while we save our changes
      this.busy(true);

      // Collect the contents of each region into a FormData instance
      // instead of looping through each item in the regions object
      // and adding a parameter for it

      // payload = new FormData();
      // for (name in regions) {
      //     if (regions.hasOwnProperty(name)) {
      //         payload.append(name, regions[name]);
      //     }
      // }

      // we simply pack the regions object as JSON and add it as a parameter
      payload = new FormData();
      // payload.append(
      //     'blog',
      //     document.querySelector('meta[name=blog]').getAttribute('content')
      //     );
      payload.append('regions', JSON.stringify(regions));
      // var payload_json = JSON.stringify(payload.append('regions', JSON.stringify(regions)));

      // Send the update content to the server to be saved
      // function onStateChange(ev) {
      //     // Check if the request is finished
      //     if (ev.target.readyState == 4) {
      //         editor.busy(false);
      //         if (ev.target.status == '200') {
      //             // Save was successful, notify the user with a flash
      //             // check if its passive
      //             if (!passive) {
      //               new ContentTools.FlashUI('ok');
      //             }
      //         } else {
      //             // Save failed, notify the user with a flash
      //             new ContentTools.FlashUI('no');
      //         }
      //     }
      // };

      $.ajax({
        url: '/blog-test',
        method: 'post',
        dataType: 'json',
        data: ev.detail().regions,
        success: function (e) { new ContentTools.FlashUI('ok') },
        error: function (e) { new ContentTools.FlashUI('no') },
        complete: function (e) { editor.busy(false) }
      })

      // xhr = new XMLHttpRequest();
      // xhr.addEventListener('readystatechange', onStateChange);
      // xhr.open('POST', '/blog-test');
      // xhr.send(payload);
    }
  );
});

/////////////////////////////////////////////////////////////////////////////////////
// image uploading
function imageUploader(dialog) {
  var image, xhr, xhrComplete, xhrProgress;


  // Set up the event handlers
  dialog.addEventListener('imageuploader.cancelupload', function () {
    // Cancel the current upload

    // Stop the upload
    if (xhr) {
        xhr.upload.removeEventListener('progress', xhrProgress);
        xhr.removeEventListener('readystatechange', xhrComplete);
        xhr.abort();
    }

    // Set the dialog to empty
    dialog.state('empty');
  });

  dialog.addEventListener('imageuploader.clear', function () {
    // Clear the current image
    dialog.clear();
    image = null;
  });

  dialog.addEventListener('imageuploader.fileready', function (ev) {

      // Upload a file to the server
      var formData;
      var file = ev.detail().file;

      // Define functions to handle upload progress and completion
      xhrProgress = function (ev) {
          // Set the progress for the upload
          dialog.progress((ev.loaded / ev.total) * 100);
      }

      xhrComplete = function (ev) {
        var response;

        // Check the request is complete
        if (ev.target.readyState != 4) {
            return;
        }

        // Clear the request
        xhr = null
        xhrProgress = null
        xhrComplete = null

        // Handle the result of the upload
        if (parseInt(ev.target.status) == 200) {
            // Unpack the response (from JSON)
            response = JSON.parse(ev.target.responseText);
            // console.log(response);

            // Store the image details
            var img = new Image();
            var resolution = [];
            img.addEventListener("load", function(){
                resolution.push(this.naturalWidth);
                resolution.push(this.naturalHeight);
            });
            img.src = "http://127.0.0.1:3000/uploads/" + response.filename.replace(/ /g, '%20');

            image = {
                // size: response.size,
                size: resolution,
                url: "http://127.0.0.1:3000/uploads/" + response.filename.replace(/ /g, '%20')
                };
            console.log(image);
            // Populate the dialog
            dialog.populate(image.url, image.size);

        } else {
            // The request failed, notify the user
            new ContentTools.FlashUI('no');
        }
    }

    // Set the dialog state to uploading and reset the progress bar to 0
    dialog.state('uploading');
    dialog.progress(0);

    // Build the form data to post to the server
    formData = new FormData();
    formData.append('image', file);


    // debugger

    // $.ajax({
    //   url: '/blog-image',
    //   method: 'POST',
    //   cache: false,
    //   contentType: false,
    //   processData: false,
    //   data: formData,
    //   success: function (e) { new ContentTools.FlashUI('ok') },
    //   error: function (e) { new ContentTools.FlashUI('no') }
    // })

    // Make the request
    xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', xhrProgress);
    xhr.addEventListener('readystatechange', xhrComplete);
    xhr.open('POST', '/blog-image', true);
    xhr.send(formData);
  });

  dialog.addEventListener('imageuploader.save', function () {

    dialog.save(
      image.url,
      image.size
    );

  });

}

ContentTools.IMAGE_UPLOADER = imageUploader;
