import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {TrackingPage} from './tracking.page';
import {RouterTestingModule} from '@angular/router/testing';

describe('TrackingPage', () => {
    let component: TrackingPage;
    let fixture: ComponentFixture<TrackingPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrackingPage],
            imports: [IonicModule.forRoot(), RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(TrackingPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
