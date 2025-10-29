import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormField, VEHICLE_FORM_CONFIG, PROPERTY_FORM_CONFIG } from '../data/form-configurations';
import { JsonConfigModalComponent } from '../components/json-config-modal/json-config-modal.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, JsonConfigModalComponent],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  filterForm!: FormGroup;
  filterFields: FormField[] = [];
  currentConfig: 'vehicle' | 'property' | 'custom' = 'vehicle';
  
  formConfigurations = {
    vehicle: VEHICLE_FORM_CONFIG,
    property: PROPERTY_FORM_CONFIG,
    custom: [] as FormField[]
  };

  // JSON Config Modal
  isJsonConfigModalVisible = false;
  hasCustomConfig = false;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.switchConfig('vehicle');
  }

  switchConfig(configType: 'vehicle' | 'property' | 'custom') {
    if (configType === 'custom' && !this.hasCustomConfig) {
      this.openJsonConfigModal();
      return;
    }
    this.currentConfig = configType;
    this.filterFields = this.getSortedFields(this.formConfigurations[configType]);
    this.buildFilterForm();
  }

  private getSortedFields(config: FormField[]): FormField[] {
    return [...config].sort((a, b) => a.sort_order - b.sort_order);
  }

  private buildFilterForm() {
    const formControls: { [key: string]: any } = {};

    for (const field of this.filterFields) {
      // Initialize all filter controls with empty values
      if (field.control_type === 'checkbox') {
        formControls[field.attribute_name] = this.fb.control(null);
      } else {
        formControls[field.attribute_name] = this.fb.control('');
      }
    }

    this.filterForm = this.fb.group(formControls);
  }

  onApplyFilters() {
    const filterValues = this.filterForm.value;
    
    // Remove empty values
    const activeFilters = Object.keys(filterValues).reduce((acc: any, key) => {
      const value = filterValues[key];
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    console.log('Applied Filters:', activeFilters);
    console.log('Filter Configuration:', this.currentConfig);
    
    // Here you would typically call a service to fetch filtered data
    // this.dataService.getFilteredData(activeFilters);
  }

  onResetFilters() {
    this.filterForm.reset();
    console.log('Filters reset');
  }

  getFieldType(field: FormField): string {
    return field.control_type;
  }

  isNumberField(field: FormField): boolean {
    return field.control_type === 'number';
  }

  isSelectField(field: FormField): boolean {
    return field.control_type === 'select';
  }

  isTextField(field: FormField): boolean {
    return field.control_type === 'text' || field.control_type === 'email' || field.control_type === 'tel';
  }

  isCheckboxField(field: FormField): boolean {
    return field.control_type === 'checkbox';
  }

  isDateField(field: FormField): boolean {
    return field.control_type === 'date';
  }

  openJsonConfigModal() {
    this.isJsonConfigModalVisible = true;
  }

  closeJsonConfigModal() {
    this.isJsonConfigModalVisible = false;
  }

  onCustomConfigSubmit(config: FormField[]) {
    console.log('Custom filter configuration received:', config);
    this.formConfigurations.custom = config;
    this.hasCustomConfig = true;
    this.currentConfig = 'custom';
    this.filterFields = this.getSortedFields(config);
    this.buildFilterForm();
    this.closeJsonConfigModal();
  }

  clearCustomConfig() {
    this.formConfigurations.custom = [];
    this.hasCustomConfig = false;
    // Switch to vehicle filters as default after clearing
    this.switchConfig('vehicle');
    // Open modal to add new config
    this.openJsonConfigModal();
  }
}