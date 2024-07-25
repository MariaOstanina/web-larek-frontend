interface IModalView {
	open(data: { content: HTMLElement }): void;
	close(): void;
}

export class ModalView implements IModalView {
  protected modalContent: HTMLElement;
  protected container: HTMLElement;
  protected closeModalEvent: (e?: Event) => void;

  constructor() {
    this.container = document.getElementById('modal-container');
    this.modalContent = this.container.querySelector('.modal__content');
    const closeBtn = this.container.querySelector('.modal__close');

    this.closeModalEvent = (e) => {
		  if (e?.target !== e?.currentTarget) return;
      this.container.style.display = 'none';
      this.modalContent.replaceChildren();
    }; 

    closeBtn.addEventListener('click', this.closeModalEvent);
    this.container.addEventListener('click', this.closeModalEvent);
  }

  open({ content }: { content: HTMLElement }) {
    this.modalContent.replaceChildren(content);
    this.container.style.display = 'block';
  }

  close() {
    this.closeModalEvent();
  }
}
