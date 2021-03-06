window.addEventListener('load', function() {
    var editor;

    ContentTools.StylePalette.add([
      new ContentTools.Style('Author', 'author', ['p'])
    ]);

    // initialize the editor
    editor = ContentTools.EditorApp.get();
    editor.init('*[data-editable]', 'data-name');

    // listen for saved events
    editor.addEventListener('saved', function (ev) {
      var name, payload, regions, xhr;
      var onStateChange, passive;

      // Check if this was a passive save
      passive = ev.detail().passive;

      // Check that something changed
      regions = ev.detail().regions;
      if (Object.keys(regions).length == 0) {
          return;
      }

      // Set the editor as busy while we save our changes
      this.busy(true);

      // Collect the contents of each region into a FormData instance
      payload = new FormData();
      for (name in regions) {
          if (regions.hasOwnProperty(name)) {
              payload.append(name, regions[name]);
          }
      }

      payload = new FormData();
      payload.append(
          'blog',
          document.querySelector('meta[name=blog]').getAttribute('content')
          );
      payload.append('regions', JSON.stringify(regions));

      // Send the update content to the server to be saved
      function onStateChange(ev) {
          // Check if the request is finished
          if (ev.target.readyState == 4) {
              editor.busy(false);
              if (ev.target.status == '200') {
                  // Save was successful, notify the user with a flash
                  // check if its passive
                  if (!passive) {
                    new ContentTools.FlashUI('ok');
                  }
              } else {
                  // Save failed, notify the user with a flash
                  new ContentTools.FlashUI('no');
              }
          }
      };

      xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', onStateChange);
      xhr.open('POST', '/save-my-page');
      xhr.send(payload);
    }
  );
});
