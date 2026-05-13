'use client';
import { useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name || !newCategory.slug) {
      alert('نام و اسلاگ دسته‌بندی الزامی است');
      return;
    }

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory)
      });
      if (res.ok) {
        alert('دسته‌بندی اضافه شد');
        setNewCategory({ name: '', slug: '' });
        fetchCategories();
      } else {
        alert('خطا در افزودن دسته‌بندی');
      }
    } catch (error) {
      alert('خطا در ارتباط با سرور');
    }
  };

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      const res = await fetch(`/api/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingCategory.name, slug: editingCategory.slug })
      });
      if (res.ok) {
        alert('دسته‌بندی ویرایش شد');
        setEditingCategory(null);
        fetchCategories();
      } else {
        alert('خطا در ویرایش دسته‌بندی');
      }
    } catch (error) {
      alert('خطا در ارتباط با سرور');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (confirm('آیا مطمئنی میخوای این دسته‌بندی رو حذف کنی؟')) {
      try {
        const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
        if (res.ok) {
          alert('دسته‌بندی حذف شد');
          fetchCategories();
        } else {
          alert('خطا در حذف دسته‌بندی');
        }
      } catch (error) {
        alert('خطا در ارتباط با سرور');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-main mb-6">مدیریت دسته‌بندی‌ها</h1>
      
      {/* فرم اضافه کردن */}
      <div className="bg-card rounded-2xl p-6 mb-8 border border-primary/20">
        <h2 className="text-xl font-bold text-main mb-6">افزودن دسته‌بندی جدید</h2>
        <form onSubmit={handleAddCategory} className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="نام دسته‌بندی (مثال: فروشگاهی)"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="flex-1 px-4 py-2.5 bg-main border border-primary/20 rounded-xl text-sm focus:outline-none focus:border-primary"
          />
          <input
            type="text"
            placeholder="اسلاگ (مثال: ecommerce)"
            value={newCategory.slug}
            onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
            className="flex-1 px-4 py-2.5 bg-main border border-primary/20 rounded-xl text-sm focus:outline-none focus:border-primary"
          />
          <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition">
            افزودن دسته‌بندی
          </button>
        </form>
      </div>

      {/* لیست دسته‌بندی‌ها */}
      <div className="bg-card rounded-2xl p-6 border border-primary/20">
        <h2 className="text-xl font-bold text-main mb-6">لیست دسته‌بندی‌ها</h2>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex justify-between items-center p-4 bg-main rounded-xl">
              {editingCategory?.id === cat.id ? (
                <form onSubmit={handleEditCategory} className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    className="flex-1 px-3 py-2 bg-card border border-primary/20 rounded-lg text-sm"
                  />
                  <input
                    type="text"
                    value={editingCategory.slug}
                    onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                    className="flex-1 px-3 py-2 bg-card border border-primary/20 rounded-lg text-sm"
                  />
                  <button type="submit" className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm">ذخیره</button>
                  <button type="button" onClick={() => setEditingCategory(null)} className="px-3 py-2 bg-gray-500 text-white rounded-lg text-sm">انصراف</button>
                </form>
              ) : (
                <>
                  <div>
                    <span className="text-main font-medium">{cat.name}</span>
                    <span className="text-muted text-xs mr-2">({cat.slug})</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingCategory(cat)} className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition">ویرایش</button>
                    <button onClick={() => handleDeleteCategory(cat.id)} className="px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg text-sm hover:bg-red-500/20 transition">حذف</button>
                  </div>
                </>
              )}
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-muted text-sm text-center py-8">هیچ دسته‌بندی وجود ندارد</p>
          )}
        </div>
      </div>
    </div>
  );
}