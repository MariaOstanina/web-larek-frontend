interface ICatalogView {
	render(items: HTMLElement[]): void
}

export class CatalogView implements ICatalogView {
  protected container: HTMLElement;

  constructor() {
		 this.container = document.querySelector('.gallery');
  }
 
  render(items: HTMLElement[]) {
    this.container.replaceChildren(...items);
  }
}
