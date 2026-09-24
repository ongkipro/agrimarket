import { createFileRoute } from '@tanstack/react-router'
import { getProductById } from '@/features/agri/data-provider'
import { ProductDetailView } from '@/features/products/product-detail-view'

export const Route = createFileRoute('/_authenticated/products/bensu')({
  component: () => {
    const product = getProductById('bensu')!
    return <ProductDetailView product={product} />
  },
})
