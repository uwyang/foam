/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

// TODO: Move into NumberFormatter
var CALC_useComma = (0.5).toLocaleString(window.navigator.languages[0]).substring(1,2) == ',';

CLASS({
  name: 'NumberFormatter',
  package: 'foam.apps.calc',
  messages: [
    {
      name: 'NaN',
      value: 'Not a number',
      translationHint: 'description of a value that isn\'t a number'
    }
  ],
  constants: [
    {
      name: 'formatNumber',
      todo: multiline(function() {/* Add "infinity" to NumberFormatter
        messages; this requires messages speechLabel support */}),
      value: function(n) {
        // the regex below removes extra zeros from the end,
        // or middle of exponentials
        return typeof n === 'string' ? n :
            Number.isNaN(n)       ? this.NaN :
            ! Number.isFinite(n)  ? '∞' :
            parseFloat(n).toPrecision(12)
            .replace( /(?:(\d+\.\d*[1-9])|(\d+)(?:\.))(?:(?:0+)$|(?:0*)(e.*)$|$)/ ,"$1$2$3");
      }
    },
    {
      name: 'i18nNumber',
      value: function(n) {
        
        return CALC_useComma ? n.replace(/\./g, ',') : n;
      }
    }
  ]
  
});
