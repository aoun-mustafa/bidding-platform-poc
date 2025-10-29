import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { SubmissionModalComponent, AuctionListing } from '../components/submission-modal/submission-modal.component';
import { JsonConfigModalComponent } from '../components/json-config-modal/json-config-modal.component';
import { FormField, VEHICLE_FORM_CONFIG, PROPERTY_FORM_CONFIG } from '../data/form-configurations';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DynamicFormComponent, SubmissionModalComponent, JsonConfigModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Current form configuration being displayed
  currentFormConfig: FormField[] = VEHICLE_FORM_CONFIG;
  
  // Available form configurations for testing
  formConfigurations = {
    vehicle: VEHICLE_FORM_CONFIG,
    property: PROPERTY_FORM_CONFIG,
    custom: [] as FormField[]
  };

  // Modal properties
  isModalVisible = false;
  submissionResult: AuctionListing | null = null;
  
  // JSON Config Modal
  isJsonConfigModalVisible = false;
  hasCustomConfig = false;

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

  switchFormConfig(configName: 'vehicle' | 'property' | 'custom') {
    if (configName === 'custom' && !this.hasCustomConfig) {
      this.openJsonConfigModal();
      return;
    }
    console.log(`Switching from ${this.currentFormConfig.length} fields to ${configName} form configuration`);
    this.currentFormConfig = this.formConfigurations[configName];
    console.log(`Switched to ${configName} form configuration with ${this.currentFormConfig.length} fields`);
  }

  openJsonConfigModal() {
    this.isJsonConfigModalVisible = true;
  }

  closeJsonConfigModal() {
    this.isJsonConfigModalVisible = false;
  }

  onCustomConfigSubmit(config: FormField[]) {
    console.log('Custom configuration received:', config);
    this.formConfigurations.custom = config;
    this.hasCustomConfig = true;
    this.currentFormConfig = config;
    this.closeJsonConfigModal();
  }

  clearCustomConfig() {
    this.formConfigurations.custom = [];
    this.hasCustomConfig = false;
    // Switch to vehicle form as default after clearing
    this.currentFormConfig = this.formConfigurations.vehicle;
    // Open modal to add new config
    this.openJsonConfigModal();
  }
}
