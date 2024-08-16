import 'server-only';
import { PrismaClient, Product } from '@prisma/client';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

const prisma = new PrismaClient();
/*
export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  url: text('url').notNull(),
  name: text('name').notNull(),
  //status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  //stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type SelectProduct = typeof product.$inferSelect;
export const insertProductSchema = createInsertSchema(product);
*/

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: Product[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Always search the full table, not per page
  if (search) {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      take: 1000,
    })
    return {
      products: products,
      newOffset: null,
      totalProducts: products.length,
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  let totalProducts = await prisma.product.count();
  let moreProducts = await await prisma.product.findMany({
    skip: offset,
    take: 5,
  })
  let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts,
  };
}

export async function deleteProductById(id: string) {
  await prisma.product.delete({
    where: { id },
  })
}
