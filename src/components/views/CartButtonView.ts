interface ICartIndicatorView {
	render(count: number): void;
}
export class CartButtonView implements ICartIndicatorView {
  protected element: HTMLButtonElement;
  protected counter: HTMLButtonElement;
 
  constructor(onClick: () => void) {
    this.element = document.querySelector('.header__basket');
    this.counter = document.querySelector('.header__basket-counter');

    this.element.addEventListener('click', onClick);
  }

  render(count: number) {
    this.counter.textContent = String(count);
  }
}
