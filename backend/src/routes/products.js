const express = require('express')
const router = express.Router()
const db = require('../../db/index')
const { productsTable } = require('../../db/schema')
const { eq } = require('drizzle-orm')

router.get('/', async (req, res) => {
  try {
    const rows = await db.select().from(productsTable)
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: '伺服器問題' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    if (isNaN(id)) {
      return res.status(400).json({ error: '無效的ID' })
    }
    const rows = await db.select().from(productsTable).where(eq(productsTable.id, id))
    if (rows.length === 0) {
      return res.status(404).json({ error: '找不到此商品' })
    }
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: '找不到資料' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { name, description, img, price, status } = req.body
    await db
      .update(productsTable)
      .set({
        name,
        description,
        img,
        price,
        status,
        updatedAt: new Date(),
      })
      .where(eq(productsTable.id, id))
    res.json('成功更新商品')
  } catch (err) {
    res.status(500).json({ error: '伺服器問題' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, description, img, price, status } = req.body
    await db.insert(productsTable).values({
      name,
      description,
      img,
      price,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    res.json('成功新增商品')
  } catch (err) {
    res.status(500).json({ error: '伺服器問題' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await db.delete(productsTable).where(eq(productsTable.id, req.params.id))
    res.json('商品已刪除')
  } catch (err) {
    res.status(500).json({ error: '伺服器問題' })
  }
})

module.exports = router
