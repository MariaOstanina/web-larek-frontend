import { cloneTemplate } from '../../utils/utils';

interface ICartView {
	render(data: { items: HTMLElement[], price: number }): HTMLElement;
}

export class CartView implements ICartView {
  protected element: HTMLElement;
  protected content: HTMLElement;
  protected price: HTMLElement;
  protected doOrderBtn: HTMLButtonElement;
 
  constructor(doOrder: () => void) {
    this.element = cloneTemplate('#basket');
    this.content = this.element.querySelector('.basket__list');
    this.price = this.element.querySelector('.basket__price');
    this.doOrderBtn = this.element.querySelector('.basket__button');
    this.doOrderBtn.addEventListener('click', doOrder);
  }

  render({ items, price }: { items: HTMLElement[], price: number }) {
    this.content.replaceChildren(...items);
    this.price.textContent = String(price);
    this.doOrderBtn.disabled = !items.length;

    return this.element;
  }
}
