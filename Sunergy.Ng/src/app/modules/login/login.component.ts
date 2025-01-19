import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client, LoginDataIn } from '../../api/api-reference';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  dataIn: any;
  data: LoginDataIn = new LoginDataIn();

  constructor(private client: Client, private toastr: ToastrService, private router: Router,) {}
  onSubmit(){
    this.client.login(this.data).subscribe({
      next: (response)=>{
        this.dataIn=response;
        localStorage.setItem("token", response.data!);
        this.toastr.success('You have successfully loged in.');
        this.router.navigate(['/home']);
      }, 
      error: (err)=> {
        this.toastr.error(err);
      }
    })
  }
}
