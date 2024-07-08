# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Основной стек
 - webpack
 - typescript
 - sass
 - babel
 - eslint

## Архитектура
В Данном проекте будет реализована событийная архитектура.

В таком случае взаимодействие между представлениями и моделями будет происходить посредством `EventEmiter`.

В итоге `View`, `Model` и базовые классы будет соединяться в `index.ts` файле, т.к. у нас одностраничное приложение.

Например, при запуске приложения нам нужно получить и отобразить начальный список продуктов.
В таком случае при корректном ответе установливаем список продуктов в `CatalogModel`, запуская событие изменения каталога.
Эвентэмитер реагирует на изменение, получает данные и отдаёт команду `CatalogView` для перерисовки каталога по этим данным.

### Используемые события:
`catalog-change`, `cart-change`, `order-change`

## Базовые классы и их назначение

`EventEmitter` обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события.

`Api` для работы с сетевыми запросами и их обработки. Имеет методы `get` и `post`.

### View и Model классы
#### Model
`CatalogModel` работа с данными для каталога продуктов.
Имеет возможность добавлять, отдавать все данные и отфильтрованые по id.
```ts
interface ICatalogModelConstructor {
    new (events: IEvents): ICatalogModel;
}

interface ICatalogModel {
    items: ProductItem[];
    setItems(items: ProductItem[]): void;
    getItem(id: string): ProductItem;
    getItemsByIds(ids: string[]): void;
}
```

`CartModel` работа с данными корзины. 
Модель использует только ID продукта.
Имеет возможность добавлять, отдавать, очищать данные.
```ts
interface ICartModelConstructor {
    new (events: IEvents): ICartModel;
}

interface ICartModel {
    add(id: string): void;
    remove(id: string): void;
    getItems(): string[]
}
```

`OrderModel` работа с заказом.
Есть возможность постепенного наполнения данными.
Имеет возможность добавлять, удалять, отдавать, очищать данные.
```ts
interface IOrderModelConstructor {
    new (events: IEvents): IOrderModel;
}

interface IOrderModel {
    order: Order;
    addItem(id: string): void;
    removeItem(id: string): void;
    resetOrder(): void;
}
```

#### View

`CatalogView` компонент для отображения каталога и его содержимого.
Принимает карточки и встраивает их в DOM.
```ts

interface ICatalogView {
    render(items: HTMLElement[]): void;
}
```

`CatalogItemView` компонент для отображения продукта в каталоге. По клику открывается модалка с полной карточкой продукта.
```ts
interface ICatalogItemConstructorView {
    new (data: { onClick: () => void, data: ProductItem }): ICatalogItemView;
}

interface ICatalogItemView {
    render(): HTMLElement;
}
```

`ProductItemView` компонент для отображения карточки продукта. Имеет кнопку для добавления в корзину.
```ts
interface IProductItemConstructorView {
	new (data: { addToCart: () => void, data: ProductItem }): IProductItemView;
}

interface IProductItemView {
    render(): HTMLElement;
}
```

`CartView` компонент для отображения корзины.
Принимает элементы и встраивает их в DOM.
```ts
interface ICartView {
    render(data: { items: HTMLElement[] }): void;
}
```

`CartItemView` компонент для отображения добавленного элемента корзины. 
```ts
interface ICartItemConstructorView {
    new (data: { deleteItem: () => void, data: ProductItem }): ICartItemView;
}

interface ICartItemView {
    render(): void;
}
```

`ICartButtonView` компонент для отображения кнопки корзины.
Отображает количество добавленный елементов и при нажатии открывает модальное окно.
```ts
interface ICartButtonConstructorView {
    new (data: { onClick: () => void }): ICartButtonView;
}

interface ICartButtonView {
    render(count: number): void;
}
```

`OrderFormView` компонент отображения формы.
Получает массив ключей формы и по ним отображает поля.
```ts
interface IOrderFormView {
    render(data: (keyof OrderForm)[]): HTMLElement;
}
```

`SuccessOrder` компонент подтверждения, что заказ выполнен успешно.
```ts
interface ISuccessOrder {
    render(sum: number): HTMLElement;
}
```

`ModalView` компонент отображения модального окна.
```ts
interface IModalView {
    open(data: { title: string; content: HTMLElement, next: { onClick: () => void; title: string } }): void;
    close(): void;
}
```

## Типы
Типы и интерфейсы моделей и представлений будет лежать непосредственно рядом с классами, т.к. эти типы не общие.

В `src/types/` лежат типы для общего переиспользования.

### Api
```ts

export type ProductItem = {
    category: string;
    description: string;
    id: string;
    image: string;
    price: number;
    title: string;
}

export type ProductResponse = {
    items: ProductItem[];
    total: number;
}

export type Order = {
    items: string[];
    payment: string;
    total: number;
    address: string;
    email: string;
    phone: string;
}

export type OrderRequest = Order

export type OrderResponse = {
    id: string;
    total: number;
}
```

### Common

```ts
export type OrderForm = {
    payment: string;
    address: string;
    email: string;
    phone: string;
}
```
