import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
   standalone: true,
   imports: [CommonModule,],
  templateUrl: './home.component.html',
   styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  facts: { title: string, value: number }[] = [
    { title: 'Students', value: 500 },
    { title: 'Attempts', value: 200 },
    { title: 'Published Tests', value: 20 },
    { title: 'Questions', value: 300 }
  ];

  private images: string[] = [
    "../../../assets/exam1.jpg",
    "../../../assets/exam2.jpg",
    "../../../assets/exam3.jpg",
    "../../../assets/exam4.jpg",
    "../../../assets/exam5.jpg",
  ];

  private currentImageIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.toggleWelcomeText();

    this.incrementNumbers();

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => this.showPrevImage());
      nextBtn.addEventListener('click', () => this.showNextImage());
    }
  }

  toggleWelcomeText(): void {
    const testGeniusText = document.getElementById('testGeniusText');
  
    if (testGeniusText) {
      const text = "TESTGENIUS";
      let index = 0;
  
      setInterval(() => {
        if (index <= text.length) {
          testGeniusText.innerText = text.slice(0, index);
          index++;
        }
      }, 200);
    }
  }

  private showPrevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.images.length - 1;
    }
    this.updateImage();
  }

  private showNextImage(): void {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
    this.updateImage();
  }

  private updateImage(): void {
    const imageContainer = document.querySelector('.image-container') as HTMLElement;
    if (imageContainer) {
      const images = imageContainer.querySelectorAll('.carousel-image');
      images.forEach((image, index) => {
        if (index === this.currentImageIndex) {
          (image as HTMLElement).style.transform = 'translateX(0)';
        } else {
          (image as HTMLElement).style.transform = 'translateX(-100%)';
        }
      });
    }
  }

  incrementNumbers(): void {
    this.facts.forEach((fact, index) => {
      const finalValue = fact.value;
      let currentValue = 0;
      const interval = setInterval(() => {
        if (currentValue >= finalValue) {
          clearInterval(interval);
        } else {
          currentValue++;
          this.facts[index].value = currentValue;
        }
      }, 10 * (index + 1)); // Adjust the interval for smoother animation
    });
  }

  calculateWidth(length: number): number {
    return length * 20; // Adjust the multiplier as needed
  }
}

