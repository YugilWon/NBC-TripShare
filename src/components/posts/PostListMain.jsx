import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../service/firebase';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readPost } from '../../redux/modules/postsSlice';

const PostListMain = ({ openSide, option }) => {
  //useSelector
  const posts = useSelector((state) => state.postsSlice);
  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'posts'));
      const querySnapshot = await getDocs(q);
      const initialTils = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        initialTils.push(data);
      });
      dispatch(readPost(initialTils));
    };
    fetchData();
  }, []);

  //Event Handler
  const onPostClick = (post) => {
    navigate(`/detail/${post.id}`, {
      state: {
        prevTitle: post.postTitle,
        prevBody: post.postBody
      }
    });
  };

  return (
    <StSideBox>
      <button onClick={openSide}>닫기</button>
      {posts
        .filter((post) => post.category === `${option}`)
        .map((post) => {
          return (
            <div key={post.id} style={{ border: 'solid', margin: '10px', padding: '10px' }}>
              <ul>
                <li>{post.category}</li>
                <br />
                <li>{post.postTitle}</li>
                <li>{post.postBody}</li>
                {/* <img src={post.postImg} /> */}
                <button onClick={() => onPostClick(post)}>상세보기</button>
              </ul>
            </div>
          );
        })}
    </StSideBox>
  );
};

export default PostListMain;

export const StSideBox = styled.ul`
  background-color: lightblue;
  width: 400px;
  height: 100%;
  right: 0px;
  position: absolute;
  transition: 1s;
  z-index: 999;
`;