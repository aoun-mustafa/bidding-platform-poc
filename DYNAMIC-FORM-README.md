# Dynamic Form Component

A highly flexible and configurable Angular form component that renders forms dynamically based on JSON configuration.

## Features

- **Dynamic Field Rendering**: Supports text, number, email, tel, date, and select fields
- **Reactive Forms**: Built with Angular Reactive Forms for robust validation and state management
- **Configurable Validation**: Required field validation with extensible validation system
- **Sort Order Support**: Fields render in the order specified by `sort_order` property
- **Type Safety**: Full TypeScript support with proper interfaces
- **Responsive Design**: Mobile-friendly responsive layout
- **Accessibility**: Proper labeling and ARIA attributes
- **Form State Management**: Real-time validation feedback and form state tracking

## Usage

### Basic Implementation

```typescript
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormField } from './data/form-configurations';

// In your component
export class MyComponent {
  formConfig: FormField[] = [
    {
      attribute_name: "firstName",
      display_label: "First Name",
      control_type: "text",
      options: null,
      is_required: true,
      sort_order: 1
    }
    // ... more fields
  ];

  onFormSubmit(formData: any) {
    console.log('Form submitted:', formData);
  }

  onFormReset() {
    console.log('Form reset');
  }
}
```

```html
<app-dynamic-form
  [formConfig]="formConfig"
  [submitButtonText]="'Submit'"
  [resetButtonText]="'Reset'"
  (formSubmit)="onFormSubmit($event)"
  (formReset)="onFormReset()"
></app-dynamic-form>
```

## FormField Interface

```typescript
interface FormField {
  attribute_name: string;           // Unique field identifier
  display_label: string;            // Human-readable label
  control_type: ControlType;        // Field type
  options?: string[] | null;        // Options for select fields
  is_required: boolean;             // Whether field is required
  sort_order: number;               // Display order (ascending)
}

type ControlType = 'text' | 'number' | 'select' | 'email' | 'tel' | 'date';
```

## Supported Field Types

### Text Input
```json
{
  "attribute_name": "description",
  "display_label": "Description",
  "control_type": "text",
  "options": null,
  "is_required": false,
  "sort_order": 1
}
```

### Number Input
```json
{
  "attribute_name": "age",
  "display_label": "Age",
  "control_type": "number",
  "options": null,
  "is_required": true,
  "sort_order": 2
}
```

### Select Dropdown
```json
{
  "attribute_name": "country",
  "display_label": "Country",
  "control_type": "select",
  "options": ["USA", "Canada", "UK", "Australia"],
  "is_required": true,
  "sort_order": 3
}
```

### Email Input
```json
{
  "attribute_name": "email",
  "display_label": "Email Address",
  "control_type": "email",
  "options": null,
  "is_required": true,
  "sort_order": 4
}
```

## Validation

### Built-in Validations

- **Required**: Validates that required fields are not empty
- **Email**: Validates email format for email fields
- **Number**: Validates numeric input for number fields

### Custom Validation

The component is designed to be easily extended with additional validators:

```typescript
// In the buildForm method, add custom validators
if (field.control_type === 'number' && field.attribute_name === 'year') {
  validators.push(Validators.min(1900));
  validators.push(Validators.max(new Date().getFullYear() + 1));
}
```

## Styling

The component uses SCSS with CSS custom properties for easy theming:

```scss
.dynamic-form-container {
  --primary-color: #3498db;
  --error-color: #e74c3c;
  --success-color: #27ae60;
  --border-radius: 4px;
}
```

## Component Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `formConfig` | `FormField[]` | `[]` | Array of field configurations |
| `submitButtonText` | `string` | `'Submit'` | Text for submit button |
| `resetButtonText` | `string` | `'Reset'` | Text for reset button |

## Component Outputs

| Output | Type | Description |
|--------|------|-------------|
| `formSubmit` | `EventEmitter<any>` | Emitted when form is submitted with valid data |
| `formReset` | `EventEmitter<void>` | Emitted when form is reset |

## Examples

See the included example configurations:

- **Vehicle Form**: Demonstrates complex form with various field types
- **User Form**: Shows a simpler user registration form

## Future Enhancements

- [ ] File upload fields
- [ ] Multi-select dropdowns
- [ ] Date range pickers
- [ ] Custom validation rules in JSON
- [ ] Conditional field visibility
- [ ] Field grouping and sections
- [ ] Async validation support
- [ ] Integration with popular UI libraries

## Development

To run the demo:

```bash
npm install
npm start
```

The application will be available at `http://localhost:4200`.

## Dependencies

- Angular 19+
- Angular Reactive Forms
- TypeScript 5.7+

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)