import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api';
import { API_URL } from './utils/constants';
import { CatalogModel } from './components/models/CatalogModel';
import { CatalogView } from './components/views/CatalogView';
import { CatalogItemView } from './components/views/CatalogItemView';
import { OrderResponse, ProductItem, ProductResponse } from './types';
import { CardPreviewView } from './components/views/CardPreviewView';
import { ModalView } from './components/views/ModalView';
import { CartButtonView } from './components/views/CartButtonView';
import { CartModel } from './components/models/CartModel';
import { CartView } from './components/views/CartView';
import { CartItemView } from './components/views/CartItemView';
import { OrderFormView } from './components/views/OrderFormView';
import { ContactsFormView } from './components/views/ContactsFormView';
import { OrderModel } from './components/models/OrderModel';
import { SuccessOrderView } from './components/views/SuccessOrderView';

const api = new Api(API_URL);
const events = new EventEmitter();
const catalogModel = new CatalogModel(events);
const cartModel = new CartModel(events);
const orderModel = new OrderModel();

const catalogView = new CatalogView();
const catalogItemView = new CatalogItemView();
const cardPreviewView = new CardPreviewView();
const modalView = new ModalView();
const successOrderView = new SuccessOrderView();
const cartItemView = new CartItemView();

const payOrder = () => {
  api
    .post('/order', orderModel.getOrder())
    .then(({ total }: OrderResponse) => {
      orderModel.reset();
      cartModel.reset();
      modalView.open({ content: successOrderView.render(total, () => modalView.close()) });
    })
    .catch(console.error);
};

const getFullCartData = () => {
  const items = catalogModel.getItemsByIds(cartModel.getItems());
  return {
    items,
    total: items.reduce((acc, el) => acc + el.price, 0)
  };
};

const contactsFormView = new ContactsFormView((d) => orderModel.change(d), payOrder);

const openSecondFormModal = () => {
  const orderData = orderModel.getOrder();
  modalView.open({
    content: contactsFormView.render({
      email: orderData.email,
      phone: orderData.phone
    })
  });
};

const orderFormView = new OrderFormView((d) => orderModel.change(d), openSecondFormModal);

const doOrder = () => {
  orderModel.change({ items: cartModel.getItems(), total: getFullCartData().total });
  const orderData = orderModel.getOrder();
  modalView.open({
    content: orderFormView.render({
      payment: orderData.payment,
      address: orderData.address
    })
  });
};

const cartView = new CartView(doOrder);

const getCartData = () => {
  const items = getFullCartData().items.map((itemData, i) => {
    return cartItemView.render(itemData, i + 1, () => {
      cartModel.remove(itemData.id);
      // для обновления контента модального окна
      modalView.open({
        content: cartView.render(getCartData())
      });
    });
  });

  const price = getFullCartData().total;

  return { items, price };
};

const cartButtonView = new CartButtonView(
  () => modalView.open({
    content: cartView.render(getCartData())
  })
);

api.get('/product')
  .then((res: ProductResponse) => {
    catalogModel.setItems(res.items);
  })
  .catch(console.error);

events.on('cart-change', ({ items }: { items: string[] }) => {
  cartButtonView.render(items.length);
});


const renderCatalog = ({ items = [] }: { items: ProductItem[] }) => {
  const elements = items.map(data => {
    const addToCart = () => cartModel.add(data.id);

    const onClick = () => {
      const getCanAddToCart = () => !cartModel.has(data.id);
      modalView.open({ content: cardPreviewView.render({ data, addToCart, getCanAddToCart }) });
    };
    return catalogItemView.render(onClick, data);
  });

  catalogView.render(elements);
};

events.on('catalog-change', renderCatalog);
