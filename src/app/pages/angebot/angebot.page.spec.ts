import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AngebotPage } from './angebot.page';

describe('AngebotPage', () => {
  let component: AngebotPage;
  let fixture: ComponentFixture<AngebotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngebotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AngebotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
