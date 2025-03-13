import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from './report1.service';
import { AccountUser } from './report1.model';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-report1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.scss']
})
export class Report1Component implements OnInit {
  dateFilterModalRef?: BsModalRef; // Reference to the modal
  selectedStartDate: string | null = null;
  selectedEndDate: string | null = null;
  dateFilterForm: FormGroup;
  validatorReports: AccountUser[] = [];
  errorMessage: string | null = null;
  others : number | null = null

  constructor(
    private reportService: ReportService,
    private modalService: BsModalService // Inject BsModalService
  ) {}

  ngOnInit() {
    // Initialize the date filter form with validation
    this.dateFilterForm = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required])
    }, { validators: this.dateRangeValidator });
    this.loadFiltersFromLocalStorage()
    // Fetch initial report data
    this.fetchValidatorReport();
  }

  // Custom validator for date range
  dateRangeValidator(form: FormGroup) {
    const startDate = form.get('startDate').value;
    const endDate = form.get('endDate').value;
    if (startDate && endDate && moment(endDate).isBefore(startDate)) {
      return { dateRangeInvalid: true };
    }
    return null;
  }

  // Fetch validator report from the service
  fetchValidatorReport() {
    this.reportService.getValidatorReport(this.selectedStartDate, this.selectedEndDate).subscribe({
      next: (data) => {
        this.validatorReports = data;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching validator report. Please try again later.';
        console.error('Error fetching validator report:', err);
      }
    });
  }

  // Open the date filter modal
  openDateFilterModal(template: TemplateRef<any>) {
    // Patch form values with selected dates
    this.dateFilterForm.patchValue({
      startDate: this.selectedStartDate || '',
      endDate: this.selectedEndDate || ''
    });

    // Open the modal
    this.dateFilterModalRef = this.modalService.show(template);
  }

  // Apply date filter
  applyDateFilter(): void {
    if (this.dateFilterForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill out the form correctly.',
      });
      return;
    }

    const startDate = this.dateFilterForm.get('startDate').value;
    const endDate = this.dateFilterForm.get('endDate').value;

    // Update selected dates
    this.selectedStartDate = startDate;
    this.selectedEndDate = endDate;
    this.saveFiltersToLocalStorage()
    // Fetch data with the new date range
    this.fetchValidatorReport();

    // Close the modal
    this.closeDateFilterModal();
  }

  // Clear date filter
  clearDateFilter(): void {
    this.selectedStartDate = null;
    this.selectedEndDate = null;
    this.dateFilterForm.reset();
    this.saveFiltersToLocalStorage()
    this.fetchValidatorReport();
    this.closeDateFilterModal();
  }

  // Close the date filter modal
  closeDateFilterModal(): void {
    this.dateFilterModalRef?.hide();
  }

  // Handle start date change
  onStartDateChange(event: Event): void {
    const startDate = (event.target as HTMLInputElement).value;
    this.dateFilterForm.get('endDate').setValue('');
    this.dateFilterForm.get('endDate').updateValueAndValidity();
  }

  // Handle end date change
  onEndDateChange(event: Event): void {
    const endDate = (event.target as HTMLInputElement).value;
    this.dateFilterForm.get('startDate').updateValueAndValidity();
  }

  // Save filters to local storage (optional)
  saveFiltersToLocalStorage() {
    localStorage.setItem('startDate', this.selectedStartDate || '');
    localStorage.setItem('endDate', this.selectedEndDate || '');
  }

  private loadFiltersFromLocalStorage() {
    this.selectedStartDate = localStorage.getItem('startDate');
    this.selectedEndDate = localStorage.getItem('endDate');

  }
}