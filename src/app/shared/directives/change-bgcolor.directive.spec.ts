import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeBgColorDirective } from './change-bgcolor.directive';

@Component({
  template: `
  <td class="align-middle" changeBGcolor="bg-color" [lastModified]="1688541539154">
    {{'Rishabh'}}
  </td>
  `,
  styles: [
    `.bg-color {
      background-color: red;
      color: white
    }`
  ]
})
class TestChangeBFColorComponent {

}
describe('ChangeBgColorDirective', () => {

  let component: TestChangeBFColorComponent;
  let fixture: ComponentFixture<TestChangeBFColorComponent>;
  let tdElem: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestChangeBFColorComponent, ChangeBgColorDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(TestChangeBFColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //initial binding
    tdElem = fixture.debugElement.query(By.css('td'));
  })

  it('should create an instance', () => {
    const directive = ChangeBgColorDirective;
    expect(directive).toBeTruthy();
  });

  it('should change the background of the cell when last activity is 3 minutes ago', () => {
    const directive = ChangeBgColorDirective;
    const dirVar = tdElem.injector.get(directive);
    dirVar.changeClass = 'bg-color';

    // fake timeout
    jasmine.clock().install();
    dirVar.ngAfterViewInit();
    jasmine.clock().tick(3 * 60 * 1000); // https://stackoverflow.com/a/58957018
    expect(dirVar.elementRef.nativeElement.className).toBe('align-middle bg-color');
    jasmine.clock().uninstall();
  });

  it('should not change the background of the cell when last activity is not 3 minutes ago', () => {
    const directive = ChangeBgColorDirective;
    const dirVar = tdElem.injector.get(directive);
    dirVar.changeClass = 'bg-color';
    dirVar.lastModified = new Date().getTime().toString();
    dirVar.ngAfterViewInit();
    expect(dirVar.elementRef.nativeElement.className).toBe('align-middle');
  });
});
