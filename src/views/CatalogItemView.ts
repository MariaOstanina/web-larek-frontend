import { ProductItem } from '../types';
import { CATEGORY_TO_CLASS, CDN_URL } from '../utils/constants';
import { cloneTemplate } from '../utils/utils';

interface ICatalogItemView {
	render(onClick: () => void, data: ProductItem): HTMLElement;
}

export class CatalogItemView implements ICatalogItemView {
  protected element: HTMLElement;

  constructor() {
    this.element = cloneTemplate('#card-catalog');
  }

  render(onClick: () => void, data: ProductItem) {
    const element = this.element.cloneNode(true) as HTMLElement;

    const title = element.querySelector('.card__title');
    const image = element.querySelector('.card__image') as HTMLImageElement;
    const category = element.querySelector('.card__category');
    const price = element.querySelector('.card__price');

    element.addEventListener('click', onClick);

    category.classList.add(CATEGORY_TO_CLASS[data.category]);
    title.textContent = data.title;
    category.textContent = data.category;
    image.src = CDN_URL + data.image;
    price.textContent = data.price === null ? 'Бесценно' : `${data.price} синапсов`;

    return element;
  }
}
