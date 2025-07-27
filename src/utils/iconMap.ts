import { 
  TrendingUp, 
  Users, 
  Shield, 
  Target, 
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Twitter,
  Menu,
  X,
  type LucideIcon
} from 'lucide-react'

// Map of icon names to Lucide components
export const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Users,
  Shield,
  Target,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Twitter,
  Menu,
  X,
}

// Helper function to get icon component by name
export function getIcon(iconName: string): LucideIcon | null {
  return iconMap[iconName] || null
}

// Default fallback icon
export const DefaultIcon = Target
