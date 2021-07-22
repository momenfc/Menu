const meals = [
  {
    id: 1,
    name: 'buttermilk pancakes',
    price: 30,
    image:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
    descraption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, voluptatibus deleniti. Voluptatem temporibus sit possimus consequatur ea debitis minus? Veritatis.',
    rate: 4,
    category: 'breakfast',
  },
  {
    id: 2,
    name: 'janck',
    price: 20,
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    descraption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, voluptatibus deleniti. Voluptatem temporibus sit possimus consequatur ea debitis.',
    rate: 3.5,
    category: 'lunch',
  },
  {
    id: 3,
    name: 'pinabatter',
    price: 10,
    image:
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=714&q=80',
    descraption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, voluptatibus deleniti. Voluptatem temporibus sit possimus consequatur ea debitis minus? Veritatis.',
    rate: 2,
    category: 'shakes',
  },
  {
    id: 4,
    name: 'routhbeef',
    price: 40,
    image:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80',
    descraption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, voluptatibus deleniti.',
    rate: 5,
    category: 'lunch',
  },
  {
    id: 5,
    name: 'avocado with souse',
    price: 35,
    image:
      'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    descraption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, voluptatibus deleniti. Voluptatem temporibus sit possimus consequatur ea debitis minus? Veritatis.',
    rate: 4,
    category: 'shakes',
  },
  {
    id: 6,
    name: 'pizza huat',
    price: 45,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    descraption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, voluptatibus deleniti. Voluptatem temporibus.',
    rate: 4.5,
    category: 'dinner',
  },
  {
    id: 7,
    name: 'stick beef',
    price: 99,
    image:
      'https://images.unsplash.com/photo-1603073163308-9654c3fb70b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    descraption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, voluptatibus deleniti. Voluptatem temporibus.',
    rate: 4.5,
    category: 'dinner',
  },
];

// LOCAL STORAGE FUNCTIONS
const LocalStorage = {
  //
  get: function () {
    let menu = JSON.parse(localStorage.getItem('menu'));
    if (!menu) {
      menu = meals;
      localStorage.setItem('menu', JSON.stringify(menu));
    }
    return menu;
  },
  //
  set: function (newMenu) {
    localStorage.setItem('menu', JSON.stringify(newMenu));
    state.menu = newMenu;
  },
  //
  add: function (item) {
    const menu = this.get();
    menu.push(item);
    LocalStorage.set(menu);
  },
  //
  remove: function (id) {
    let menu = this.get();
    menu = menu.filter((item) => item.id != id);
    LocalStorage.set(menu);
    displayMenu(menu);
  },
  //
  update: function (nItem) {
    let menu = this.get();
    menu = menu.map((item) => {
      if (item.id == nItem.id) {
        return nItem;
      }
      return item;
    });
    LocalStorage.set(menu);
    displayMenu(menu);
  },
  //
  clear: function () {
    localStorage.clear();
  },
};

const state = {
  menu: LocalStorage.get(),
  curItem: {},
  status: '',
};

// define elements
const menuContent = document.querySelector('.menu-content'),
  mealsFilter = document.querySelector('.menu-filter'),
  modalAddrecipe = document.querySelector('.modal.add-recipe'),
  addRecipeBtn = document.querySelector('.add-recipe-btn'),
  overlay = document.querySelector('.overlay'),
  inputRating = document.querySelector('.modal input[type=range]'),
  form = document.querySelector('.form-add-recipe'),
  recipeName = document.querySelector('.form-add-recipe input[name=recipe]'),
  recipePrice = document.querySelector('.form-add-recipe input[name=price]'),
  recipeImg = document.querySelector('.form-add-recipe input[name=image]'),
  recipeDesc = document.querySelector(
    '.form-add-recipe textarea[name=descraption]'
  ),
  recipeCate = document.querySelector('.form-add-recipe input[name=category]'),
  recipeRating = document.querySelector('.form-add-recipe input[name=rating]');

// function
const getAllCategory = state.menu.reduce(
  function (values, item) {
    if (!values.includes(item.category)) values.push(item.category);
    return values;
  },
  ['all']
);

const createFilterBtn = function (menu) {
  const categorys = state.menu.reduce(
    function (values, item) {
      if (!values.includes(item.category)) values.push(item.category);
      return values;
    },
    ['all']
  );
  const filterBtns = categorys
    .map(
      (category) => `
  <button data-filter=${category} class="btn btn-yellow menu-filter-btn">${category}</button>`
    )
    .join('');
  mealsFilter.innerHTML = filterBtns;
};
// const allPrice = meals.reduce((val, item) => val + item.price, 10);
// console.log(allPrice);

