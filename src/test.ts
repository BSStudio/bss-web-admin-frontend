// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing'
import { getTestBed } from '@angular/core/testing'
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'
import { MockInstance, ngMocks } from 'ng-mocks'

ngMocks.autoSpy('jasmine')

// auto restore for jasmine and jest <27
jasmine.getEnv().addReporter({
  specDone: MockInstance.restore,
  specStarted: MockInstance.remember,
  suiteDone: MockInstance.restore,
  suiteStarted: MockInstance.remember,
})

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
