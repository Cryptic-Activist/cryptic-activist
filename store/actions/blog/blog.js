/* eslint-disable import/prefer-default-export */
export function getArticles() {
  return {
    type: 'REQUEST_ARTICLES',
  };
}

export function getRecentCategories(number) {
  return {
    type: 'REQUEST_RECENT_CATEGORIES',
    payload: {
      number,
    },
  };
}

export function getMainBlogPost() {
  return {
    type: 'REQUEST_GET_MAIN_BLOG_POSTS',
  };
}

export function getMostRecentVideos() {
  return {
    type: 'REQUEST_MOST_RECENT_VIDEOS',
  };
}

export function getNews() {
  return {
    type: 'REQUEST_NEWS',
  };
}

export function getTutorials() {
  return {
    type: 'REQUEST_TUTORIALS',
  };
}
