import { Component, OnInit, Inject, Injectable, signal } from '@angular/core';
import { Chart, ChartItem, ChartType } from 'chart.js/auto';
import { GraficoService } from '../../../services/grafico/grafico.service';

@Component({
  selector: 'app-lineal',
  imports: [],
  templateUrl: './lineal.component.html',
  styleUrl: './lineal.component.css'
})
export class LinealComponent implements OnInit {

  // @ViewChild("chart", {static:false}) gf : HTMLCanvasElement
  constructor(public grafico:GraficoService) {
    setInterval(()=>{
      this.SensorData()
      this.addData(this.chart,'time',1)
    },1500)
   }

  public chart : Chart;

  public std:number[] = []


  SensorData(): void {
    this.grafico.viewDataSensor().subscribe({
      next: (response) => {
        let arraylng = response.length;
        let num = Math.round(response[arraylng - 1]['data']) * 10;
        console.log(num);
  
       
        if (this.std.length >= 9) {
          this.std.shift(); 
        }
  
        this.std.push(num); 
      },
      error: (e) => {
        console.log(e);
      }
    });
  } 

  ngOnInit(): void {
    let arrai = this.dataLinealChart()
    this.linealChart(arrai)
    console.log(this.std)
   }

   linealChart(data){
    const ctx: ChartItem = document.getElementById('chart') as ChartItem;
    this.chart = new Chart( ctx, {
      type: 'line' as ChartType ,
      data:{
        labels: [],
        datasets:data
      }
    });
   }

  addData(chart, label, newData) {
    if(chart.data.labels.length >=9){
      chart.data.labels.shift(label);
    }
    

    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      if(dataset.data.length >= 9){
        dataset.data.shift(newData);
      }
      dataset.data.push(newData);
    });
    chart.update();
  }

   dataLinealChart(){
    console.log(this.std)
    return[
      {
        label: 'Temperature',
        data: this.std,
        fill: false,
        borderColor: 'green',
        backgroundColor: 'green',
        tension: 0.1
      }
      ,
      {
        label: 'Presure',
        data: [1,9,39,9,28,9,2,8,4],
        fill: false,
        borderColor: 'orange',
        backgroundColor: 'orange',
        tension: 0.1
      }
    ]


   }
}


