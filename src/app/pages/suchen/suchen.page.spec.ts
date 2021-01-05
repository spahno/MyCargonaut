import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuchenPage } from './suchen.page';

describe('SuchenPage', () => {
  let component: SuchenPage;
  let fixture: ComponentFixture<SuchenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuchenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuchenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
