import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppTrimDirective } from './app-trim.directive';

@Component({
  template: `<input placeholder="Task Name" appTrim>`
})
class TestAppTrimComponent {

}

describe('AppTrimDirective', () => {
  let component: TestAppTrimComponent;
  let fixture: ComponentFixture<TestAppTrimComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAppTrimComponent, AppTrimDirective]
    });

    fixture = TestBed.createComponent(TestAppTrimComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should create an instance', () => {
    let elem = {
      nativeElement: document.createComment('div')
    };
    const directive = new AppTrimDirective(elem);
    expect(directive).toBeTruthy();
  });

  it('should trim the space (both side of the text) from textbox after blur event', () => {
    inputEl.nativeElement.value = ' sample ';
    inputEl.triggerEventHandler('blur', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toBe('sample');
  });

  it('should trim the space (starting side of the text) from textbox after blur event', () => {
    inputEl.nativeElement.value = ' sample';
    inputEl.triggerEventHandler('blur', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toBe('sample');
  });

  it('should trim the space (ending side of the text) from textbox after blur event', () => {
    inputEl.nativeElement.value = 'sample ';
    inputEl.triggerEventHandler('blur', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toBe('sample');
  });

  it('should trim the space when no text in the textbox after blur event', () => {
    inputEl.nativeElement.value = '';
    inputEl.triggerEventHandler('blur', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.value).toBe('');
  });
});
