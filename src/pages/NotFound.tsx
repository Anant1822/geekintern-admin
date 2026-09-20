import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/components/layout/PublicLayout';
import PageTitle from '@/components/common/PageTitle';

export default function NotFound() {
  return (
    <PublicLayout>
      <PageTitle title="Page Not Found" />
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* 404 illustration */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-[#1E3A5F] mb-2">404</div>
            <div className="w-24 h-1 bg-[#0D9488] mx-auto rounded-full" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-[#1E3A5F] hover:bg-[#152d4a] text-white">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-[#1E3A5F] text-[#1E3A5F]">
              <Link to="/browse">
                <Search className="mr-2 h-4 w-4" />
                Browse Internships
              </Link>
            </Button>
          </div>

          <div className="mt-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-sm text-gray-500 hover:text-[#1E3A5F] transition-colors"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Go back to previous page
            </button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
