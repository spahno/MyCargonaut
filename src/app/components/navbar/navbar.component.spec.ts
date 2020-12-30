import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule, NavController} from '@ionic/angular';

import {NavbarComponent} from './navbar.component';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavbarComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    /*it('should create', () => {
        expect(component).toBeTruthy();
    });*/
});
