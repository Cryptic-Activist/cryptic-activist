
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { publicRoutes, adminRoutes } from '@/constants/routes';

const CreateBannerPage = () => {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [targetWebsite, setTargetWebsite] = useState('public');
  const [pages, setPages] = useState<string[]>([]);
  const [type, setType] = useState('announcement');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/banners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, targetWebsite, pages, type, startDate, endDate, isActive }),
    });
    router.push('/banners');
  };

  const routes = targetWebsite === 'public' ? publicRoutes : adminRoutes;

  return (
    <div>
      <h1>Create Banner</h1>
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
          <label>Pages</label>
          <select multiple value={pages} onChange={(e) => setPages(Array.from(e.target.selectedOptions, option => option.value))}>
            {routes.map((route) => (
              <option key={route.value} value={route.value}>
                {route.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="announcement">Announcement</option>
            <option value="warning">Warning</option>
            <option value="new_feature">New Feature</option>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBannerPage;
