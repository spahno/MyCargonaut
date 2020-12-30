import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GesuchPage } from './gesuch.page';

describe('GesuchPage', () => {
  let component: GesuchPage;
  let fixture: ComponentFixture<GesuchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GesuchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GesuchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
