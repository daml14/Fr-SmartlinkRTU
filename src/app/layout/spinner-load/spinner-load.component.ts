import { Component, inject } from '@angular/core';
import { SpinnerloadService } from '../../services/spinnerload/spinnerload.service';

@Component({
  selector: 'app-spinner',
  standalone:true,
  imports: [],
  templateUrl: './spinner-load.component.html',
  styleUrl: './spinner-load.component.css'
})
export class SpinnerLoadComponent {

  private readonly spinnerService = inject(SpinnerloadService);

  isLoading = this.spinnerService.isLoading;



}
