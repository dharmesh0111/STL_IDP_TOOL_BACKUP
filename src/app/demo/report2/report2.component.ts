import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Report2Service } from './report2.service';
import { AgingReport } from './report2.model';

@Component({
  selector: 'app-report2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report2.component.html',
  styleUrls: ['./report2.component.scss']
})
export class Report2Component implements OnInit {
  agingReports: AgingReport[] = [];
  errorMessage: string | null = null;
  selectedStage: string | null = null;
  stages: { id: string; action: string }[] = [
    { id: '3', action: 'Pending' },
    { id: '2', action: 'Exception' }
  ];

  constructor(private report2Service: Report2Service) {}

  ngOnInit() {
    this.loadFiltersFromLocalStorage()
    this.fetchAgingReport();
  }

  fetchAgingReport() {
    this.report2Service.getAgingReport(this.selectedStage).subscribe({
      next: (data) => {
        this.agingReports = data;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching aging report. Please try again later.';
        console.error('Error fetching aging report:', err);
      }
    });
  }

  filterByStage(stage: string) {
    this.selectedStage = stage === 'all' ? null : stage;
    this.saveFiltersToLocalStorage();
    this.fetchAgingReport();
  }

  private saveFiltersToLocalStorage() {
    localStorage.setItem('selectedStage', this.selectedStage || '');
  }

  private loadFiltersFromLocalStorage() {
    this.selectedStage = localStorage.getItem('selectedStage');

  }
}
