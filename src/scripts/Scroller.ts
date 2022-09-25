class Scroller {
  visibleElementIndex: number;
  isThrottled: boolean;
  constructor(private elementsCount: number) {
    this.visibleElementIndex = 0;
    this.isThrottled = false;
  }

  public get currentIndex(): number {
    return this.visibleElementIndex;
  }

  listenScroll = (e: WheelEvent): void => {
    if (this.isThrottled) return;
    this.isThrottled = true;
    setTimeout(() => {
      this.isThrottled = false;
    }, 1000);
    const delta = e.deltaY;
    const direction = delta < 0 ? -1 : 1;
    this.scroll(direction);
  };

  listenKeydown = (e: KeyboardEvent): void => {
    const key = e.key;
    let direction;
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      direction = key === 'ArrowDown' ? 1 : -1;
      this.scroll(direction);
    }
  };

  scroll = (direction: number) => {
    if (this.visibleElementIndex === 0 && direction === -1) {
      return;
    }
    if (this.visibleElementIndex === 2 && direction === 1) {
      return;
    }
    this.visibleElementIndex += direction;
  };

  drawNav = () => {
    const scrollerContainer = document.querySelector('.scroller');
    const ul = document.createElement('ul');
    scrollerContainer?.appendChild(ul);
    for (let i = 0; i < this.elementsCount; i++) {
      const li = document.createElement('li');

      ul.appendChild(li);
    }
  };
}
export default Scroller;
