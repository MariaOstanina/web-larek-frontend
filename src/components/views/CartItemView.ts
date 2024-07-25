import { ProductItem } from '../../types';
import { cloneTemplate } from '../../utils/utils';

interface ICartItemView {
	render(item: ProductItem, index: number, onRemove: () => void): void;
}

export class CartItemView implements ICartItemView {
  protected element: HTMLElement;

  constructor() {
    this.element = cloneTemplate('#card-basket');
  }

  render(item: ProductItem, index: number, onRemove: () => void) {
    const element = this.element.cloneNode(true) as HTMLElement;

    const itemIndex = element.querySelector('.basket__item-index');
    const title = element.querySelector('.card__title');
    const price = element.querySelector('.card__price');
    const deleteBtn = element.querySelector('.card__button');

    itemIndex.textContent = String(index);
    title.textContent = item.title;
    price.textContent = String(item.price);

    deleteBtn.addEventListener('click', () => {
      onRemove();
      element.remove();
    });

    return element;
  }
}
