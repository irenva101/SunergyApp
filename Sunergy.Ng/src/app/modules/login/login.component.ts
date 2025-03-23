import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client, LoginDataIn, Role } from '../../api/api-reference';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  dataIn: any;
  data: LoginDataIn = new LoginDataIn();
  private jwtService = new JwtHelperService();
  Role=Role;

  constructor(private client: Client, private toastr: ToastrService, private router: Router,) {}
  onSubmit(){
    this.client.login(this.data).subscribe({
      next: (response)=>{
        this.dataIn=response;
        localStorage.setItem("token", response.data!);
        if(response.data==null)
          this.toastr.error(response.message);
        else{
          this.toastr.success('You have successfully loged in.');
          const decodedToken: any = this.jwtService.decodeToken(response.data);
          const userRole = decodedToken.role; 
          if(userRole === Role.Admin)
            this.router.navigate(['/dashboard-admin'])
          else
          this.router.navigate(['/home']);
        }
      }, 
      error: (err)=> {
        this.toastr.error(err.message);
      }
    })
  }
}


