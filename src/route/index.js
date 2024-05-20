// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

class Product {
  static #list = []

  constructor(name, price, description) {
    this.name = name,
    this.price = price,
    this.description = description
    this.id = new Date().getTime()
  }

  verifyId = (id) => this.id === id

  static add = ({name, price, description}) => {this.#list.push(new Product(name, price, description))
  }

  static getList = () => this.#list

  static getById = (id) => this.#list.find((product) => product.id === id)

  static updateById = (id, data) => {
    const product = this.getById(id);

    if(product) {
      this.update(product, data)
      return true
    }
    else {
      return false
    }
  }

  static update = (product, {id}) => {
    if(id) {
      product.id = id
    }
  }

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id
    )

    if(index !== -1) {
      this.#list.splice(index, 1)
      return true
    }
    else {
      return false
    }
  }
}

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-create', function (req, res) {
  // res.render генерує нам HTML сторінку

  const {name, price, description} = req.body

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-create',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/product-create', function (req, res) {
  // res.render генерує нам HTML сторінку

  const {name, price, description} = req.body
  const product = {
    name: name,
    price: price,
    description: description
  }
  Product.add(product);
  console.log(Product.getList)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    alert: 'Успішне виконання дії'
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-list', function (req, res) {
  // res.render генерує нам HTML сторінку

  const list = Product.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-list',
    data: {
      products : {
        list,
        isEnpty: list.length === 0,
      }
    }
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-edit', function (req, res) {
  // res.render генерує нам HTML сторінку
  const {id} = req.query
  const product = Product.getById(Number(id))

  if(!product) {
    res.render('alert', {
      style: 'alert',
      isError: true,
      title: 'Помилка',
      alert: 'Товар з таким ID не знайдено'
    })
  }
  else {

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-edit', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-edit',

    data: {
      name: product.name,
      price: product.price,
      id: product.id,
      description: product.description
    }
  })}
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/product-update', function (req, res) {
  // res.render генерує нам HTML сторінку
  const {name, price, description, id} = req.body

  let result = false;
  const product = Product.getById(Number(id))

  if(product.verifyId(id)) {
    Product.update(product, {name}, {price}, {description})
    result = true
  }

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    alert: result ? 'Товар оновлено' : 'Сталась помилка',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-delete', function (req, res) {
  // res.render генерує нам HTML сторінку
  const {id} = req.query
  Product.deleteById(Number(id))

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    alert: 'Товар видалений'
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ================================================================

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
