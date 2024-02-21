import { ngMocks } from 'ng-mocks'
import { DefaultTitleStrategy, TitleStrategy } from '@angular/router'
import { MockService } from 'ng-mocks'
import { CommonModule } from '@angular/common'
import { ApplicationModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MockInstance } from 'ng-mocks'

// auto spy
ngMocks.autoSpy('jasmine')

// In case, if you use @angular/router and Angular 14+.
// You might want to set a mock of DefaultTitleStrategy as TitleStrategy.
// A14 fix: making DefaultTitleStrategy to be a default mock for TitleStrategy
ngMocks.defaultMock(TitleStrategy, () => MockService(DefaultTitleStrategy))

// Usually, *ngIf and other declarations from CommonModule aren't expected to be mocked.
// The code below keeps them.
ngMocks.globalKeep(ApplicationModule, true)
ngMocks.globalKeep(CommonModule, true)
ngMocks.globalKeep(BrowserModule, true)

// auto restore for jasmine
// declare const jasmine: any;
jasmine.getEnv().addReporter({
  specDone: MockInstance.restore,
  specStarted: MockInstance.remember,
  suiteDone: MockInstance.restore,
  suiteStarted: MockInstance.remember,
})
