import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPackageModule } from '../../../shared/modules/mat-package.module';
import { ErrorContainerComponent } from './error-container.component';

describe('ErrorContainerComponent', () => {
  let component: ErrorContainerComponent;
  let fixture: ComponentFixture<ErrorContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorContainerComponent],
      imports: [
        MatPackageModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ErrorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit refreshCall event', () => {
    spyOn(component.refreshCall, 'emit');
    const nativeElement = fixture.nativeElement;

    const button = nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.refreshCall.emit).toHaveBeenCalled();
  })

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
