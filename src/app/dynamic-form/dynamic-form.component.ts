import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormField } from '../data/form-configurations';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() formConfig: FormField[] = [];
  @Input() submitButtonText: string = 'Submit';
  @Input() resetButtonText: string = 'Reset';
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formReset = new EventEmitter<void>();

  dynamicForm!: FormGroup;
  sortedFields: FormField[] = [];

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formConfig']) {
      this.initializeForm();
    }
  }

  private initializeForm() {
    if (this.formConfig && this.formConfig.length > 0) {
      this.sortedFields = this.getSortedFields();
      this.buildForm();
    } else {
      this.sortedFields = [];
      this.dynamicForm = this.fb.group({});
    }
  }

  private getSortedFields(): FormField[] {
    return [...this.formConfig].sort((a, b) => a.sort_order - b.sort_order);
  }

  private buildForm() {
    const formControls: { [key: string]: AbstractControl } = {};

    for (const field of this.sortedFields) {
      const validators = [];
      
      if (field.is_required) {
        if (field.control_type === 'checkbox') {
          validators.push(Validators.requiredTrue);
        } else {
          validators.push(Validators.required);
        }
      }

      // Add type-specific validators
      if (field.control_type === 'email') {
        validators.push(Validators.email);
      }

      if (field.control_type === 'number') {
        validators.push(Validators.pattern(/^\d+$/));
      }

      // Set initial value based on field type
      const initialValue = field.control_type === 'checkbox' ? false : '';
      
      formControls[field.attribute_name] = this.fb.control(initialValue, validators);
    }

    this.dynamicForm = this.fb.group(formControls);
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      this.formSubmit.emit(this.dynamicForm.value);
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.dynamicForm);
    }
  }

  onReset() {
    this.dynamicForm.reset();
    this.formReset.emit();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    for (const field of Object.keys(formGroup.controls)) {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    }
  }

  getFieldError(fieldName: string): string {
    const control = this.dynamicForm.get(fieldName);
    if (control && control.invalid && control.touched) {
      const field = this.sortedFields.find(f => f.attribute_name === fieldName);
      
      if (control.errors?.['required']) {
        return `${field?.display_label} is required.`;
      }
      if (control.errors?.['requiredTrue']) {
        return `You must check ${field?.display_label}.`;
      }
      if (control.errors?.['email']) {
        return 'Please enter a valid email address.';
      }
      if (control.errors?.['pattern']) {
        return 'Please enter a valid number.';
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.dynamicForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  isFieldValid(fieldName: string): boolean {
    const control = this.dynamicForm.get(fieldName);
    return !!(control && control.valid && control.touched);
  }
}