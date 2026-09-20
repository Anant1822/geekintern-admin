import { useEffect } from 'react'

interface PageTitleProps {
  title: string
  suffix?: string
}

export function PageTitle({ title, suffix = 'Intership' }: PageTitleProps) {
  useEffect(() => {
    document.title = suffix ? `${title} | ${suffix}` : title
    return () => {
      document.title = 'Intership - Find Your Perfect Internship'
    }
  }, [title, suffix])

  return null
}


export default PageTitle
