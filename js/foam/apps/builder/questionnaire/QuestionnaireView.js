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
  package: 'foam.apps.builder.questionnaire',
  name: 'QuestionnaireView',
  extendsModel: 'foam.ui.View',

  requires: [
    'foam.apps.builder.kiosk.KioskChromeView',
    'foam.apps.builder.Timeout',
    'foam.apps.builder.TOSData',
    'foam.apps.builder.TOSView',
    'foam.apps.builder.questionnaire.QuestionnaireController',
    'foam.ui.md.PopupView',
  ],
  exports: [
    'as kiosk',
    'url$',
    'webview',
    'webview as controller',
  ],

  properties: [
    {
      name: 'data',
      view: 'foam.apps.builder.kiosk.KioskChromeView',
      postSet: function(old, nu) {
        if ( old === nu ) return;
        if ( old ) {
          old.termsOfService$.removeListener(this.onTOSChange);
          old.sessionDataTimeoutTime$.removeListener(this.onCacheTimeoutChange);
          old.sessionTimeoutTime$.removeListener(this.onHomeTimeoutChange);
        }
        if ( nu ) {
          this.tosData.tos = this.data.termsOfService;
          nu.termsOfService$.addListener(this.onTOSChange);
          nu.sessionDataTimeoutTime$.addListener(this.onCacheTimeoutChange);
          nu.sessionTimeoutTime$.addListener(this.onHomeTimeoutChange);
        }
      },
    },
//     {
//       name: 'controller',
//       lazyFactory: function() {
//         return this.QuestionnaireController.create({ appConfig$: this.data$ });
//       }
//     },
    {
      type: 'foam.apps.builder.TOSData',
      name: 'tosData',
      lazyFactory: function() {
        return this.TOSData.create({}, this.Y);
      },
    },
    {
      type: 'foam.ui.md.PopupView',
      name: 'tosView',
      lazyFactory: function() {
        return this.PopupView.create({
          delegate: this.TOSView,
          data$: this.tosData$,
          blockerMode: 'modal'
        }, this.Y);
      },
    },
    {
      type: 'foam.apps.builder.WebView',
      name: 'webview',
      lazyFactory: function() {
        return this.QuestionnaireController.create({ appConfig$: this.data$ });
      },
      postSet: function(old, nu) {
        if ( old ) old.unsubscribe(['action'], this.onWebviewAction);
        if ( nu ) nu.subscribe(['action'], this.onWebviewAction);
      },
    },
    {
      model_: 'StringProperty',
      name: 'url',
    },
    {
      name: 'cacheTimeout',
      factory: function() {
        return this.Timeout.create({
          minutes: this.data ? this.data.sessionDataTimeoutTime : 0,
          callback: this.onCacheTimeout,
        });
      },
    },
    {
      name: 'homeTimeout',
      factory: function() {
        return this.Timeout.create({
          minutes: this.data ? this.data.sessionTimeoutTime : 0,
          callback: this.onHomeTimeout,
        });
      },
    },
  ],

  methods: [
    function initHTML() {
      this.SUPER();
      if ( this.data.termsOfService )
        this.openTOS();
      else
        this.closeTOS();
    },
    function logout() {
      this.webview.ahome(function() {
        this.webview.clearCache();
        this.openTOS();
      }.bind(this));
    },
    function openTOS() {
      this.tosData.accepted = false;
      this.tosView.open(this.$);
    },
    function closeTOS() { this.tosView.close(); },
  ],

  listeners: [
    {
      name: 'onTOSChange',
      code: function() {
        this.tosData.tos = this.data.termsOfService;
        if ( this.tosData.tos )
          this.openTOS();
        else
          this.closeTOS();
      },
    },
    {
      name: 'onWebviewAction',
      code: function() {
        this.cacheTimeout.restart();
        this.homeTimeout.restart();
      },
    },
    {
      name: 'onCacheTimeoutChange',
      code: function() {
        this.cacheTimeout.cancel();
        var minutes = this.data ? this.data.sessionDataTimeoutTime : 0;
        this.cacheTimeout.minutes = minutes;
        if ( minutes ) this.cacheTimeout.start();
      },
    },
    {
      name: 'onHomeTimeoutChange',
      code: function() {
        this.homeTimeout.cancel();
        var minutes = this.data ? this.data.sessionTimeoutTime : 0;
        this.homeTimeout.minutes = minutes;
        if ( minutes ) this.homeTimeout.start();
      },
    },
    {
      name: 'onCacheTimeout',
      code: function() { this.webview.clearCache(); },
    },
    {
      name: 'onHomeTimeout',
      code: function() {
        this.url = this.data.homepage;
        this.openTOS();
      },
    },
  ],

  templates: [
    function toHTML() {/*
      <kiosk id="%%id" <%= this.cssClassAttr() %>>
        %%tosView
        $$data
        %%webview
      </kiosk>
    */},
    function CSS() {/*
      kiosk {
        position: relative;
        flex-direction: column;
      }
      kiosk, kiosk .kiosk-webview {
        display: flex;
        flex-grow: 1;
      }
      kiosk kiosk-chrome {
        z-index: 2;
      }
      kiosk .kiosk-webview {
        z-index: 1;
      }
    */},
  ],
});
