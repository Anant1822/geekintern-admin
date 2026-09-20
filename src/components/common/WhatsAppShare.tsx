import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buildWhatsAppUrl, getWhatsAppShareText, cn } from '@/lib/utils'

export interface WhatsAppShareProps {
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  label?: string
  phoneNumber?: string
  message?: string
  text?: string
}

export function WhatsAppShare({
  className,
  variant = 'default',
  size = 'default',
  label = 'Share on WhatsApp',
  phoneNumber,
  message,
  text,
}: WhatsAppShareProps) {
  const handleShare = () => {
    const shareText = message || text || getWhatsAppShareText()
    let url: string
    if (phoneNumber) {
      const cleanPhone = phoneNumber.replace(/[^0-9]/g, '')
      url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(shareText || '')}`
    } else {
      url = buildWhatsAppUrl(shareText || '')
    }
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Button
      onClick={handleShare}
      variant={variant}
      size={size}
      className={cn('bg-[#25D366] hover:bg-[#1fba58] text-white border-0', className)}
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

export default WhatsAppShare
