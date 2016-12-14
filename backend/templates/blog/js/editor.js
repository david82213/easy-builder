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
        error: function (e) { debugger; new ContentTools.FlashUI('no') },
        complete: function (e) { editor.busy(false) }
      })

      // xhr = new XMLHttpRequest();
      // xhr.addEventListener('readystatechange', onStateChange);
      // xhr.open('POST', '/blog-test');
      // xhr.send(payload);
    }
  );
});
