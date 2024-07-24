import { ProductItem } from '../types';
import { CATEGORY_TO_CLASS, CDN_URL } from '../utils/constants';
import { cloneTemplate } from '../utils/utils';

interface ICardPreviewView {
	render(arg: {
		addToCart: () => void,
		data: ProductItem,
		canAddToCart: boolean,
	}): HTMLElement;
}

export class CardPreviewView implements ICardPreviewView {
  protected element: HTMLElement;
  protected image: HTMLImageElement;
  protected title: HTMLElement;
  protected category: HTMLElement;
  protected text: HTMLElement;
  protected price: HTMLElement;
  protected cardBtn: HTMLButtonElement;

  protected lastCategoryClass = '';

  protected addToCart: () => void;
 
  constructor() {
    this.element = cloneTemplate('#card-preview');
    this.image = this.element.querySelector('.card__image') as HTMLImageElement;
    this.title = this.element.querySelector('.card__title');
    this.category = this.element.querySelector('.card__category');
    this.text = this.element.querySelector('.card__text');
    this.price = this.element.querySelector('.card__price');
    this.cardBtn = this.element.querySelector('.card__button');
  }

  render({ data, addToCart, canAddToCart }: Parameters<ICardPreviewView['render']>[0]) {
    this.image.src = CDN_URL + data.image;
    this.title.textContent = data.title;
    this.category.textContent = data.category;
    if (this.lastCategoryClass) this.category.classList.remove(this.lastCategoryClass);
    this.lastCategoryClass = CATEGORY_TO_CLASS[data.category];
    this.category.classList.add(CATEGORY_TO_CLASS[data.category]);
    this.text.textContent = String(data.description);
    this.price.textContent = data.price === null ? 'Бесценно' : `${data.price} синапсов`;

    this.cardBtn.removeEventListener('click', this.addToCart);
    this.addToCart = () => {
      if (this.cardBtn.disabled) return;
      addToCart();
      this.cardBtn.disabled = true;
    };
    this.cardBtn.addEventListener('click', this.addToCart);
    this.cardBtn.disabled = data.price === null || !canAddToCart;

    return this.element;
  }
}
