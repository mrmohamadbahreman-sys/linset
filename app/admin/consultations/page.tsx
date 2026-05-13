'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Consultation {
  id: number;
  name: string;
  phone: string;
  topic: string;
  status: string;
  created_at: string;
}

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchConsultations();
  }, [filter]);

  const fetchConsultations = async () => {
    try {
      const res = await fetch(`/api/consultations?status=${filter}`);
      const data = await res.json();
      setConsultations(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/consultations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchConsultations();
  };

  const deleteConsultation = async (id: number) => {
    if (confirm('آیا مطمئن هستید؟')) {
      await fetch(`/api/consultations/${id}`, { method: 'DELETE' });
      fetchConsultations();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">جدید</span>;
      case 'read': return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">خوانده شده</span>;
      case 'contacted': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">تماس گرفته شده</span>;
      default: return null;
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-main">درخواست‌های مشاوره</h1>
      </div>

      {/* فیلترها */}
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'read', 'contacted'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              filter === status 
                ? 'bg-primary text-white' 
                : 'bg-card text-muted hover:bg-primary/10'
            }`}
          >
            {status === 'all' ? 'همه' : status === 'pending' ? 'جدید' : status === 'read' ? 'خوانده شده' : 'تماس گرفته شده'}
          </button>
        ))}
      </div>

      {/* لیست درخواست‌ها */}
      {consultations.length === 0 ? (
        <div className="bg-card rounded-2xl p-12 text-center border border-primary/20">
          <p className="text-muted">هیچ درخواستی یافت نشد</p>
        </div>
      ) : (
        <div className="space-y-3">
          {consultations.map((cons) => (
            <div key={cons.id} className="bg-card rounded-2xl p-5 border border-primary/20">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-main">{cons.name}</h3>
                    {getStatusBadge(cons.status)}
                  </div>
                  <p className="text-sm text-muted">📞 {cons.phone}</p>
                  <p className="text-sm text-muted">📋 {cons.topic}</p>
                  <p className="text-xs text-light mt-2">{new Date(cons.created_at).toLocaleDateString('fa-IR')}</p>
                </div>
                <div className="flex gap-2">
                  {cons.status === 'pending' && (
                    <button onClick={() => updateStatus(cons.id, 'read')} className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm">خوانده شد</button>
                  )}
                  {cons.status === 'read' && (
                    <button onClick={() => updateStatus(cons.id, 'contacted')} className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm">تماس گرفته شد</button>
                  )}
                  <button onClick={() => deleteConsultation(cons.id)} className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm">حذف</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}