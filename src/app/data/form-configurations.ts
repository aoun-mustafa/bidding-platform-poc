export interface FormField {
  attribute_name: string;
  display_label: string;
  control_type: 'text' | 'number' | 'select' | 'email' | 'tel' | 'date' | 'checkbox';
  options?: string[] | null;
  is_required: boolean;
  sort_order: number;
}

export const VEHICLE_FORM_CONFIG: FormField[] = [
  {
    "attribute_name": "make",
    "display_label": "Manufacturer / Make",
    "control_type": "select",
    "options": [
      "Toyota",
      "Ford",
      "Nissan",
      "Mercedes-Benz",
      "BMW",
      "Audi",
      "Honda",
      "Other"
    ],
    "is_required": true,
    "sort_order": 1
  },
  {
    "attribute_name": "model",
    "display_label": "Model",
    "control_type": "text",
    "options": null,
    "is_required": true,
    "sort_order": 2
  },
  {
    "attribute_name": "year",
    "display_label": "Year of Manufacture",
    "control_type": "number",
    "options": null,
    "is_required": true,
    "sort_order": 3
  },
  {
    "attribute_name": "mileage",
    "display_label": "Mileage (in km)",
    "control_type": "number",
    "options": null,
    "is_required": false,
    "sort_order": 4
  },
  {
    "attribute_name": "vin",
    "display_label": "VIN (Vehicle Identification Number)",
    "control_type": "text",
    "options": null,
    "is_required": false,
    "sort_order": 5
  },
  {
    "attribute_name": "body_type",
    "display_label": "Body Type",
    "control_type": "select",
    "options": [
      "Sedan",
      "SUV",
      "Hatchback",
      "Coupe",
      "Convertible",
      "Truck (Pickup)",
      "Van"
    ],
    "is_required": false,
    "sort_order": 6
  },
  {
    "attribute_name": "colour",
    "display_label": "Exterior Colour",
    "control_type": "text",
    "options": null,
    "is_required": false,
    "sort_order": 7
  },
  {
    "attribute_name": "condition",
    "display_label": "Condition",
    "control_type": "select",
    "options": ["Excellent", "Good", "Fair", "Needs Repair"],
    "is_required": false,
    "sort_order": 8
  },
  {
    "attribute_name": "engine_litres",
    "display_label": "Engine Size (in Litres)",
    "control_type": "number",
    "options": null,
    "is_required": false,
    "sort_order": 9
  },
  {
    "attribute_name": "cylinders",
    "display_label": "Number of Cylinders",
    "control_type": "number",
    "options": null,
    "is_required": false,
    "sort_order": 10
  },
  {
    "attribute_name": "horsepower",
    "display_label": "Horsepower (HP)",
    "control_type": "number",
    "options": null,
    "is_required": false,
    "sort_order": 11
  },
  {
    "attribute_name": "transmission",
    "display_label": "Transmission",
    "control_type": "select",
    "options": ["Automatic", "Manual", "CVT"],
    "is_required": false,
    "sort_order": 12
  },
  {
    "attribute_name": "drivetrain",
    "display_label": "Drivetrain",
    "control_type": "select",
    "options": [
      "FWD (Front-Wheel Drive)",
      "RWD (Rear-Wheel Drive)",
      "AWD (All-Wheel Drive)",
      "4x4"
    ],
    "is_required": false,
    "sort_order": 13
  },
  {
    "attribute_name": "seats",
    "display_label": "Number of Seats",
    "control_type": "number",
    "options": null,
    "is_required": false,
    "sort_order": 14
  },
  {
    "attribute_name": "upholstery",
    "display_label": "Upholstery Material",
    "control_type": "select",
    "options": ["Cloth", "Leather", "Leatherette (Vinyl)", "Alcantara"],
    "is_required": false,
    "sort_order": 15
  },
  {
    "attribute_name": "has_sunroof",
    "display_label": "Has Sunroof?",
    "control_type": "checkbox",
    "options": null,
    "is_required": false,
    "sort_order": 16
  },
  {
    "attribute_name": "has_navigation",
    "display_label": "Built-in Navigation?",
    "control_type": "checkbox",
    "options": null,
    "is_required": false,
    "sort_order": 17
  },
  {
    "attribute_name": "doors",
    "display_label": "Number of Doors",
    "control_type": "number",
    "options": null,
    "is_required": false,
    "sort_order": 18
  },
  {
    "attribute_name": "service_history",
    "display_label": "Service History Available?",
    "control_type": "select",
    "options": [
      "Full Service History",
      "Partial Service History",
      "No History Available"
    ],
    "is_required": false,
    "sort_order": 19
  },
  {
    "attribute_name": "location_city",
    "display_label": "City / Location",
    "control_type": "text",
    "options": null,
    "is_required": false,
    "sort_order": 20
  }
]

// Example of another form configuration for testing
export const PROPERTY_FORM_CONFIG: FormField[] = [
  {
    "attribute_name": "property_type",
    "display_label": "Property Type",
    "control_type": "select",
    "options": [
      "Apartment",
      "Villa",
      "Townhouse",
      "Land",
      "Office",
      "Shop"
    ],
    "is_required": true,
    "sort_order": 1
  },
  {
    "attribute_name": "location_district",
    "display_label": "District / Neighbourhood",
    "control_type": "text",
    "options": null,
    "is_required": true,
    "sort_order": 3
  },
  {
    "attribute_name": "land_area_sqm",
    "display_label": "Land Area (in square metres)",
    "control_type": "number",
    "options": null,
    "is_required": false,
    "sort_order": 7
  },
  {
    "attribute_name": "area_sqm",
    "display_label": "Area (in square metres)",
    "control_type": "number",
    "options": null,
    "is_required": false,
    "sort_order": 6
  },
  {
    "attribute_name": "is_furnished",
    "display_label": "Furnished?",
    "control_type": "checkbox",
    "options": null,
    "is_required": false,
    "sort_order": 8
  },
  {
    "attribute_name": "bathrooms",
    "display_label": "Bathrooms",
    "control_type": "number",
    "options": null,
    "is_required": false,
    "sort_order": 5
  },
  {
    "attribute_name": "location_city",
    "display_label": "City",
    "control_type": "text",
    "options": null,
    "is_required": true,
    "sort_order": 2
  },
  {
    "attribute_name": "deed_number",
    "display_label": "Title Deed (Sak) Number",
    "control_type": "text",
    "options": null,
    "is_required": false,
    "sort_order": 9
  },
  {
    "attribute_name": "bedrooms",
    "display_label": "Bedrooms",
    "control_type": "number",
    "options": null,
    "is_required": false,
    "sort_order": 4
  }
]