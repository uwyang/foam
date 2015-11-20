/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

CLASS({
  package: 'com.google.ow.ui',
  name: 'PreviewImageView',
  extends: 'foam.u2.View',

  properties: [ [ 'nodeName', 'IMG' ] ],

  methods: [
    function initE() {
      return this.attrs({
        // TODO(markdittmer): This should be on this.data change and
        // this.data.dataUrl change. Support for nested dependencies in u2 still
        // in the works.
        src: function() {
          return (this.data && this.data.data && this.data.data.preview) ? this.data.data.preview : '';
        }.bind(this).on$(this.X, this.data$),
        width: 80,
        height: 50
      }).style({ 'margin': '4px' });
    },
  ],
});
