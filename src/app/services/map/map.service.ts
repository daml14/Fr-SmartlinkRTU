import { Injectable, signal, WritableSignal } from '@angular/core';
import * as L from 'leaflet';
import { latlng } from '../../models/latlng';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }
  private map:any;
  private userMarker: L.Marker<any> | undefined;
  private circle: L.Circle<any> | undefined;
  private isSelectCoord:boolean = false;
  private markerGroup:any 

  coordinates = signal<latlng>({lat:0,lng:0});

  iconRetinaUrl = 'img/marker-icon/marker-icon-2x.png';
  iconDefaultUrl = 'img/marker-icon/marker-icon.png';
  shadowUrl = 'img/marker-icon/marker-shadow.png';


  initMap(L ,lat:string, lng:string){
    this.map = L.map('map').setView([lng, lat],9);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  initMapSelect(L ,lat:string, lng:string, isSelect:boolean){
    this.map = L.map('map').setView([lng, lat],9);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.isSelectCoord = isSelect;
    this.map.on('click',(e: L.LeafletMouseEvent)=>{
      if(this.isSelectCoord){
        const latlng = e.latlng
        if(this.userMarker){
          this.map.removeLayer(this.userMarker);
        }
        this.markerMapSelect(L, latlng.lng,latlng.lat);
        this.coordinates.set(latlng);
      }
    })
  }

  circleMap(L,lat,lng, color, radius,fill){
    if(this.circle){
      this.circle = L.circle([lng, lat],{
        color: color,
        fillColor: fill,
        fillOpacity: 0.5,
        radius: radius
      }).addTo(this.map);
    }else{
      this.circle = L.circle([lng, lat],{
        color: color,
        fillColor: fill,
        fillOpacity: 0.5,
        radius: radius
      }).addTo(this.map);
    }
  }

  markerMap(L, lat,lng, name){
    let iconDefault = L.icon({
      iconUrl:this.iconDefaultUrl,
      iconRetinaUrl:this.iconRetinaUrl,
      shadowUrl:this.shadowUrl,
      iconSize:[25,41],
      iconAnchor: [12, 41] ,
      popupAnchor: [1, -34] ,
      tooltipAnchor: [16, -28] ,
      shadowSize: [41, 41] 
    });

    if(this.userMarker){
      this.userMarker = L.marker([lng,lat],{icon:iconDefault}).addTo(this.map).bindPopup(`${name} Here!`)
      .openPopup();
    }else{
      this.userMarker = L.marker([lng,lat],{icon:iconDefault}).addTo(this.map).bindPopup(`${name} Here!`)
      .openPopup();
    }
  }

  markerMapSelect(L, lat,lng){
    let iconDefault = L.icon({
      iconUrl:this.iconDefaultUrl,
      iconRetinaUrl:this.iconRetinaUrl,
      shadowUrl:this.shadowUrl,
      iconSize:[25,41],
      iconAnchor: [12, 41] ,
      popupAnchor: [1, -34] ,
      tooltipAnchor: [16, -28] ,
      shadowSize: [41, 41] 
    });

    if(this.userMarker){
      this.userMarker = L.marker([lng,lat],{icon:iconDefault}).addTo(this.map)
    }else{
      this.userMarker = L.marker([lng,lat],{icon:iconDefault}).addTo(this.map)
    }
  }

  multiMarkerMap(L, lat,lng, cant){
    let iconDefault = L.icon({
      iconUrl:this.iconDefaultUrl,
      iconRetinaUrl:this.iconRetinaUrl,
      shadowUrl:this.shadowUrl,
      iconSize:[25,41],
      iconAnchor: [12, 41] ,
      popupAnchor: [1, -34] ,
      tooltipAnchor: [16, -28] ,
      shadowSize: [41, 41] 
    });
    let numlat:number = Number(lat);
    let numlng:number = Number(lng) - 0.08;

    if(this.userMarker){
      this.markerGroup = L.featureGroup().addTo(this.map);
      // markerGroup.clearLayers();
      let count:number = 0;
      let count2:number = 0;
      for(let i= 0; i < cant; i++){
        
        let lati = numlat.toString();
        let lngi = numlng.toString();
        this.userMarker = L.marker([lngi,lati],{icon:iconDefault});
        this.markerGroup.addLayer(this.userMarker);
        // this.map.fitBounds(markerGroup.getBounds());
        if(count%2 != 0){
          numlat = numlat - Math.random() * (0.05 - 0.001) + 0.001;
          count = count + 1;
          console.log("<5",count);
        }else{
          numlat = numlat + Math.random() * (0.05 - 0.001) + 0.001;
          count = count + 1;
          console.log("<5",count);
        }
        if(count%2 != 0){
          numlng = numlng + Math.random() * (0.07 - 0.001) + 0.001;;
          count2 = count2 + 1;
          console.log("xd", count);
        }else{
          numlng = numlng - Math.random() * (0.07 - 0.001) + 0.001;
          count2 = count2 + 1;
          console.log("xd", count);
        }
      }
      
    }else{
      this.markerGroup = L.featureGroup().addTo(this.map);
      // markerGroup.clearLayers();
      let count:number = 0;
      let count2:number = 0;
      for(let i= 0; i < cant; i++){
        
        let lati = numlat.toString();
        let lngi = numlng.toString();
        this.userMarker = L.marker([lngi,lati],{icon:iconDefault});
        this.markerGroup.addLayer(this.userMarker);
        // this.map.fitBounds(markerGroup.getBounds());
        if(count%2 != 0){
          numlat = numlat - Math.random() * (0.05 - 0.001) + 0.001;
          count = count + 1;
          console.log("<5",count);
        }else{
          numlat = numlat + Math.random() * (0.05 - 0.001) + 0.001;
          count = count + 1;
          console.log("<5",count);
        }
        if(count%2 != 0){
          numlng = numlng + Math.random() * (0.07 - 0.001) + 0.001;;
          count2 = count2 + 1;
          console.log("xd", count);
        }else{
          numlng = numlng - Math.random() * (0.07 - 0.001) + 0.001;
          count2 = count2 + 1;
          console.log("xd", count);
        }
      }
    }
  }

  cleanMultiMarker(){
    this.markerGroup.clearLayers();
  }


  closeMap(l){
    this.map.remove()
  }
}
