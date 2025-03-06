import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-admin',
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss',
})
export class DashboardAdminComponent implements OnInit {
  users: UserDataOut[] | undefined = [];
  panels: PanelDataOut[] | undefined = [];
  ngOnInit(): void {
    this.users = [
      new UserDataOut('irena@gmail.com', 'Irena', 'Varga', true),
      new UserDataOut('tanja@gmail.com', 'Tanja', 'Savic', false),
      new UserDataOut('milan@gmail.com', 'Milan', 'Milic', true),
    ];
    this.panels = [
      new PanelDataOut(
        'Beograd',
        'admin@example.com',
        'Irena',
        'Varga',
        true
      ),
      new PanelDataOut(
        'Becej Max Sunner',
        'user@example.com',
        'Marko',
        'Petrović',
        false
      ),
      new PanelDataOut(
        'Sunergy',
        'support@example.com',
        'Ana',
        'Jovanović',
        true
      ),
    ];
  }
}

export class UserDataOut {
  email?: string;
  firstName?: string;
  lastName?: string;
  status?: boolean;

  constructor(
    email?: string,
    firstName?: string,
    lastName?: string,
    status?: boolean
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.status = status;
  }
}

export class PanelDataOut {
  name?: string;
  userEmail?: string;
  firstName?: string;
  lastName?: string;
  status?: boolean;

  constructor(
    name?: string,
    userEmail?: string,
    firstName?: string,
    lastName?: string,
    status?: boolean
  ) {
    this.name = name;
    this.userEmail = userEmail;
    this.firstName = firstName;
    this.lastName = lastName;
    this.status = status;
  }
}
