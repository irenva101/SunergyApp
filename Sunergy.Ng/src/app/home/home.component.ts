import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Client, PanelDto, StringDataIn } from '../api/api-reference';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public search: string = '';
  token = localStorage.getItem('token');
  requestData = new StringDataIn({
    pageSize: 10,
    currentPage: 1,
    data: undefined,
  });
  data: PanelDto[] | undefined = [];

  constructor(private client: Client, private toastr: ToastrService) {
    this.reloadTable();
  }

  reloadTable(page?: number) {
    this.client.query(this.requestData).subscribe({
      next: (response) => {
        this.data = response.data;
      },
      error: (err) => {
        this.toastr.error('Something went wrong:' + err);
      },
    });
  }
}
