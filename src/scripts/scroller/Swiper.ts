interface Events {
  swipeUp: Event;
  swipeDown: Event;
  swipeLeft: Event;
  swipeRight: Event;
}

class Swiper {
  initialY: number | null;
  initialX: number | null;
  events: Events;
  constructor() {
    this.initialX = null;
    this.initialY = null;

    document.addEventListener('touchstart', e => this.startTouch(e));
    document.addEventListener('touchmove', e => this.moveTouch(e));

    this.events = {
      swipeUp: new Event('swipeUp'),
      swipeDown: new Event('swipeDown'),
      swipeLeft: new Event('swipeLeft'),
      swipeRight: new Event('swipeRight'),
    };
  }

  startTouch(e: TouchEvent) {
    this.initialX = e.touches[0].clientX;
    this.initialY = e.touches[0].clientY;
  }

  moveTouch(e: TouchEvent) {
    if (!this.initialX || !this.initialY) {
      return;
    }

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    const diffX = this.initialX - currentX;
    const diffY = this.initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        document.dispatchEvent(this.events.swipeLeft);
      } else {
        document.dispatchEvent(this.events.swipeRight);
      }
    } else {
      if (diffY > 0) {
        document.dispatchEvent(this.events.swipeUp);
      } else {
        document.dispatchEvent(this.events.swipeDown);
      }
    }

    this.initialX = null;
    this.initialY = null;
  }
}

export default Swiper;
