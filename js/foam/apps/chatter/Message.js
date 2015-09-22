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
  package: 'foam.apps.chatter',
  name: 'Message',
  traits: [
    'foam.core.dao.SyncTrait'
  ],
  properties: [
    'id',
    'from',
    'content',
    {
      model_: 'DateTimeProperty',
      name: 'timestamp',
      factory: function() {
        return Date.now();
      }
    }
  ],
  templates: [
    function toDetailHTML() {/*$$timestamp{ model_: 'foam.ui.RelativeDateTimeFieldView', mode: 'read-only'}: $$from{ mode: 'read-only' }&gt; $$content{ mode: 'read-only' }<br/>*/}
  ]
});
