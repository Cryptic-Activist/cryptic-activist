
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { publicRoutes, adminRoutes } from '@/constants/routes';

const EditBannerPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [content, setContent] = useState('');
  const [targetWebsite, setTargetWebsite] = useState('public');
  const [targetPage, setTargetPage] = useState('/');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBanner = async () => {
        const res = await fetch(`/banners/${id}`);
        const data = await res.json();
        setContent(data.content);
        setTargetWebsite(data.targetWebsite);
        setTargetPage(data.targetPage);
        setStartDate(new Date(data.startDate).toISOString().slice(0, 16));
        setEndDate(new Date(data.endDate).toISOString().slice(0, 16));
        setIsActive(data.isActive);
      };
      fetchBanner();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/banners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, targetWebsite, targetPage, startDate, endDate, isActive }),
    });
    router.push('/banners');
  };

  const routes = targetWebsite === 'public' ? publicRoutes : adminRoutes;

  return (
    <div>
      <h1>Edit Banner</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Content</label>
          <ReactQuill value={content} onChange={setContent} />
        </div>
        <div>
          <label>Target Website</label>
          <select value={targetWebsite} onChange={(e) => setTargetWebsite(e.target.value)}>
            <option value="public">Public</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label>Target Page</label>
          <select value={targetPage} onChange={(e) => setTargetPage(e.target.value)}>
            {routes.map((route) => (
              <option key={route.value} value={route.value}>
                {route.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Start Date</label>
          <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label>End Date</label>
          <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          <label>Is Active</label>
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditBannerPage;
