import { createFileRoute } from '@tanstack/react-router'
import { getProductById } from '@/features/agri/data-provider'
import { ProductDetailView } from '@/features/products/product-detail-view'

export const Route = createFileRoute('/_authenticated/products/saratoga')({
  component: () => {
    const product = getProductById('saratoga')!
    return <ProductDetailView product={product} />
  },
})
