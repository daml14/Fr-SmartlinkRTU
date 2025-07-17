import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  loginForm:FormGroup;
  username:FormControl;
  password:FormControl;

  viewPwd = false;

  constructor(private loginServ:LoginService,private router:Router){
    this.username = new FormControl('',Validators['required']);
    this.password = new FormControl('', Validators['required']);

    this.loginForm = new FormGroup({
      username : this.username,
      password : this.password
    });
  }

  mLogin(){
    let user:string =  this.username.value;
    let pwd:string = this.password.value;

    this.loginServ.login(user,pwd).subscribe({
      next:(data)=>{
        if(data.token !== 'INTERNAL: Sesion iniciada.'){
          console.log(data.token)
          this.router.navigate(['/home'])
        }else{
          Swal.fire({ 
            title:'SESION YA INICIADA CON ESTE USUARIO!',
            icon:'warning',
            confirmButtonColor: 'green'
          })
        }
      },error:(e)=>{
        console.log(e);
      }
    });
  }

  viewPassword(){
    this.viewPwd = !this.viewPwd;
  }

  ngOnDestroy(): void {
      if(typeof window !== 'undefined'){
        window.location.reload();
      }
  }

}
