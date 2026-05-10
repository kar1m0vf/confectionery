const CART_KEY = 'narPatisserieCart';

const state = {
  category: 'all',
  search: '',
  sort: 'default'
};

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function formatPrice(price) {
  return `${price.toFixed(2)} AZN`;
}

function findProduct(productId) {
  return PRODUCTS.find(product => product.id === Number(productId));
}

function updateCartCount() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll('[data-cart-count]').forEach(badge => {
    badge.textContent = totalCount;
  });
}

function addToCart(productId) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === Number(productId));

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: Number(productId), quantity: 1 });
  }

  saveCart(cart);
  showToast('Добавлено в корзину');
}

function changeCartQuantity(productId, action) {
  let cart = getCart();
  const item = cart.find(cartItem => cartItem.id === Number(productId));

  if (!item) return;

  if (action === 'increase') {
    item.quantity += 1;
  }

  if (action === 'decrease') {
    item.quantity -= 1;
  }

  cart = cart.filter(cartItem => cartItem.quantity > 0);
  saveCart(cart);
  renderCartPage();
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== Number(productId));
  saveCart(cart);
  renderCartPage();
}

function clearCart() {
  saveCart([]);
  renderCartPage();
}

function createProductCard(product) {
  return `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" referrerpolicy="no-referrer" />
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="product-content">
        <div class="product-meta">
          <span class="product-category">${product.categoryName}</span>
          ${product.weight ? `<span>${product.weight}</span>` : ''}
        </div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-footer">
          <strong>${formatPrice(product.price)}</strong>
          <button class="btn btn-small" type="button" data-add-to-cart="${product.id}">Добавить</button>
        </div>
      </div>
    </article>
  `;
}

function renderFeaturedProducts() {
  const container = document.querySelector('[data-featured-products]');
  if (!container) return;

  const featured = PRODUCTS.slice(0, 4);
  container.innerHTML = featured.map(createProductCard).join('');
}

function getFilteredProducts() {
  let result = [...PRODUCTS];

  if (state.category !== 'all') {
    result = result.filter(product => product.category === state.category);
  }

  if (state.search.trim()) {
    const query = state.search.trim().toLowerCase();
    result = result.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.categoryName.toLowerCase().includes(query)
    );
  }

  if (state.sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  }

  if (state.sort === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  }

  if (state.sort === 'name-asc') {
    result.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  }

  return result;
}

function renderCatalogPage() {
  const grid = document.querySelector('[data-products-grid]');
  const counter = document.querySelector('[data-products-counter]');
  const emptyState = document.querySelector('[data-empty-state]');

  if (!grid) return;

  const products = getFilteredProducts();
  grid.innerHTML = products.map(createProductCard).join('');

  if (counter) {
    counter.textContent = `Позиций в меню: ${products.length}`;
  }

  if (emptyState) {
    emptyState.classList.toggle('hidden', products.length > 0);
  }
}

function applyInitialCategory() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  const categoryButton = document.querySelector(`[data-category="${category}"]`);

  if (!categoryButton) return;

  state.category = category;
  updateActiveCategory(category);
}

function updateActiveCategory(category) {
  document.querySelectorAll('[data-category]').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.category === category);
  });
}

function renderCartPage() {
  const cartItemsContainer = document.querySelector('[data-cart-items]');
  const emptyState = document.querySelector('[data-cart-empty]');
  const summaryCount = document.querySelector('[data-summary-count]');
  const summaryTotal = document.querySelector('[data-summary-total]');

  if (!cartItemsContainer) return;

  const cart = getCart();
  const detailedCart = cart
    .map(item => ({ ...item, product: findProduct(item.id) }))
    .filter(item => item.product);

  const totalCount = detailedCart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = detailedCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  cartItemsContainer.innerHTML = detailedCart.map(item => `
    <article class="cart-item">
      <img src="${item.product.image}" alt="${item.product.name}" referrerpolicy="no-referrer" />
      <div class="cart-item-info">
        <span>${item.product.categoryName}${item.product.weight ? ` / ${item.product.weight}` : ''}</span>
        <h3>${item.product.name}</h3>
        <p>${formatPrice(item.product.price)} за штуку</p>
      </div>
      <div class="quantity-control" aria-label="Количество">
        <button type="button" data-quantity-action="decrease" data-product-id="${item.product.id}">−</button>
        <strong>${item.quantity}</strong>
        <button type="button" data-quantity-action="increase" data-product-id="${item.product.id}">+</button>
      </div>
      <strong class="cart-item-total">${formatPrice(item.product.price * item.quantity)}</strong>
      <button class="remove-btn" type="button" data-remove-item="${item.product.id}">Удалить</button>
    </article>
  `).join('');

  if (emptyState) {
    emptyState.classList.toggle('hidden', detailedCart.length > 0);
  }

  if (summaryCount) summaryCount.textContent = totalCount;
  if (summaryTotal) summaryTotal.textContent = formatPrice(totalPrice);
}

