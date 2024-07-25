import { cloneTemplate } from '../../utils/utils';

interface ISuccessOrderView {
	render(total: number, close: () => void): HTMLElement;
}

export class SuccessOrderView implements ISuccessOrderView{
  protected element: HTMLFormElement;
  protected total: HTMLFormElement;
  protected closeButton: HTMLButtonElement;

  protected closeHandler: () => void;

  constructor() {
    this.element = cloneTemplate('#success');
    this.total = this.element.querySelector('.order-success__description');
    this.closeButton = this.element.querySelector('.order-success__close');
    this.closeButton.addEventListener('click', () => {
      if (this.closeHandler) this.closeHandler();
    });
  }
 
  render(total: number, close: () => void) {
    this.total.textContent = total.toString();
    this.closeHandler = close;
    return this.element;
  }
}
