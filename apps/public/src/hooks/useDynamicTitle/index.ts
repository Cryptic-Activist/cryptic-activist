'use client';

import { useEffect, useState } from 'react';

const useDynamicTitle = (title: string) => {
  const [localTitle, setLocalTitle] = useState(title);

  const onChangeTitle = (newTitle: string) => {
    setLocalTitle(newTitle);
  };

  useEffect(() => {
    document.title = localTitle;
  }, [localTitle]);

  return { onChangeTitle, title: localTitle };
};

export default useDynamicTitle;
