const { pgTable, serial, varchar, char, integer, text, timestamp } = require('drizzle-orm/pg-core')

const productsTable = pgTable('products', {
  id: serial().primaryKey().notNull(),
  name: varchar({ length: 100 }).notNull(),
  description: text().notNull(),
  img: varchar(),
  price: integer().notNull(),
  status: char(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

module.exports = { productsTable }
