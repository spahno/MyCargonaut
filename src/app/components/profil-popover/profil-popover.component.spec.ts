import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilPopoverComponent } from './profil-popover.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

describe('ProfilPopoverComponent', () => {
  let component: ProfilPopoverComponent;
  let fixture: ComponentFixture<ProfilPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilPopoverComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule,
        AngularFireModule.initializeApp(environment.testFirebaseConfig),
        AngularFirestoreModule],
      providers: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
