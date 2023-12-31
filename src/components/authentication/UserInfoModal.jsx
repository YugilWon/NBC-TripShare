import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../service/firebase';
import { getUserProfile } from '../../redux/modules/userInfoSlice';
import { St } from './UserInfoModalStyle';
import { IoMdSettings } from 'react-icons/io';

const UserInfoModal = () => {
  const dispatch = useDispatch();
  const getProfile = useSelector((state) => state.userInfo);

  const { uid } = getProfile;
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPhotoURL, setCurrentPhotoURL] = useState(null);
  const [currentNickname, setCurrentNickname] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // 모달 바깥영역 클릭 시 모달 닫기
  const clickOutside = (e) => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  // Redux 스토어의 사용자 정보가 변경되면 해당 정보를 상태에 반영
  useEffect(() => {
    setCurrentPhotoURL(getProfile.photoURL);
  }, [getProfile.photoURL]);

  useEffect(() => {
    setCurrentNickname(getProfile.nickname);
  }, [getProfile.nickname]);

  // useRef를 이용하여 input태그에 접근
  const imageFileInput = useRef();

  // 이미지 클릭 시 이미지 파일 인풋 태그에 클릭 이벤트 걸기
  const onClickImageFile = () => {
    imageFileInput.current.click();
  };

  // 닉네임 입력값이 변경될 때마다 상태 업데이트
  const nicknameChangeHandler = (e) => {
    setCurrentNickname(e.target.value);
  };

  const profileUpdateHandler = (e) => {
    e.preventDefault();
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    if (!currentNickname) return alert('닉네임을 입력해주세요');
    const q = query(
      // 닉네임 중복 확인
      collection(db, 'userInfo'),
      where('nickname', '==', currentNickname),
      where('email', '!=', getProfile.email)
    );
    const result = await getDocs(q);
    const findData = result.docs[0]?.data();

    if (findData) return alert('이미 사용중인 닉네임 입니다.');

    // Firestore에 닉네임 업데이트
    const userDocRef = doc(db, 'userInfo', uid);
    await updateDoc(userDocRef, { nickname: currentNickname });

    alert('닉네임 수정 완료');

    // 업데이트된 사용자 정보를 Redux 스토어에 반영
    const updateProfileData = { ...getProfile, nickname: currentNickname };
    dispatch(getUserProfile(updateProfileData));
  };

  const changedPhoto = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    try {
      const URL = `${uid}/${file.name}`;
      const storageRef = ref(storage, URL);
      await uploadBytes(storageRef, file);
      const resultPhotoURL = await getDownloadURL(storageRef);
      setCurrentPhotoURL(resultPhotoURL);
      // Firestore에 프로필 사진 URL 업데이트
      const userDocRef = doc(db, 'userInfo', uid);
      await updateDoc(userDocRef, { photoURL: resultPhotoURL });
      alert('프로필 사진 변경 완료');
      // 업데이트된 사용자 정보를 Redux 스토어에 반영
      const updateProfileData = { ...getProfile, photoURL: resultPhotoURL };
      dispatch(getUserProfile(updateProfileData));
    } catch (error) {
      console.error(error);
      alert('프로필 사진 변경 실패', error);
    }
  };

  return (
    <div>
      <IoMdSettings onClick={openModal} />
      {isOpen && (
        <St.ModalBox ref={modalRef}>
          <St.ModalContents>
            <div key={uid}>
              <St.ProfileTitle>Profile</St.ProfileTitle>
              <St.ProfileContainer>
                <St.ProfileImageBox>
                  <St.ProfileImage src={currentPhotoURL} alt="userInfo" onClick={onClickImageFile} />
                </St.ProfileImageBox>

                <St.ImageInput type="file" ref={imageFileInput} onChange={changedPhoto} />

                <form onSubmit={profileUpdateHandler}>
                  <St.ProfileBody>
                    <p>EMAIL</p>
                    <St.Input type="email" placeholder={getProfile.email} disabled={true} />
                    <p>NICKNAME</p>
                    <St.Input type="text" maxLength={6} value={currentNickname} onChange={nicknameChangeHandler} />

                    <St.NicknameChangeBtn type="submit" onClick={updateProfile}>
                      닉네임 변경
                    </St.NicknameChangeBtn>
                  </St.ProfileBody>
                </form>
              </St.ProfileContainer>
            </div>
          </St.ModalContents>
        </St.ModalBox>
      )}
    </div>
  );
};

export default UserInfoModal;
