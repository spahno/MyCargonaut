import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuftraegePage } from './auftraege.page';

describe('AuftraegePage', () => {
  let component: AuftraegePage;
  let fixture: ComponentFixture<AuftraegePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuftraegePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuftraegePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
