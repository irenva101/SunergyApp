import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Client, PanelDto, StringDataIn } from '../api/api-reference';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  requestData = new StringDataIn({
    pageSize: 10,
    currentPage: 1,
    data: undefined,
  });
  data: PanelDto[] | undefined = [];
  weather: any;
  private jwtService = new JwtHelperService();
  cumulativePower: number | undefined;
  cumulativeProfit: number | undefined;

  constructor(private client: Client, private toastr: ToastrService) {
    this.reloadTable();
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token);
      const userId = decodedToken.id;
      this.getCumulativePower(userId);
      this.getCumulativeProfit(userId);
    }
  }

  getCumulativePower(userId: number) {
    this.client.getCumulativePower(userId).subscribe({
      next: (response) => {
        this.cumulativePower = response.data;
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  getCumulativeProfit(userId: number) {
    this.client.getCumulativeProfit(userId).subscribe({
      next: (response) => {
        this.cumulativeProfit = response.data;
      },
      error: (err) => {
        this.toastr.warning(err);
      },
    });
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
