
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const BannersPage = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const res = await fetch('/banners');
      const data = await res.json();
      setBanners(data);
    };
    fetchBanners();
  }, []);

  const deleteBanner = async (id: string) => {
    await fetch(`/banners/${id}`, { method: 'DELETE' });
    setBanners(banners.filter((banner: any) => banner.id !== id));
  };

  return (
    <div>
      <h1>Banners</h1>
      <Link href="/banners/create">
        <button>Create Banner</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Content</th>
            <th>Target Website</th>
            <th>Pages</th>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Is Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner: any) => (
            <tr key={banner.id}>
              <td dangerouslySetInnerHTML={{ __html: banner.content }}></td>
              <td>{banner.targetWebsite}</td>
              <td>{banner.pages.join(', ')}</td>
              <td>{banner.type}</td>
              <td>{new Date(banner.startDate).toLocaleString()}</td>
              <td>{new Date(banner.endDate).toLocaleString()}</td>
              <td>{banner.isActive ? 'Yes' : 'No'}</td>
              <td>
                <Link href={`/banners/edit/${banner.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => deleteBanner(banner.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BannersPage;
