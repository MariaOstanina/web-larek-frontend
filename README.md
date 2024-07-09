# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
 - src
   - /common.blocks - папка со стилями компонентов
   - /components - папка с JS компонентами
     - /base - папка с базовым кодом
   - /images - папка с изображениями
   - /pages - папка с главным index.html
   - /public - папка с иконками и прочима ассетами
   - /scss - папка со стилями
   - /types - папка с типами
   - /utils - папка с утилитами
   - /vendor - папка со шрифтами и нормализацией css

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — корневой файл типов
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
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

То есть модель запускает событие, а представление реагирует на него. Или наоборот.

### Пользовательские события:
 - клик по карточке для открытия полной карточки продукта
 - добавление карточки в корзину
 - клик по значку корзины для открытия корзины
 - добавление продукта в корзину
 - удаление продукта из корзины
 - заполнение формы заказа
 - оформление заказа

## Базовые классы и их назначение

`EventEmitter` обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события.

`Api` для работы с сетевыми запросами и их обработки. Имеет методы `get` и `post`.

### View и Model классы
#### Model
`CatalogModel` работа с данными для каталога продуктов.
Имеет возможность добавлять, отдавать все данные и отфильтрованные по id.

```ts
interface ICatalogModelConstructor {
    new (events: IEvents): ICatalogModel; // получает объект событий
}

interface ICatalogModel {
    items: IProductItem[]; // возвращает все данные каталога
    setItems(items: IProductItem[]): void; // устанавливает данные с полной заменой
    getItemsByIds(ids: string[]): void; // получение данных по массиву IDs
}
```

`CartModel` работа с данными корзины. 
Модель использует только ID продукта.
Имеет возможность добавлять, отдавать, очищать данные.
```ts
interface ICartModelConstructor {
    new (events: IEvents): ICartModel; // получает объект событий
}

interface ICartModel {
	items: string[]; // возвращает массив ID
    add(id: string): void; // добавляет данные в корзину
    remove(id: string): void; // удаляет данные по ID
}
```

`OrderModel` работа с заказом.
Есть возможность постепенного наполнения данными.
Имеет возможность добавлять, удалять, отдавать, очищать данные.
```ts
interface IOrderModelConstructor {
    new (events: IEvents): IOrderModel; // получает объект событий
}

interface IOrderModel {
    order: IOrder; // возвращает объект заказа
    addItem(id: string): void; // добавляет данные в заказ
    resetOrder(): void; // очистка заказа
}
```

#### View

`CatalogView` компонент для отображения каталога и его содержимого.
```ts

interface ICatalogView {
    render(items: HTMLElement[]): void; // принимает карточки и встраивает их в DOM.
}
```

`CatalogItemView` компонент для отображения продукта в каталоге. По клику открывается модалка с полной карточкой продукта.
```ts
interface ICatalogItemConstructorView {
    new (data: {
        onClick: () => void, // коллбэк нажатия на карточку
        data: IProductItem, // данные карточки
    }): ICatalogItemView;
}

interface ICatalogItemView {
    render(): HTMLElement; // возвращает html элемент карточки каталога
}
```

`ProductItemView` компонент для отображения карточки продукта. Имеет кнопку для добавления в корзину.
```ts
interface IProductItemConstructorView {
    new (data: {
        addToCart: () => void, // коллбэк добавления карточки в корзину
        data: IProductItem, // данные карточки каталога
    }): IProductItemView;
}

interface IProductItemView {
    render(): HTMLElement; // возвращает html элемент карточки
}
```

`CartView` компонент для отображения корзины.
Принимает элементы и встраивает их в DOM.
```ts
interface ICartView {
    render(items: HTMLElement[]): void; // принимает html элементы корзины и встраивает их в DOM.
}
```

`CartItemView` компонент для отображения добавленного элемента корзины. 
```ts
interface ICartItemConstructorView {
    new (data: {
        deleteItem: () => void, // коллбэк удаления элемента из корзины
        data: IProductItem, // данные элемента корзины
    }): ICartItemView;
}

interface ICartItemView {
    render(): HTMLElement; // возвращает html элемент пункта корзины
}
```

`ICartButtonView` компонент для отображения кнопки корзины.
Отображает количество добавленный элементов и при нажатии открывает модальное окно.
```ts
interface ICartButtonConstructorView {
    new (data: { onClick: () => void }): ICartButtonView;
    // принимает коллбэк клика по элементу
}

interface ICartButtonView {
    render(count: number): void; // обновляет отображение количества добавленных елементов в корзину
}
```

`OrderFormView` компонент отображения формы.
Получает массив ключей формы и по ним отображает поля.
```ts
interface IOrderFormView {
    render(data: (keyof IOrderForm)[]): HTMLElement; // возвращает html элементы формы по получаемы ключам
}
```

`SuccessOrder` компонент подтверждения, что заказ выполнен успешно.
```ts
interface ISuccessOrder {
    render(sum: number): HTMLElement; // получает сумму и выводит элемент
}
```

`ModalView` компонент отображения модального окна.
```ts
interface IModalView {
    // метод открытия модального окна
    // получает заголовок модального окна, контент и кнопку и поэтим данным отображает элемент
    open(data: { title: string; content: HTMLElement, next?: { onClick: () => void; title: string } }): void;
    // закрывает модальное окно
    close(): void;
}
```

## Типы
Типы и интерфейсы моделей и представлений будет лежать непосредственно рядом с классами, т.к. эти типы не общие.

В `src/types/` лежат типы для общего переиспользования.

### Api
```ts

export interface IProductItem {
    category: string;
    description: string;
    id: string;
    image: string;
    price: number;
    title: string;
}

export interface IProductResponse {
    items: IProductItem[];
    total: number;
}

export interface IOrder {
    items: string[];
    payment: string;
    total: number;
    address: string;
    email: string;
    phone: string;
}

export interface IOrderRequest extends IOrder {}

export interface IOrderResponse {
    id: string;
    total: number;
}
```

### Other

```ts
export interface IOrderForm {
    payment: string;
    address: string;
    email: string;
    phone: string;
}
```
