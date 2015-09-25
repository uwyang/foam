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
  package: 'foam.apps.builder.administrator',
  name: 'AppWizard',
  extendsModel: 'foam.apps.builder.wizard.WizardPage',

  imports: [
    'selection$',
    'wizardStack',
  ],

  requires: [
    'foam.apps.builder.administrator.NewDAOWizard',
    'foam.apps.builder.administrator.NewOrExistingDAOWizard',
  ],

  properties: [
    {
      name: 'nextViewFactory',
      defaultValue: {
        factory_: 'foam.apps.builder.administrator.NewOrExistingDAOWizard',
      },
    },
    {
      name: 'title',
      defaultValue: 'Name your Admin',
    },
    {
      model_: 'foam.apps.builder.wizard.WizardViewFactoryProperty',
      name: 'modelViewFactory',
      defaultValue: {
        factory_: 'foam.apps.builder.administrator.NewOrExistingModelWizard',
      },
    },
  ],

  methods: [
    function init() {
      this.wizardStack.push(this.modelViewFactory);
      this.SUPER();
    },

    function onNext() {
      this.SUPER(); // puts the app into the main dao
      this.selection = this.data; // imported selection from browser's main list
    }
  ],

  templates: [


    function instructionHTML() {/*
      <p>Choose a name for your new Admin. The name should
        be a few words to indicate the purpose, such as &quot;new patient&quot;
        or &quot;customer service survey&quot;
      </p>
    */},

    function contentHTML() {/*
      $$appName
    */},
  ],


});