import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { __getPostsSlice, __postsSlice } from '../../redux/modules/postsSlice';
import { StPostContainer, StPostList } from './PostStyle';

const PostListMain = ({ option, position }) => {
  const [] = useState();

  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(__getPostsSlice());
    };

    fetchData();
  }, [dispatch]);

  const { postsData, isLoading, isError, error } = useSelector((state) => state.postsSlice);

  if (isLoading) {
    return <h1>아직 로딩 중입니다</h1>;
  }
  if (isError) {
    return <h1>오류가 발생했어요</h1>;
  }

  const onPostClick = (post) => {
    navigate(`/detail/${post.id}`);
  };

  const statedPosts = postsData.filter(
    (post) =>
      post.markerPosition.lat > position.swLat &&
      post.markerPosition.lat < position.neLat &&
      post.markerPosition.lng > position.swLng &&
      post.markerPosition.lng < position.neLng
  );

  const filteredPosts = statedPosts.filter((post) => post.category === `${option}`);

  return (
    <StPostContainer>
      {(option ? filteredPosts : statedPosts).map((post) => {
        const truncatedTitle = post.postTitle.length > 5 ? post.postTitle.substring(0, 5) + '...' : post.postTitle;
        const truncatedBody = post.postBody.length > 10 ? post.postBody.substring(0, 10) + '...' : post.postBody;
        return (
          <StPostList key={post.id}>
            <div style={{ flex: 1 }}>
              <ul>
                <li>{post.category}</li>
                <li>{truncatedTitle}</li>
                <li>{truncatedBody}</li>
                <button onClick={() => onPostClick(post)}>상세보기</button>
              </ul>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <img src={post.postImg} alt="Post Image" style={{ width: '80px', height: '80px' }} />
            </div>
          </StPostList>
        );
      })}
    </StPostContainer>
  );
};

export default PostListMain;
