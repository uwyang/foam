/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved
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
  name:  'DAOUpdateController',
  label: 'DAO Update',
  package: 'foam.ui',
  
  extendsModel: 'foam.ui.View',

  properties: [
    {
      name:  'data',
      label: 'Edited Object'
    },
    {
      name:  'model',
    },
    {
      name:  'dao',
      label: 'DAO',
    }
  ],

  actions: [
    {
      name:  'save',
      help:  'Save updates.',

      action: function() {
        var self = this;
        this.dao.put(this.data, {
          put: function(value) {
            console.log("Created: ", value);
            self.X.stack.back();
          },
          error: function() {
            console.error("Error creating value: ", arguments);
          }
        });
      }
    },
    {
      name:  'copy',
      help:  'Create a new object which is a copy of this one.',

      action: function() {
      }
    },
    {
      name:  'cancel',
      help:  'Cancel update.',

      action: function() {
        this.X.stack.back();
      }
    },
    {
      name:  'help',
      help:  'View help.',

      action: function() {
        var model = this.data.model_;
        var helpView = this.X.HelpView.create(model);
        this.X.stack.pushView(helpView);
      }
    }
  ],

  methods: {
    init: function() {
      this.SUPER();

      this.view = this.X.AlternateView.create({
        selection: 'GUI',
        data: this.data,
        views: [
          {
            model_: 'ViewChoice',
            label:  'GUI',
            view:   'DetailView'
          },
          {
            model_: 'ViewChoice',
            label:  'JS',
            view:   'JSView'
          },
          {
            model_: 'ViewChoice',
            label:  'XML',
            view:   'XMLView'
          }/*,
             {
             model_: 'ViewChoice',
             label:  'UML',
             view:   'XMLView'
             },
             {
             model_: 'ViewChoice',
             label:  'Split',
             view:   'SplitView'
             }*/
        ]
      });
    },

    toHTML: function() {
      return this.view.toHTML();
    },

    initHTML: function() {
      this.SUPER();
      this.view.initHTML();
    }
  }
});


var ArrayView = DAOController;
