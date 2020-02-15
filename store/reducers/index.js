import { combineReducers } from 'redux';

import user from './user/user';
import homepage from './homepage/homepage';
import publicProfile from './user/publicProfile';
import navbar from './navbar';
import podcasts from './podcasts/podcasts';
import podcast from './podcasts/podcast';
import blog from './blog/blog';
import post from './blog/post';
import publishBlogPostCover from './blog/publishBlogPost';
import uploadedPodcast from './podcasts/uploadPodcast';
import postsByCategory from './blog/postsByCategory';
import postsByTag from './blog/postsByTag';
import podcastsByCategory from './podcasts/podcastsByCategory';
import podcastsByTag from './podcasts/podcastsByTag';

export default combineReducers({
  user,
  homepage,
  publicProfile,
  navbar,
  podcasts,
  podcast,
  blog,
  post,
  publishBlogPostCover,
  uploadedPodcast,
  postsByCategory,
  postsByTag,
  podcastsByCategory,
  podcastsByTag,
});
