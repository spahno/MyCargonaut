import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Subscription} from 'rxjs';
import {NavController, Platform} from '@ionic/angular';

declare var google;

@Component({
    selector: 'app-tracking2',
    templateUrl: './tracking2.page.html',
    styleUrls: ['./tracking2.page.scss'],
})
export class Tracking2Page implements OnInit {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    currentMapTrack = null;

    isTracking = false;
    // trackedRoute = [];
    previousTracks = [];

    positionSubscription: Subscription;

    constructor(public navCtrl: NavController,
                private plt: Platform,
                private geolocation: Geolocation) {
        // private storage: Storage) {
    }

    ngOnInit() {
        this.plt.ready().then(() => {
            // this.loadHistoricRoutes();

            const mapOptions = {
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false
            };
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            this.geolocation.getCurrentPosition().then(pos => {
                const latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                this.map.setCenter(latLng);
                this.map.setZoom(16);
            }).catch((error) => {
                console.log('Error getting location', error);
            });
        });
    }

    /*loadHistoricRoutes() {
        this.storage.get('routes').then(data => {
            if (data) {
                this.previousTracks = data;
            }
        });
    }*/


    /*startTracking() {
        this.isTracking = true;
        this.trackedRoute = [];

        this.positionSubscription = this.geolocation.watchPosition()
            .pipe(
                filter((p) => p.coords !== undefined) //Filter Out Errors
            )
            .subscribe(data => {
                setTimeout(() => {
                    this.trackedRoute.push({lat: data.coords.latitude, lng: data.coords.longitude});
                    this.redrawPath(this.trackedRoute);
                }, 0);
            });

    }*/

    /*redrawPath(path) {
        if (this.currentMapTrack) {
            this.currentMapTrack.setMap(null);
        }

        if (path.length > 1) {
            this.currentMapTrack = new google.maps.Polyline({
                path: path,
                geodesic: true,
                strokeColor: '#ff00ff',
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
            this.currentMapTrack.setMap(this.map);
        }
    }*/

    /*stopTracking() {
        const newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
        this.previousTracks.push(newRoute);
        this.storage.set('routes', this.previousTracks);

        this.isTracking = false;
        this.positionSubscription.unsubscribe();
        this.currentMapTrack.setMap(null);
    }

    showHistoryRoute(route) {
        this.redrawPath(route);
    }*/
}
