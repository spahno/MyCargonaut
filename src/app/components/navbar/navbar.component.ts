import {Component, OnInit} from '@angular/core';
import {ChangePageService} from '../../../services/changePage/change-page.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

    constructor(public changePage: ChangePageService) {
    }

}
