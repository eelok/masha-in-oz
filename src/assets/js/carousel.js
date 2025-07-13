class PhotoCarousel {
  constructor(element) {
    this.carousel = element;
    this.track = element.querySelector('.carousel-track');
    this.slides = element.querySelectorAll('.carousel-slide');
    this.prevBtn = element.querySelector('.carousel-prev');
    this.nextBtn = element.querySelector('.carousel-next');
    this.counter = element.querySelector('.carousel-counter');
    this.dotsContainer = element.querySelector('.carousel-dots');
    
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.isAnimating = false;
    
    // Touch/swipe variables
    this.startX = 0;
    this.currentX = 0;
    this.isDragging = false;
    
    if (this.totalSlides > 1) {
      this.init();
    } else {
      this.hideNavigation();
    }
  }
  
  init() {
    this.createDots();
    this.updateCounter();
    this.updateNavigation();
    this.bindEvents();
    this.updatePosition();
  }
  
  hideNavigation() {
    if (this.prevBtn) this.prevBtn.style.display = 'none';
    if (this.nextBtn) this.nextBtn.style.display = 'none';
    if (this.dotsContainer) this.dotsContainer.style.display = 'none';
    if (this.counter) this.counter.style.display = 'none';
  }
  
  createDots() {
    if (!this.dotsContainer) return;
    
    this.dotsContainer.innerHTML = '';
    
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `Go to photo ${i + 1}`);
      
      if (i === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }
  }
  
  bindEvents() {
    // Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
    
    // Touch events
    this.track.addEventListener('touchstart', (e) => {
      this.startX = e.touches[0].clientX;
      this.isDragging = true;
    });
    
    this.track.addEventListener('touchmove', (e) => {
      if (!this.isDragging) return;
      e.preventDefault();
    });
    
    this.track.addEventListener('touchend', (e) => {
      if (!this.isDragging) return;
      
      const endX = e.changedTouches[0].clientX;
      const diffX = this.startX - endX;
      
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
      
      this.isDragging = false;
    });
  }
  
  goToSlide(index) {
    if (this.isAnimating || index === this.currentIndex) return;
    if (index < 0 || index >= this.totalSlides) return;
    
    this.isAnimating = true;
    this.currentIndex = index;
    
    this.updatePosition();
    this.updateNavigation();
    this.updateCounter();
    this.updateDots();
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }
  
  nextSlide() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.goToSlide(this.currentIndex + 1);
    }
  }
  
  prevSlide() {
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - 1);
    }
  }
  
  updatePosition() {
    const translateX = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${translateX}%)`;
  }
  
  updateNavigation() {
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex === 0;
    }
    
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex === this.totalSlides - 1;
    }
  }
  
  updateCounter() {
    if (!this.counter) return;
    
    const current = this.counter.querySelector('.current');
    const total = this.counter.querySelector('.total');
    
    if (current) current.textContent = this.currentIndex + 1;
    if (total) total.textContent = this.totalSlides;
  }
  
  updateDots() {
    if (!this.dotsContainer) return;
    
    const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }
}

// Initialize all carousels when page loads
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach(carousel => new PhotoCarousel(carousel));
});