import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { SubmissionModalComponent, AuctionListing } from './components/submission-modal/submission-modal.component';
import { FormField, VEHICLE_FORM_CONFIG, PROPERTY_FORM_CONFIG } from './data/form-configurations';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DynamicFormComponent, SubmissionModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bidding-platform-poc';
  
  // Current form configuration being displayed
  currentFormConfig: FormField[] = VEHICLE_FORM_CONFIG;
  
  // Available form configurations for testing
  formConfigurations = {
    vehicle: VEHICLE_FORM_CONFIG,
    property: PROPERTY_FORM_CONFIG
  };

  // Modal properties
  isModalVisible = false;
  submissionResult: AuctionListing | null = null;

  constructor(private readonly formService: FormService) {}

  onFormSubmit(formData: any) {
    console.log('Form submitted with data:', formData);
    
    // Simulate API submission
    this.formService.submitForm(formData).subscribe({
      next: (result) => {
        console.log('Submission result:', result);
        this.submissionResult = result.data;
        this.isModalVisible = true;
      },
      error: (error) => {
        console.error('Submission error:', error);
        alert('Error submitting form. Please try again.');
      }
    });
  }

  onFormReset() {
    console.log('Form has been reset');
  }

  onModalClose() {
    this.isModalVisible = false;
    this.submissionResult = null;
  }

  switchFormConfig(configName: 'vehicle' | 'property') {
    console.log(`Switching from ${this.currentFormConfig.length} fields to ${configName} form configuration`);
    this.currentFormConfig = this.formConfigurations[configName];
    console.log(`Switched to ${configName} form configuration with ${this.currentFormConfig.length} fields`);
  }
}
