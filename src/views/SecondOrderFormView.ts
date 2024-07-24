import { cloneTemplate } from '../utils/utils';
import { TSecondOrderFormData } from '../types';

interface ISecondOrderFormView {
	render(data: TSecondOrderFormData): HTMLElement;
}

export class SecondOrderFormView implements ISecondOrderFormView {
  protected element: HTMLFormElement;
  protected formErrors: HTMLFormElement;
  protected payButton: HTMLButtonElement;
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  protected validate: () => void;
  protected setValues: (data: TSecondOrderFormData) => void;

  protected data: TSecondOrderFormData = {
    email: '',
    phone: '',
  };

  constructor(onChange: (data: TSecondOrderFormData) => void, pay: () => void) {
    this.element = cloneTemplate('#contacts');
    this.formErrors = this.element.querySelector('.form__errors');
    this.payButton = this.element.querySelector('.button');
    this.emailInput = this.element.querySelector('[name="email"]');
    this.phoneInput = this.element.querySelector('[name="phone"]');

    this.payButton.addEventListener('click', (e) => {
      e.preventDefault();
      pay();
    });

    this.validate = () => {
      if (!this.data.email || !this.data.phone) {
        this.formErrors.textContent = 'Заполните все поля';
        this.payButton.disabled = true;
      } else {
        this.formErrors.textContent = '';
        this.payButton.disabled = false;
      }
    };

    this.setValues = (data: TSecondOrderFormData) => {
      this.emailInput.value = data.email;
      this.phoneInput.value = data.phone;
      this.data = data;
      this.validate();
    };

    this.validate();

    [this.emailInput, this.phoneInput].forEach(el => {
      el.addEventListener('input', (e) => {
        const target = (e.target as HTMLInputElement);
        this.data[target.name as keyof TSecondOrderFormData] = target.value;
        onChange(this.data);
        this.validate();
      });
    });
  }

  render(data: TSecondOrderFormData) {
    this.setValues(data);
    return this.element;
  }
}
