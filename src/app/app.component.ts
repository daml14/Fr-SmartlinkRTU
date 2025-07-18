import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Location } from '@angular/common';
import { NgxGaugeModule } from 'ngx-gauge';
import { SpinnerLoadComponent } from './layout/spinner-load/spinner-load.component';
import { NgxPaginationModule } from 'ngx-pagination'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,SweetAlert2Module,NgxGaugeModule,SpinnerLoadComponent,NgxPaginationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  public url:string = '';
  public comp:string = '';
  public otherUrl:string = '';

  constructor(public router:Router, private location:Location ){
    
    this.url = this.location.path();
    this.otherUrl = this.url.substring(0,6);
    this.comp = this.url.substring(0,5);
    
    
  }
  ngOnInit(): void {
  }
 
  title = 'Smartlink';
}
