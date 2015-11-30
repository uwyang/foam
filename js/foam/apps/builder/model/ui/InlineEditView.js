/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


CLASS({
  name: 'InlineEditView',
  package: 'foam.apps.builder.model.ui',
  extends: 'foam.ui.md.DetailView',

  requires: [
    'foam.ui.md.Toolbar',
    'foam.ui.md.FlatButton',
    'foam.apps.builder.model.ui.PropertyEditView',
    'foam.apps.builder.model.ui.IntPropertyEditView',
    'foam.apps.builder.model.ui.StringPropertyEditView',
  ],

  imports: [
    'dao', // the property array of our model
    'stack',
  ],
  exports: [
    'toolbar as mdToolbar',
  ],

  properties: [
    {
      name: 'className',
      defaultValue: 'inline-edit-view',
    },
    {
      name: 'mode',
      defaultValue: 'read-write',
    },
    {
      name: 'toolbar',
      lazyFactory: function() {
        this.Y.registerModel(this.FlatButton.xbind({
          displayMode: 'ICON_ONLY',
          height: 24,
          width: 24,
        }), 'foam.ui.ActionButton');
        return this.Toolbar.create({ data: this.data });
      }
    },
  ],

  actions: [
    {
      name: 'delete',
      help: 'Delete this item.',
      ligature: 'delete',
      isAvailable: function() {
        return (this.mode == 'read-write') &&
          (this.dao && this.dao.remove);
      },
      code: function() {
        if (this.dao && this.dao.remove) {
          this.dao.remove(this.data);
          // our parent view should now destroy this view
          this.stack && this.stack.popView();
        }
      }
    }
  ],

  methods: [
    function init() {
      this.SUPER();
    },
  ],

  templates: [
    function toHTML() {/*
      <div id="%%id" <%= this.cssClassAttr() %>>
        <div class="md-flex-row">
          $$label{
            model_: 'foam.ui.md.TextFieldView',
            inlineStyle: true,
            floatingLabel: false,
          }
          <% this.toolbar.toHTML(out); %>
        </div>
        $$data{ model_: 'foam.apps.builder.model.ui.EditView',
                model: this.data.model_ }
      </div>
    */},
    function CSS() {/*
      .inline-edit-view {
        display: flex;
        flex-direction: column;
        align-content: baseline;
        flex-grow: 1;
        background: white;
        padding: 16px;
        border: 1px solid rgba(0,0,0,0.5);
      }
      .inline-edit-view toolbar {
        flex-shrink: 1;
        flex-grow: 0;
        background-color: transparent;
        color: rgba(0,0,0,0.75);
      }

    */},

  ]

});
