import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FahrzeugdetailsComponent } from './fahrzeugdetails.component';

describe('FahrzeugdetailsComponent', () => {
  let component: FahrzeugdetailsComponent;
  let fixture: ComponentFixture<FahrzeugdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FahrzeugdetailsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FahrzeugdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
