import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormField } from '../../data/form-configurations';

@Component({
  selector: 'app-json-config-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './json-config-modal.component.html',
  styleUrls: ['./json-config-modal.component.scss']
})
export class JsonConfigModalComponent {
  @Input() isVisible = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() configSubmit = new EventEmitter<FormField[]>();

  jsonInput = '';
  errorMessage = '';
  showError = false;

  onSubmit() {
    this.errorMessage = '';
    this.showError = false;

    try {
      // Parse the JSON
      const parsedConfig = JSON.parse(this.jsonInput);

      // Validate that it's an array
      if (!Array.isArray(parsedConfig)) {
        throw new TypeError('Configuration must be an array of form fields');
      }

      // Validate each field has required properties
      for (const field of parsedConfig) {
        if (!field.attribute_name || !field.display_label || !field.control_type) {
          throw new TypeError('Each field must have attribute_name, display_label, and control_type');
        }

        // Validate control_type
        const validTypes = ['text', 'number', 'select', 'email', 'tel', 'date', 'checkbox'];
        if (!validTypes.includes(field.control_type)) {
          throw new TypeError(`Invalid control_type: ${field.control_type}. Must be one of: ${validTypes.join(', ')}`);
        }

        // Ensure required properties exist
        if (typeof field.is_required !== 'boolean') {
          field.is_required = false;
        }
        if (typeof field.sort_order !== 'number') {
          field.sort_order = 0;
        }
      }

      // Emit the validated config
      this.configSubmit.emit(parsedConfig as FormField[]);
      this.close();
    } catch (error) {
      this.showError = true;
      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Invalid JSON format';
      }
    }
  }

  close() {
    this.jsonInput = '';
    this.errorMessage = '';
    this.showError = false;
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  loadExample() {
    this.jsonInput = `[
  {
    "attribute_name": "product_type",
    "display_label": "Product Type",
    "control_type": "select",
    "options": [
      "Laptop",
      "Smartphone",
      "Tablet",
      "Television",
      "Camera",
      "Smartwatch",
      "Gaming Console"
    ],
    "is_required": true,
    "sort_order": 1
  },
  {
    "attribute_name": "brand",
    "display_label": "Brand",
    "control_type": "text",
    "options": null,
    "is_required": true,
    "sort_order": 2
  },
  {
    "attribute_name": "model_name",
    "display_label": "Model Name / Number",
    "control_type": "text",
    "options": null,
    "is_required": true,
    "sort_order": 3
  },
  {
    "attribute_name": "release_year",
    "display_label": "Release Year",
    "control_type": "number",
    "options": null,
    "is_required": false,
    "sort_order": 4
  },
  {
    "attribute_name": "condition",
    "display_label": "Condition",
    "control_type": "select",
    "options": [
      "New",
      "Like New",
      "Used",
      "For Parts / Not Working"
    ],
    "is_required": true,
    "sort_order": 5
  },
  {
    "attribute_name": "warranty_status",
    "display_label": "Under Warranty?",
    "control_type": "checkbox",
    "options": null,
    "is_required": false,
    "sort_order": 9
  },
  {
    "attribute_name": "storage_capacity",
    "display_label": "Storage Capacity (GB / TB)",
    "control_type": "text",
    "options": null,
    "is_required": false,
    "sort_order": 7
  },
  {
    "attribute_name": "color",
    "display_label": "Color",
    "control_type": "text",
    "options": null,
    "is_required": false,
    "sort_order": 8
  },
  {
    "attribute_name": "serial_number",
    "display_label": "Serial Number",
    "control_type": "text",
    "options": null,
    "is_required": false,
    "sort_order": 6
  }
]`;
  }
}
