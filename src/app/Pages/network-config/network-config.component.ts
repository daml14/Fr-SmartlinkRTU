import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-network-config',
  imports: [ CommonModule,
    ReactiveFormsModule, 
    TranslateModule],
  templateUrl: './network-config.component.html',
  styleUrl: './network-config.component.css'
})
export class NetworkConfigComponent {

  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private location = inject(Location);

  // Propiedad para el FormGroup
  public networkForm!: FormGroup;

  // Patrón de validación para direcciones IP 
  private ipPattern = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

  ngOnInit(): void {
    // Inicialización del formulario
    this.networkForm = this.fb.group({
      configType: ['dhcp', Validators.required], // Valor por defecto es 'dhcp'
      ipAddress: [''],
      subnetMask: [''],
      gateway: [''],
      primaryDns: [''],
      secondaryDns: [''] // El DNS secundario es opcional
    });

    // Escuchar cambios en el tipo de configuración para ajustar las validaciones
    this.networkForm.get('configType')?.valueChanges.subscribe(value => {
      this.updateValidators(value === 'static');
    });
  }
 ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
     window.location.reload(); //change
     }
  }
  // Método para actualizar las validaciones dinámicamente
  updateValidators(isStatic: boolean): void {
    const fields = ['ipAddress', 'subnetMask', 'gateway', 'primaryDns'];
    
    if (isStatic) {
      fields.forEach(field => {
        this.networkForm.get(field)?.setValidators([
          Validators.required,
          Validators.pattern(this.ipPattern)
        ]);
        this.networkForm.get(field)?.updateValueAndValidity();
      });
      // El DNS secundario solo necesita validación de patrón si se rellena
      this.networkForm.get('secondaryDns')?.setValidators([Validators.pattern(this.ipPattern)]);
      this.networkForm.get('secondaryDns')?.updateValueAndValidity();

    } else {
      // Si es DHCP, limpiar validadores y valores de los campos estáticos
      fields.forEach(field => {
        this.networkForm.get(field)?.clearValidators();
        this.networkForm.get(field)?.setValue('');
        this.networkForm.get(field)?.updateValueAndValidity();
      });
      this.networkForm.get('secondaryDns')?.clearValidators();
      this.networkForm.get('secondaryDns')?.setValue('');
      this.networkForm.get('secondaryDns')?.updateValueAndValidity();
    }
  }

  // Getter para verificar fácilmente en la plantilla si el modo es estático
  get isStatic(): boolean {
    return this.networkForm.get('configType')?.value === 'static';
  }

  // Método para manejar el envío del formulario
  saveConfiguration(): void {
    if (this.networkForm.invalid) {
      // Marcar todos los campos como "tocados" para mostrar los errores
      this.networkForm.markAllAsTouched();
      console.error('Formulario inválido');
      return;
    }
    console.log('Configuración a guardar:', this.networkForm.value);
    // Aquí iría la llamada al servicio para guardar los datos
  }

  // Método para el botón de volver
  exit(): void {
    this.location.back();
  }
}

