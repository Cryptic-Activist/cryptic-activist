import {
  takeLatest,
  all,
} from 'redux-saga/effects';


import asyncLoginUserApi from './user/loginUser';
import asyncRegisterAdminUserApi from './user/registerAdminUser';
import asyncLoginAdminUserApi from './user/loginAdminUser';
import asyncGetMostReadPostApi from './homepage/getMostReadPost';
import asyncLoginUserProviderApi from './user/loginUserProvider';
import asyncGetPublicProfileApi from './user/getPublicProfile';
import asyncSetFollowAuthorApi from './user/setFollowAuthor';
import asyncSetUnfollowAuthorApi from './user/setUnfollowAuthor';
import asyncLogoutUserApi from './user/logoutUser';
import asyncRefreshUserData from './user/refreshUserData';
import asyncUpdateProfileUserInfo from './user/updateProfileUserInfo';
import asyncGetPodcasts from './podcasts/getPodcasts';
import asyncGetPodcast from './podcasts/getPodcast';
import asyncGetRelatedPodcastsApi from './podcasts/getRelatedPodcast';
import asyncGetRecentCategoriesApi from './blog/getRecentCategories';
import asyncGetMainBlogPostsApi from './blog/getMainBlogPosts';
import asyncGetMostRecentVideosApi from './blog/getMostRecentVideos';
import asyncGetNewsApi from './blog/getNews';
import asyncGetArticlesApi from './blog/getArticles';
import asyncGetTutorialsApi from './blog/getTutorials';
import asyncGetPostApi from './blog/getPost';
import asyncGetCommentsPost from './blog/getCommentsPost';
import asyncPostComment from './blog/postComment';
import asyncGetRelatedBlogPostsApi from './blog/getRelatedBlogPosts';
import asyncUpdateHowManyReadApi from './blog/updateHowManyRead';
import asyncPostsByCategoryApi from './blog/getPostsByCategory';
import asyncPostsByTagApi from './blog/getPostsByTag';
import asyncPodcastsByCategoryApi from './podcasts/getPodcastsByCategory';
import asyncPodcastsByTagApi from './podcasts/getPodcastsByTag';

export default function* root() {
  yield all([
    takeLatest('REQUEST_GET_MOST_READ_POST', asyncGetMostReadPostApi),
    takeLatest('REQUEST_REGISTER_ADMIN_USER', asyncRegisterAdminUserApi),
    takeLatest('REQUEST_LOGIN_ADMIN_USER', asyncLoginAdminUserApi),
    takeLatest('REQUEST_LOGIN_USER', asyncLoginUserApi),
    takeLatest('REQUEST_LOGIN_USER_PROVIDER', asyncLoginUserProviderApi),
    takeLatest('REQUEST_GET_PUBLIC_PROFILE', asyncGetPublicProfileApi),
    takeLatest('REQUEST_SET_FOLLOW_AUTHOR', asyncSetFollowAuthorApi),
    takeLatest('REQUEST_SET_UNFOLLOW_AUTHOR', asyncSetUnfollowAuthorApi),
    takeLatest('REQUEST_LOGOUT_USER', asyncLogoutUserApi),
    takeLatest('REQUEST_REFRESH_USER_DATA', asyncRefreshUserData),
    takeLatest('REQUEST_UPDATE_USER_INFO', asyncUpdateProfileUserInfo),
    takeLatest('REQUEST_ALL_PODCASTS', asyncGetPodcasts),
    takeLatest('REQUEST_PODCAST_BY_SLUG', asyncGetPodcast),
    takeLatest('REQUEST_RELATED_PODCASTS', asyncGetRelatedPodcastsApi),
    takeLatest('REQUEST_RECENT_CATEGORIES', asyncGetRecentCategoriesApi),
    takeLatest('REQUEST_GET_MAIN_BLOG_POSTS', asyncGetMainBlogPostsApi),
    takeLatest('REQUEST_MOST_RECENT_VIDEOS', asyncGetMostRecentVideosApi),
    takeLatest('REQUEST_NEWS', asyncGetNewsApi),
    takeLatest('REQUEST_ARTICLES', asyncGetArticlesApi),
    takeLatest('REQUEST_TUTORIALS', asyncGetTutorialsApi),
    takeLatest('REQUEST_POST', asyncGetPostApi),
    takeLatest('REQUEST_POST_COMMENT', asyncPostComment),
    takeLatest('REQUEST_GET_ALL_COMMENTS_POST', asyncGetCommentsPost),
    takeLatest('REQUEST_UPDATE_HOW_MANY_READ', asyncUpdateHowManyReadApi),
    takeLatest('REQUEST_POSTS_BY_CATEGORY', asyncPostsByCategoryApi),
    takeLatest('REQUEST_POSTS_BY_TAG', asyncPostsByTagApi),
    takeLatest('REQUEST_PODCASTS_BY_CATEGORY', asyncPodcastsByCategoryApi),
    takeLatest('REQUEST_PODCASTS_BY_TAG', asyncPodcastsByTagApi),
    takeLatest('REQUEST_GET_RELATED_POSTS', asyncGetRelatedBlogPostsApi),
  ]);
}
