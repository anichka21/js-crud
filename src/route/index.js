// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

class Product {
  static #list = []
  static #count = 0

  constructor(title, description, category1, category2, price) {
    this.id = ++Product.#count
    this.title = title
    this.description = description
    this.category1 = category1
    this.category2 = category2
    this.price = price
  }

  static add = (
    title,
    description,
    category1,
    category2,
    price
  ) => {
    const newProduct = new Product (
      title,
      description,
      category1,
      category2,
      price,
    )

    this.#list.push(newProduct)
  }

  static getList = () => {
    return this.#list
  }

  static getById = (id) => {
    return this.#list.find((product) => product.id === id)
  }

  static getRandomList = (id) => {
    const filteredList = this.#list.filter(
      (product) => product.id !== id,
    )

    const shuffledList = filteredList.sort(
      () => Math.random() - 0.5,
    )

    return shuffledList.slice(0, 3)
  }
}


Product.add(
  'Ноутбук Lenovo IdeaPad Slim 5 16IAH8 (83BG001ARA) Cloud Grey',
  'Екран 16" IPS (1920x1200) WUXGA, матовий / Intel Core i5-12450H (2.0 - 4.4 ГГц) / RAM 16 ГБ / SSD 512 ГБ',
  'Готовий до відправки',
  'Топ продажів',
  20500,
)

Product.add(
  'Ноутбук ASUS TUF Gaming F15 (2022) FX507ZC4-HN087 (90NR0GW1-M00HJ0) Mecha Gray',
  'Екран 15.6" IPS (1920x1080) Full HD 144 Гц, матовий / Intel Core i5-12500H (2.5 - 4.5 ГГц) / RAM 16 ГБ / SSD 512 ГБ',
  'Готовий до відправки',
  'Топ продажів',
  23400,
)

Product.add(
  'Ноутбук Acer Aspire 7 A715-76G-51C4 (NH.QN4EU.003) Charcoal Black',
  'Екран 15.6" IPS (1920x1080) Full HD, матовий / Intel Core i5-12450H (2.0 - 4.4 ГГц) / RAM 8 ГБ / SSD 512 ГБ',
  'Готовий до відправки',
  'Топ продажів',
  29000,
)



// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    data: {
      message: 'Операція успішна',
      link: '/test-path'
    }
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-index', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',
    data: {
      title: "Ноутбук ASUS ROG Strix G17 2023 G713PI-HX049",
      description: "Екран 17.3 IPS (1920x1080) Full HD 144 Гц, матовий / AMD Ryzen 9 7845HX (3.0 - 5.2 ГГц) / RAM 16 ГБ / SSD 1 ТБ / nVidia GeForce RTX 4070, 8 ГБ / без ОД / LAN / Wi-Fi / Bluetooth / без ОС / 2.8 кг / сірий",
      category1: "Готовий до відправки",
      category2: 'Топ продажів',
      price: 27000
    }
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',
    data: {
      list: Product.getList(),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-product', function (req, res) {
  // res.render генерує нам HTML сторінку

  const id = Number(req.query.id)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',
    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
