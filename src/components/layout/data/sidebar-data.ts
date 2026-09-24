import {
  LayoutDashboard,
  Monitor,
  History,
  Bell,
  Palette,
  Settings,
  Wrench,
  UserCog,
  Sprout,
  MapPin,
  Sliders,
  TrendingUp,
  Store,
  Database,
  Calendar,
  ListTodo,
  Megaphone,
  CloudSun,
  Package,
  Layers,
  ShieldAlert,
  RefreshCw,
  Award,
  ShieldCheck,
  GitCompare,
  CalendarClock,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Agrimarket Lead',
    email: 'admin@agrimarket.id',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Agrimarket',
      logo: Sprout,
      plan: 'Market Intelligence OS',
    },
  ],
  navGroups: [
    {
      title: 'Market Intelligence',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Commodity Explorer',
          url: '/commodities',
          icon: Sprout,
        },
        {
          title: 'Kalender Tanam',
          url: '/calendar',
          icon: Calendar,
        },
        {
          title: 'Agro-Iklim (BMKG)',
          url: '/climate',
          icon: CloudSun,
        },
        {
          title: 'Geospatial Map',
          url: '/map',
          icon: MapPin,
        },
        {
          title: 'SOM Simulator',
          url: '/simulator',
          icon: Sliders,
        },
        {
          title: 'Market Matrix',
          url: '/matrix',
          icon: TrendingUp,
        },
        {
          title: 'Distribution Network',
          url: '/distribution',
          icon: Store,
        },
        {
          title: 'Audit Ledger',
          url: '/audit',
          icon: Database,
        },
      ],
    },
    {
      title: 'Field Operations',
      items: [
        {
          title: 'Tasks',
          url: '/tasks',
          icon: ListTodo,
        },
        {
          title: 'Meta Ads',
          url: '/ads',
          icon: Megaphone,
        },
      ],
    },
    {
      title: 'Commercial & Products',
      items: [
        {
          title: 'Katalog Produk',
          icon: Package,
          items: [
            {
              title: 'Overview & Mindmap',
              url: '/products',
              icon: Layers,
            },
            {
              title: 'AUSSIE Sawit',
              url: '/products/aussie',
              icon: ShieldAlert,
            },
            {
              title: 'BENSU Hortikultura',
              url: '/products/bensu',
              icon: RefreshCw,
            },
            {
              title: 'SARATOGA Serum',
              url: '/products/saratoga',
              icon: Award,
            },
            {
              title: 'KOJIEN Activator',
              url: '/products/kojien',
              icon: ShieldCheck,
            },
            {
              title: 'Mix & Match Matrix',
              url: '/products/mix-match',
              icon: GitCompare,
            },
            {
              title: 'Kampanye Iklim 2026-27',
              url: '/products/campaigns',
              icon: CalendarClock,
            },
          ],
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Update Log',
          url: '/help-center',
          icon: History,
        },
      ],
    },
  ],
}
