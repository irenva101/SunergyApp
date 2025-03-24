import { Component } from '@angular/core';
import { Client, RegisterDataIn, Role } from '../../api/api-reference';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  data: RegisterDataIn = new RegisterDataIn();
  constructor(private client: Client, private toastr: ToastrService, private router: Router,) {}
  Role=Role;

  roles: Role[] = Object.keys(Role)
    .filter((key) => isNaN(Number(key)))
    .map((key) => Role[key as keyof typeof Role]);

  onSubmit() {
    this.client.register(this.data).subscribe({
      next: (response) => {
        this.toastr.success('You have successfully registered.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }
}
