import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  data?: any;
  errors?: string[];
}

export interface AuctionListing {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  base_price: number;
  auction_end_time: string;
  status: string;
  description_text: string;
  embedding: null;
  dynamic_attributes: any;
}

@Injectable({
  providedIn: 'root'
})
export class FormService {
  
  constructor() { }

  /**
   * Simulates form submission to a backend service
   * @param formData The form data to submit
   * @returns Observable with submission result
   */
  submitForm(formData: any): Observable<FormSubmissionResult> {
    const auctionListing = this.generateAuctionListing(formData);
    
    // Simulate API call with delay
    return of({
      success: true,
      message: 'Form submitted successfully!',
      data: auctionListing
    }).pipe(delay(1000)); // Simulate 1 second API delay
  }

  /**
   * Validates form data (additional server-side validation simulation)
   * @param formData The form data to validate
   * @returns Observable with validation result
   */
  validateFormData(formData: any): Observable<FormSubmissionResult> {
    const errors: string[] = [];

    // Example custom validations
    if (formData.year && (formData.year < 1900 || formData.year > new Date().getFullYear() + 1)) {
      errors.push('Year must be between 1900 and ' + (new Date().getFullYear() + 1));
    }

    if (formData.mileage && formData.mileage < 0) {
      errors.push('Mileage cannot be negative');
    }

    if (formData.vin && formData.vin.length !== 17) {
      errors.push('VIN must be exactly 17 characters long');
    }

    const result: FormSubmissionResult = {
      success: errors.length === 0,
      message: errors.length === 0 ? 'Validation passed' : 'Validation failed',
      data: formData,
      errors: errors.length > 0 ? errors : undefined
    };

    return of(result).pipe(delay(500));
  }

  /**
   * Generates a complete auction listing with form data and random values for missing fields
   * @param formData The submitted form data
   * @returns Complete auction listing object
   */
  private generateAuctionListing(formData: any): AuctionListing {
    const listingId = this.generateId();
    const userId = this.generateId();
    const categoryId = this.generateId();
    
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + Math.floor(Math.random() * 30) + 1);
    
    const basePrice = this.generateBasePrice(formData);
    const title = this.generateTitle(formData);
    const description = this.generateDescription(formData);
    const completeAttributes = this.generateCompleteAttributes(formData);
    
    const statuses = ['pending_indexing', 'active', 'draft'];
    
    return {
      id: listingId,
      user_id: userId,
      category_id: categoryId,
      title: title,
      base_price: basePrice,
      auction_end_time: endTime.toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      description_text: description,
      embedding: null,
      dynamic_attributes: completeAttributes
    };
  }

  private generateBasePrice(formData: any): number {
    let basePrice = 50000; // Default
    
    if (formData.make || formData.model) {
      // Vehicle pricing
      const year = formData.year || 2020;
      const currentYear = new Date().getFullYear();
      const ageMultiplier = Math.max(0.7, 1 - (currentYear - year) * 0.05);
      
      const isLuxury = formData.make?.toLowerCase().includes('bmw') || 
                       formData.make?.toLowerCase().includes('mercedes') || 
                       formData.make?.toLowerCase().includes('audi');
      
      basePrice = isLuxury ? 
        Math.floor((200000 + Math.random() * 300000) * ageMultiplier) :
        Math.floor((80000 + Math.random() * 150000) * ageMultiplier);
    } else if (formData.property_type) {
      // Property pricing
      const sizeSqft = formData.size_sqft || 1500;
      const pricePerSqft = formData.property_type === 'House' ? 
        (1500 + Math.random() * 1000) : (2000 + Math.random() * 1500);
      basePrice = Math.floor(sizeSqft * pricePerSqft);
    }
    
    return basePrice;
  }

  private generateTitle(formData: any): string {
    if (formData.make && formData.model) {
      const year = formData.year ? `${formData.year} ` : '';
      let title = `${year}${formData.make} ${formData.model}`;
      if (formData.mileage) {
        title += ` - ${formData.mileage.toLocaleString()} km`;
      }
      return title;
    }
    
    if (formData.property_type) {
      const bedrooms = formData.bedrooms ? `${formData.bedrooms} Bedroom ` : '';
      const size = formData.size_sqft ? ` - ${formData.size_sqft} sqft` : '';
      let title = `${bedrooms}${formData.property_type}${size}`;
      if (formData.location) {
        title += ` in ${formData.location}`;
      }
      return title;
    }
    
    return 'Auction Item';
  }

  private generateDescription(formData: any): string {
    let description = 'This item is up for auction. ';
    
    if (formData.make) {
      description += `This ${formData.year || ''} ${formData.make} ${formData.model || ''} is in ${formData.condition || 'good'} condition. `;
      if (formData.colour) {
        description += `Finished in ${formData.colour}. `;
      }
      if (formData.service_history) {
        description += `${formData.service_history} available. `;
      }
    } else if (formData.property_type) {
      description += `This ${formData.property_type.toLowerCase()} features ${formData.bedrooms || 'multiple'} bedrooms and ${formData.bathrooms || 'multiple'} bathrooms. `;
      if (formData.location) {
        description += `Located in ${formData.location}. `;
      }
    }
    
    description += 'Don\'t miss this opportunity!';
    return description;
  }

  private generateCompleteAttributes(formData: any): any {
    const attributes = { ...formData };
    
    // Add vehicle-specific random values
    if (formData.make && !formData.engine_litres) {
      Object.assign(attributes, {
        engine_litres: (1.6 + Math.random() * 4.4).toFixed(1),
        cylinders: [4, 6, 8][Math.floor(Math.random() * 3)],
        horsepower: Math.floor(150 + Math.random() * 400),
        doors: [2, 4][Math.floor(Math.random() * 2)],
      });
    }
    
    // Generate VIN for vehicles
    if (formData.make && !formData.vin) {
      attributes.vin = this.generateVIN();
    }
    
    // Add location if not provided
    if (!formData.location_city && !formData.location) {
      attributes.location_city = ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina'][Math.floor(Math.random() * 5)];
    }
    
    return attributes;
  }

  private generateVIN(): string {
    const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ1234567890';
    let vin = '';
    for (let i = 0; i < 17; i++) {
      vin += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return vin;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}