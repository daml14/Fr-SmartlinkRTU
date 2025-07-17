import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerloadService {

  public isLoading:WritableSignal<boolean> = signal<boolean>(false);

  public Show(){
    this.isLoading.set(true);
  }

  public Hide(){
    this.isLoading.set(false);
  }
}
