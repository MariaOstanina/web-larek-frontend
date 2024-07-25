import { cloneTemplate } from '../../utils/utils';
import { TOrderFormData } from '../../types';

interface IOrderFormView {
	render(data?: TOrderFormData): HTMLElement;
}

export class OrderFormView implements IOrderFormView {
  protected element: HTMLFormElement;
  protected paymentButtonsWrapper: HTMLFormElement;
  protected paymentButtons: NodeListOf<HTMLButtonElement>;
  protected formErrors: HTMLFormElement;
  protected nextButton: HTMLFormElement;
  protected addressInput: HTMLInputElement;

  protected data: TOrderFormData = {
    payment: 'card',
    address: '',
  };

  protected validate: () => void;
  protected setValues: (data: TOrderFormData) => void;

  constructor(onChange: (data: TOrderFormData) => void, next: () => void) {
    this.element = cloneTemplate('#order');
    this.formErrors = this.element.querySelector('.form__errors');
    this.nextButton = this.element.querySelector('.order__button');
    this.addressInput = this.element.querySelector('[name="address"]');

    this.nextButton.addEventListener('click', () => {
      next();
    });
 
    this.validate = () => {
      if (!this.data.payment || !this.data.address) {
        this.formErrors.textContent = 'Заполните все поля';
        this.nextButton.disabled = true;
      } else {
        this.formErrors.textContent = '';
        this.nextButton.disabled = false;
      }
    };

    this.setValues = (data: TOrderFormData) => {
      this.addressInput.value = data.address;
      this.paymentButtons.forEach(btn => {
        if (btn.name === data.payment) {
          btn.classList.add('button_alt-active');
        } else {
          btn.classList.remove('button_alt-active');
        }
      });
      this.data = data;
      this.validate();
    };

    this.paymentButtonsWrapper = this.element.querySelector('.order__buttons');
    this.paymentButtons = this.paymentButtonsWrapper.querySelectorAll('.button');

    this.paymentButtons.forEach(btn => {
      if (btn.name === this.data.payment) btn.classList.add('button_alt-active');

      btn.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLButtonElement;
        if (target.name === this.data.payment) return;
        target.classList.add('button_alt-active');
        this.paymentButtons.forEach(el => {
          if (el.name !== target.name) el.classList.remove('button_alt-active');
        });
        this.data.payment = target.name;
        onChange(this.data);
        this.validate();
      });
    });

    this.addressInput.addEventListener('input', (e) => {
      this.data.address = (e.target as HTMLInputElement).value;
      onChange(this.data);
      this.validate();
    });
  }

  render(data: TOrderFormData) {
    this.setValues(data);
    return this.element;
  }
}
