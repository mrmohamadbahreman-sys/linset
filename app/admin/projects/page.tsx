'use client';
import { useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Page {
  name: string;
  screenshot: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  technology: string;
  site_url: string;
  github_url: string;
  desktop_screenshot: string;
  mobile_screenshot: string;
  pages?: Page[];
  category_ids: number[];
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    image_url: '',
    technology: '',
    site_url: '',
    github_url: '',
    desktop_screenshot: '',
    mobile_screenshot: '',
    pages: [{ name: '', screenshot: '' }] as Page[],
    category_ids: [] as number[]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, categoriesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/categories')
      ]);
      const projectsData = await projectsRes.json();
      const categoriesData = await categoriesRes.json();
      setProjects(projectsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setFetching(false);
    }
  };

  const uploadImage = async (file: File, fieldName: string, pageIndex?: number) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'projects');

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        if (pageIndex !== undefined) {
          const newPages = [...form.pages];
          newPages[pageIndex].screenshot = data.url;
          setForm(prev => ({ ...prev, pages: newPages }));
        } else {
          setForm(prev => ({ ...prev, [fieldName]: data.url }));
        }
      } else {
        alert('خطا در آپلود');
      }
    } catch (error) {
      alert('خطا در آپلود');
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, pageIndex?: number) => {
    const file = e.target.files?.[0];
    if (file) uploadImage(file, fieldName, pageIndex);
  };

  const addPage = () => {
    setForm(prev => ({ ...prev, pages: [...prev.pages, { name: '', screenshot: '' }] }));
  };

  const removePage = (index: number) => {
    const newPages = form.pages.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, pages: newPages }));
  };

  const handlePageChange = (index: number, field: string, value: string) => {
    const newPages = [...form.pages];
    newPages[index] = { ...newPages[index], [field]: value };
    setForm(prev => ({ ...prev, pages: newPages }));
  };

  const handleCategoryChange = (categoryId: number) => {
    setForm(prev => ({
      ...prev,
      category_ids: prev.category_ids.includes(categoryId)
        ? prev.category_ids.filter(id => id !== categoryId)
        : [...prev.category_ids, categoryId]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validPages = form.pages.filter(p => p.name.trim() !== '' || p.screenshot.trim() !== '');
    const dataToSend = { ...form, pages: JSON.stringify(validPages) };

    const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dataToSend) });
      if (res.ok) {
        resetForm();
        fetchData();
        alert(editingId ? 'پروژه ویرایش شد' : 'پروژه اضافه شد');
      } else {
        alert('خطا در ذخیره');
      }
    } catch (error) {
      alert('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: number) => {
    if (confirm('آیا مطمئن هستید؟')) {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
        alert('پروژه حذف شد');
      }
    }
  };

  const editProject = (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description || '',
      image_url: project.image_url || '',
      technology: project.technology || '',
      site_url: project.site_url || '',
      github_url: project.github_url || '',
      desktop_screenshot: project.desktop_screenshot || '',
      mobile_screenshot: project.mobile_screenshot || '',
      pages: project.pages && project.pages.length ? project.pages : [{ name: '', screenshot: '' }],
      category_ids: project.category_ids || []
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: '',
      description: '',
      image_url: '',
      technology: '',
      site_url: '',
      github_url: '',
      desktop_screenshot: '',
      mobile_screenshot: '',
      pages: [{ name: '', screenshot: '' }],
      category_ids: []
    });
  };

  const technologies = ['react', 'next', 'vue', 'angular', 'wordpress', 'laravel', 'python', 'node', 'php'];

  // صفحه‌بندی
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  return (
    <div>
      <h1 className="text-2xl font-bold text-main mb-6">مدیریت پروژه‌ها</h1>
      
      {/* فرم */}
      <div className="bg-card rounded-2xl p-6 mb-8 border border-primary/20">
        <h2 className="text-xl font-bold text-main mb-6">{editingId ? 'ویرایش پروژه' : 'افزودن پروژه جدید'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-main mb-1">عنوان پروژه *</label>
              <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full px-4 py-2.5 bg-main border border-primary/20 rounded-xl focus:outline-none focus:border-primary" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-main mb-1">تکنولوژی</label>
              <select name="technology" value={form.technology} onChange={handleChange} className="w-full px-4 py-2.5 bg-main border border-primary/20 rounded-xl focus:outline-none focus:border-primary">
                <option value="">انتخاب کنید...</option>
                {technologies.map(tech => (<option key={tech} value={tech}>{tech.toUpperCase()}</option>))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-main mb-1">توضیحات</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 bg-main border border-primary/20 rounded-xl focus:outline-none focus:border-primary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className="block text-sm font-medium text-main mb-1">آدرس سایت</label><input type="url" name="site_url" value={form.site_url} onChange={handleChange} className="w-full px-4 py-2.5 bg-main border border-primary/20 rounded-xl" placeholder="https://..." /></div>
            <div><label className="block text-sm font-medium text-main mb-1">گیت‌هاب</label><input type="url" name="github_url" value={form.github_url} onChange={handleChange} className="w-full px-4 py-2.5 bg-main border border-primary/20 rounded-xl" placeholder="https://github.com/..." /></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {['image_url', 'desktop_screenshot', 'mobile_screenshot'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-main mb-1">{field === 'image_url' ? 'عکس اصلی' : field === 'desktop_screenshot' ? 'اسکرین‌شات دسکتاپ' : 'اسکرین‌شات موبایل'}</label>
                <div className="flex gap-2">
                  <input type="text" name={field} value={form[field as keyof typeof form] as string} onChange={handleChange} className="flex-1 px-4 py-2.5 bg-main border border-primary/20 rounded-xl text-sm" placeholder="/uploads/..." />
                  <label className="px-3 bg-primary/10 rounded-xl flex items-center cursor-pointer hover:bg-primary/20 transition">📁<input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, field)} /></label>
                </div>
                {(form[field as keyof typeof form] as string) && <img src={form[field as keyof typeof form] as string} alt="preview" className="mt-2 w-16 h-16 object-cover rounded-lg" />}
              </div>
            ))}
          </div>

          {/* صفحات */}
          <div className="border-t border-primary/20 pt-5">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium text-main">صفحات سایت</label>
              <button type="button" onClick={addPage} className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm">+ افزودن صفحه</button>
            </div>
            {form.pages.map((page, index) => (
              <div key={index} className="bg-main rounded-xl p-4 mb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div><label className="block text-xs text-muted mb-1">نام صفحه</label><input type="text" value={page.name} onChange={(e) => handlePageChange(index, 'name', e.target.value)} className="w-full px-3 py-2 bg-card border border-primary/20 rounded-lg text-sm" placeholder="مثال: صفحه اصلی" /></div>
                  <div><label className="block text-xs text-muted mb-1">عکس صفحه</label><div className="flex gap-2"><input type="text" value={page.screenshot} onChange={(e) => handlePageChange(index, 'screenshot', e.target.value)} className="flex-1 px-3 py-2 bg-card border border-primary/20 rounded-lg text-sm" placeholder="/uploads/..." /><label className="px-2 bg-primary/10 rounded-lg flex items-center cursor-pointer">📷<input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'page', index)} /></label></div></div>
                </div>
                {form.pages.length > 1 && <button type="button" onClick={() => removePage(index)} className="mt-2 text-red-500 text-sm">حذف صفحه</button>}
              </div>
            ))}
          </div>

          {/* دسته‌بندی‌ها */}
          <div>
            <label className="block text-sm font-medium text-main mb-2">انتخاب دسته‌بندی‌ها</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat.id} type="button" onClick={() => handleCategoryChange(cat.id)} className={`px-4 py-2 rounded-full text-sm transition ${form.category_ids.includes(cat.id) ? 'bg-primary text-white' : 'bg-primary/10 text-muted hover:bg-primary/20'}`}>{cat.name}</button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={loading || uploading} className="flex-1 bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-dark transition disabled:opacity-50">{loading ? 'در حال ذخیره...' : uploading ? 'در حال آپلود...' : (editingId ? 'ویرایش پروژه' : 'افزودن پروژه')}</button>
            {editingId && <button type="button" onClick={resetForm} className="px-6 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition">انصراف</button>}
          </div>
        </form>
      </div>

      {/* لیست پروژه‌ها */}
      <div className="bg-card rounded-2xl p-6 border border-primary/20">
        <h2 className="text-xl font-bold text-main mb-6">لیست پروژه‌ها</h2>
        {fetching ? <div className="text-center py-8">در حال بارگذاری...</div> : projects.length === 0 ? <div className="text-center py-8 text-muted">هیچ پروژه‌ای وجود ندارد</div> : (
          <>
            <div className="space-y-3">
              {currentProjects.map((project) => (
                <div key={project.id} className="flex justify-between items-center p-4 border border-primary/20 rounded-xl">
                  <div><h3 className="font-medium text-main">{project.title}</h3><p className="text-sm text-muted">{project.technology}</p></div>
                  <div className="flex gap-2"><button onClick={() => editProject(project)} className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20">ویرایش</button><button onClick={() => deleteProject(project.id)} className="px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg text-sm hover:bg-red-500/20">حذف</button></div>
                </div>
              ))}
            </div>

            {/* صفحه‌بندی */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 rounded-lg bg-primary/10 text-muted hover:bg-primary/20 disabled:opacity-50">قبلی</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                  <button key={num} onClick={() => setCurrentPage(num)} className={`px-3 py-1 rounded-lg transition ${currentPage === num ? 'bg-primary text-white' : 'bg-primary/10 text-muted hover:bg-primary/20'}`}>{num}</button>
                ))}
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 rounded-lg bg-primary/10 text-muted hover:bg-primary/20 disabled:opacity-50">بعدی</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}