// CREATE RATING STARS FUNCTION
const createRatingStars = function (rate) {
  let markup = '';
  for (let i = 0.5; i <= +rate; i = i + 0.5) {
    if (!(i % 1))
      markup += '<span class="rate-star"><i class="fas fa-star"></i></span>';

    if (i % 1 && i === +rate)
      markup +=
        '<span class="rate-star"><i class="fas fa-star-half"></i></span>';
  }
  return markup;
};

const displayMenu = function (menu) {
  const markup = menu
    .map(function (meal) {
      return `<article data-id=${meal.id} class="item">
    <div class="item-img">
      <img
        src="${meal.image}"
        alt="${meal.name} photo"
      />
    </div>

    <div class="item-text">
      <div class="item-title">
        <h4>${meal.name}</h4>
        <p class="item-price">$${Number(meal.price).toFixed(2)}</p>
      </div>

      <p class="item-descraption">
        ${meal.descraption}
      </p>
      <div class="item-rate">${createRatingStars(meal.rate)}</div>
      <div class="item-options">
      <button class="btn btn-update"><i class="fas fa-pen"></i></button>
      <button class="btn btn-delete"><i class="fas fa-times"></i></button>
      </div>
    </div>
  </article>`;
    })
    .join('');

  menuContent.innerHTML = markup;
  return markup;
};

// SHOW MENU MEALS FUNCTION
mealsFilter.addEventListener('click', function (e) {
  if (e.target.closest('.menu-filter-btn')) {
    const filter = e.target.dataset.filter;
    const mealsFilter = state.menu.filter((meal) => meal.category === filter);
    if (filter === 'all') return displayMenu(state.menu);

    displayMenu(mealsFilter);
  }
});

// window.addEventListener('DOMContentLoaded', displayMenu.bind(this, state.menu));

function setForm(status) {
  if (status === 'ADD') {
    document.querySelector('.status-label').textContent = 'add recipe';
    document.querySelector('.modal.add-recipe input[type=submit]').value =
      'ADD RECIPE';
  }
  if (status === 'UPDATA') {
    document.querySelector('.status-label').textContent = 'updata recipe';
    document.querySelector('.modal.add-recipe input[type=submit]').value =
      'UPDATA RECIPE';
  }
}

function showModalRecipe() {
  setForm(state.status);
  modalAddrecipe.classList.add('active');
  overlay.classList.add('active');
}
function hideModalRecipe() {
  modalAddrecipe.classList.remove('active');
  overlay.classList.remove('active');
}

overlay.addEventListener('click', (e) => {
  if (e.target.closest('.overlay')) hideModalRecipe();
});

modalAddrecipe.addEventListener('click', function (e) {
  if (e.target.closest('.close-modal-btn')) hideModalRecipe();
});

addRecipeBtn.addEventListener('click', function (e) {
  state.status = 'ADD';
  clearInput();

  showModalRecipe();
});

inputRating.addEventListener('change', function (e) {
  const rating = e.target.value;
  document.querySelector('.rating-val').textContent = rating;
});

const clearInput = function () {
  recipeName.value =
    recipePrice.value =
    recipeImg.value =
    recipeDesc.value =
    recipeRating.value =
    recipeCate.value =
      '';
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = recipeName.value,
    price = recipePrice.value,
    image = recipeImg.value,
    descraption = recipeDesc.value,
    rate = recipeRating.value,
    category = recipeCate.value;

  if (
    name === '' ||
    price === '' ||
    image === '' ||
    descraption === '' ||
    category === ''
  ) {
    alert('fill all fields!');
    return;
  }

  const item = {
    name,
    price,
    image,
    descraption,
    rate,
    category,
  };
  // create id
  let max = 1;
  let id;
  if (state.status === 'ADD') {
    id = state.menu
      .map((item) => item.id)
      .reduce(function (a, cur) {
        max < cur ? (max = cur) : max;
        return ++max;
      }, 1);

    item.id = id;
    LocalStorage.add(item);
  } else {
    id = state.curItem.id;
    item.id = id;
    LocalStorage.update(item);
  }

  console.log(id);

  hideModalRecipe();
  init();
});

function init() {
  createFilterBtn(state.menu);
  displayMenu(state.menu);
  clearInput();
}

init();
menuContent.addEventListener('click', function (e) {
  console.log(e.target);
  if (e.target.closest('.btn-update')) {
    state.status = 'UPDATA';
    const { id } = e.target.closest('.item').dataset;
    const item = state.menu.find((item) => item.id == id);
    state.curItem = item;
    //
    recipeName.value = item.name;
    recipePrice.value = item.price;
    recipeImg.value = item.image;
    recipeDesc.value = item.descraption;
    recipeCate.value = item.category;
    recipeRating.value = item.rate;
    showModalRecipe();
  }
  //

  if (e.target.closest('.btn-delete')) {
    const { id } = e.target.closest('.item').dataset;
    LocalStorage.remove(id);
  }
});
