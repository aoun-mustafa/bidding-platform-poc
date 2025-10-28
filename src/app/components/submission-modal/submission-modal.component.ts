import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-submission-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submission-modal.component.html',
  styleUrls: ['./submission-modal.component.scss']
})
export class SubmissionModalComponent {
  @Input() isVisible: boolean = false;
  @Input() submissionData: AuctionListing | null = null;
  @Output() closeModal = new EventEmitter<void>();

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  close() {
    this.closeModal.emit();
  }

  copyToClipboard() {
    if (this.submissionData) {
      const jsonString = JSON.stringify(this.submissionData, null, 2);
      navigator.clipboard.writeText(jsonString).then(() => {
        // You could add a toast notification here
        console.log('JSON copied to clipboard');
      });
    }
  }

  downloadJson() {
    if (this.submissionData) {
      const jsonString = JSON.stringify(this.submissionData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `auction-listing-${this.submissionData.id}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
  }

  formatKey(key: any): string {
    const keyStr = String(key);
    return keyStr.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }
}