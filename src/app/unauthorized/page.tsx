import Link from 'next/link';
import React from 'react'

const page = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                You don&apos;t have permission to access this page
              </h2>
            </div>
          </div>
    
          <div className="mt-6">
            <Link href="/dashboard" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Go to Dashboard
            </Link>
          </div>
        </div>
      )
}

export default page;