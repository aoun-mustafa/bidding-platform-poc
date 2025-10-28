import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormField } from '../data/form-configurations';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  const mockFormConfig: FormField[] = [
    {
      attribute_name: 'firstName',
      display_label: 'First Name',
      control_type: 'text',
      options: null,
      is_required: true,
      sort_order: 1
    },
    {
      attribute_name: 'age',
      display_label: 'Age',
      control_type: 'number',
      options: null,
      is_required: false,
      sort_order: 2
    },
    {
      attribute_name: 'country',
      display_label: 'Country',
      control_type: 'select',
      options: ['USA', 'Canada', 'UK'],
      is_required: true,
      sort_order: 3
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form config', () => {
    expect(component.formConfig).toEqual([]);
    expect(component.sortedFields).toEqual([]);
  });

  it('should sort fields by sort_order', () => {
    const unsortedConfig: FormField[] = [
      { ...mockFormConfig[2], sort_order: 3 },
      { ...mockFormConfig[0], sort_order: 1 },
      { ...mockFormConfig[1], sort_order: 2 }
    ];
    
    component.formConfig = unsortedConfig;
    component.ngOnInit();
    
    expect(component.sortedFields[0].sort_order).toBe(1);
    expect(component.sortedFields[1].sort_order).toBe(2);
    expect(component.sortedFields[2].sort_order).toBe(3);
  });

  it('should build form with correct controls', () => {
    component.formConfig = mockFormConfig;
    component.ngOnInit();
    
    expect(component.dynamicForm.get('firstName')).toBeTruthy();
    expect(component.dynamicForm.get('age')).toBeTruthy();
    expect(component.dynamicForm.get('country')).toBeTruthy();
  });

  it('should set required validator for required fields', () => {
    component.formConfig = mockFormConfig;
    component.ngOnInit();
    
    const firstNameControl = component.dynamicForm.get('firstName');
    const ageControl = component.dynamicForm.get('age');
    
    expect(firstNameControl?.hasError('required')).toBe(true);
    expect(ageControl?.hasError('required')).toBe(false);
  });

  it('should emit formSubmit when form is valid', () => {
    spyOn(component.formSubmit, 'emit');
    
    component.formConfig = mockFormConfig;
    component.ngOnInit();
    
    // Fill form with valid data
    component.dynamicForm.patchValue({
      firstName: 'John',
      age: 25,
      country: 'USA'
    });
    
    component.onSubmit();
    
    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      firstName: 'John',
      age: 25,
      country: 'USA'
    });
  });

  it('should not emit formSubmit when form is invalid', () => {
    spyOn(component.formSubmit, 'emit');
    
    component.formConfig = mockFormConfig;
    component.ngOnInit();
    
    // Leave required fields empty
    component.onSubmit();
    
    expect(component.formSubmit.emit).not.toHaveBeenCalled();
  });

  it('should reset form when onReset is called', () => {
    spyOn(component.formReset, 'emit');
    
    component.formConfig = mockFormConfig;
    component.ngOnInit();
    
    // Fill form with data
    component.dynamicForm.patchValue({
      firstName: 'John',
      age: 25
    });
    
    component.onReset();
    
    expect(component.dynamicForm.get('firstName')?.value).toBe(null);
    expect(component.dynamicForm.get('age')?.value).toBe(null);
    expect(component.formReset.emit).toHaveBeenCalled();
  });

  it('should return correct error message for invalid fields', () => {
    component.formConfig = mockFormConfig;
    component.ngOnInit();
    
    const firstNameControl = component.dynamicForm.get('firstName');
    firstNameControl?.markAsTouched();
    
    const errorMessage = component.getFieldError('firstName');
    expect(errorMessage).toBe('First Name is required.');
  });

  it('should validate field state correctly', () => {
    component.formConfig = mockFormConfig;
    component.ngOnInit();
    
    const firstNameControl = component.dynamicForm.get('firstName');
    
    // Initially untouched and invalid
    expect(component.isFieldInvalid('firstName')).toBe(false);
    expect(component.isFieldValid('firstName')).toBe(false);
    
    // Mark as touched (still invalid)
    firstNameControl?.markAsTouched();
    expect(component.isFieldInvalid('firstName')).toBe(true);
    expect(component.isFieldValid('firstName')).toBe(false);
    
    // Set valid value
    firstNameControl?.setValue('John');
    expect(component.isFieldInvalid('firstName')).toBe(false);
    expect(component.isFieldValid('firstName')).toBe(true);
  });
});