import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">دسترسی غیرمجاز</h1>
        <p className="text-gray-600 mb-6">شما دسترسی به این صفحه ندارید</p>
        <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}