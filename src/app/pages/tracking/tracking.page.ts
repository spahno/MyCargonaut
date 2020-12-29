import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {icon, Map, marker, tileLayer} from 'leaflet';

@Component({
    selector: 'app-tracking',
    templateUrl: './tracking.page.html',
    styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {

    customMarkerIcon = icon({
        iconUrl: '../assets/icon/marker.png',
        iconSize: [64, 64],
        popupAnchor: [0, -20]
    });

    constructor(public platform: Platform,
                public router: Router) {
    }

    initMap() {
        const container = document.getElementById('map');
        if (container) {
            const map = new Map('map').setView([33.6396965, -84.4304574], 23);
            tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            marker([33.6396965, -84.4304574], {icon: this.customMarkerIcon})
                .bindPopup()
                // .on('click', () => this.router.navigateByUrl('/tracking'))
                .addTo(map);
            // .openPopup();
        }
    }

    ngOnInit() {
        this.initMap();
    }
}
