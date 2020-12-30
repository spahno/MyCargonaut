import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tracking2Page } from './tracking2.page';

describe('Tracking2Page', () => {
  let component: Tracking2Page;
  let fixture: ComponentFixture<Tracking2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tracking2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tracking2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