function setupCatalogEvents() {
  const searchInput = document.querySelector('[data-search-input]');
  const sortSelect = document.querySelector('[data-sort-select]');
  const tabs = document.querySelectorAll('[data-category]');

  if (searchInput) {
    searchInput.addEventListener('input', event => {
      state.search = event.target.value;
      renderCatalogPage();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', event => {
      state.sort = event.target.value;
      renderCatalogPage();
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      state.category = tab.dataset.category;
      updateActiveCategory(state.category);
      renderCatalogPage();
    });
  });
}

function setupCartEvents() {
  document.addEventListener('click', event => {
    const quantityButton = event.target.closest('[data-quantity-action]');
    const removeButton = event.target.closest('[data-remove-item]');
    const clearButton = event.target.closest('[data-clear-cart]');

    if (quantityButton) {
      changeCartQuantity(quantityButton.dataset.productId, quantityButton.dataset.quantityAction);
    }

    if (removeButton) {
      removeFromCart(removeButton.dataset.removeItem);
    }

    if (clearButton) {
      clearCart();
    }
  });
}

function setupGlobalEvents() {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  document.addEventListener('click', event => {
    const addButton = event.target.closest('[data-add-to-cart]');
    if (addButton) {
      addToCart(addButton.dataset.addToCart);
    }
  });
}

function setupScrollTopButton() {
  const scrollTopButton = document.querySelector('.scroll-top');
  if (!scrollTopButton) return;

  const toggleScrollTopButton = () => {
    const isVisible = window.scrollY > Math.min(420, window.innerHeight * 0.7);
    scrollTopButton.classList.toggle('is-visible', isVisible);
    scrollTopButton.setAttribute('aria-hidden', String(!isVisible));
  };

  toggleScrollTopButton();
  window.addEventListener('scroll', toggleScrollTopButton, { passive: true });
}

function setupOrderForm() {
  const form = document.querySelector('[data-order-form]');
  const message = document.querySelector('[data-order-message]');

  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const cart = getCart();

    if (cart.length === 0) {
      message.textContent = 'Сначала добавьте товары в корзину.';
      message.className = 'form-message error';
      return;
    }

    if (!form.checkValidity()) {
      message.textContent = 'Заполните обязательные поля корректно.';
      message.className = 'form-message error';
      return;
    }

    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    message.textContent = `Заказ №${orderNumber} оформлен. Менеджер свяжется с вами для подтверждения.`;
    message.className = 'form-message success';
    form.reset();
    clearCart();
  });
}

function setupFeedbackForm() {
  const form = document.querySelector('[data-feedback-form]');
  const message = document.querySelector('[data-feedback-message]');

  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();

    if (!form.checkValidity()) {
      message.textContent = 'Проверьте правильность заполнения формы.';
      message.className = 'form-message error';
      return;
    }

    message.textContent = 'Сообщение отправлено. Спасибо за обратную связь!';
    message.className = 'form-message success';
    form.reset();
  });
}

function showToast(text) {
  const oldToast = document.querySelector('.toast');
  if (oldToast) oldToast.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = text;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2200);
}

function init() {
  updateCartCount();
  setupGlobalEvents();
  setupScrollTopButton();
  applyInitialCategory();
  setupCatalogEvents();
  setupCartEvents();
  setupOrderForm();
  setupFeedbackForm();
  renderFeaturedProducts();
  renderCatalogPage();
  renderCartPage();
}

document.addEventListener('DOMContentLoaded', init);
