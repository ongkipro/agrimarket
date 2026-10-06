import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { SidebarTrigger, useSidebarSafe } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}

export function Header({ className, fixed, children, ...props }: HeaderProps) {
  const [offset, setOffset] = useState(0)
  const sidebar = useSidebarSafe()

  useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    }

    // Add scroll listener to the body
    document.addEventListener('scroll', onScroll, { passive: true })

    // Clean up the event listener on unmount
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'z-50 h-16',
        fixed && 'header-fixed peer/header sticky top-0 w-[inherit]',
        offset > 10 && fixed ? 'shadow' : 'shadow-none',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'relative flex h-full items-center gap-2 sm:gap-3 p-3 sm:p-4 min-w-0 overflow-hidden',
          offset > 10 &&
            fixed &&
            'after:absolute after:inset-0 after:-z-10 after:bg-background/20 after:backdrop-blur-lg'
        )}
      >
        {sidebar && (
          <>
            <SidebarTrigger variant='ghost' size='icon' className='-ms-1 shrink-0 h-8 w-8' />
            <Separator orientation='vertical' className='h-4 shrink-0' />
          </>
        )}
        {children}
      </div>
    </header>
  )
}
