import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client, PanelAdministratorDataOut, UserDataOut } from '../api/api-reference';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-admin',
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss',
})
export class DashboardAdminComponent implements OnInit {
  users: UserDataOut[] | undefined = [];
  panels: PanelAdministratorDataOut[] | undefined = [];

  constructor(private client: Client, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getUsers();
    this.getPanels();
  }

  getUsers(){
    this.client.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.data;
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  getPanels(){
    this.client.getAllPanels().subscribe({
      next: (response) => {
        this.panels = response.data;
      },
      error: (err) => {
        this.toastr.error(err);
      },
    })
  }

  blockPanel(panelId: number){
    this.client.blockPanel(panelId).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.getPanels();
      },
      error: (err) => {
        this.toastr.error(err);
      },
    })
  }

  unblockPanel(panelId: number){
    this.client.unblockPanel(panelId).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.getPanels();
      },
      error: (err) => {
        this.toastr.error(err);
      },
    })
  }

  blockUser(userId: number){
    this.client.blockUser(userId).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.getUsers();
      },
      error: (err) => {
        this.toastr.error(err);
      },
    })
  }

  unblockUser(userId: number){
    this.client.unblockUser(userId).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.getUsers();
      },
      error: (err) => {
        this.toastr.error(err);
      },
    })
  }
}