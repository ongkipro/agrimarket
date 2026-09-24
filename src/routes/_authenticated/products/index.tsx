import { createFileRoute } from '@tanstack/react-router'
import { ProductsOverviewHub } from '@/features/products'

export const Route = createFileRoute('/_authenticated/products/')({
  component: ProductsOverviewHub,
})
