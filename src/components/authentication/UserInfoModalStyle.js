import { styled } from 'styled-components';

export const St = {
  ModalBox: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  `,

  ModalContents: styled.div`
    background-color: #fff;
    width: 550px;
    padding: 20px;
    border-radius: 12px;
  `,

  ProfileContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
  `,

  ProfileImageBox: styled.div`
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 100%;
    margin: 30px;
  `,

  ProfileImage: styled.img`
    width: 100%;
    height: 100%;
    cursor: pointer;
    object-fit: cover;
  `,

  ImageUploadBox: styled.div`
    margin-bottom: 15px;
  `,

  ImageInput: styled.input`
    display: none;
  `,

  ProfileBody: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
  Input: styled.input`
    width: 150px;
    height: 30px;
    padding-left: 15px;
    border: 0.03rem solid gray;
    border-radius: 5px;
    background-color: transparent;
    outline: none;
    margin-right: 20px;
  `,

  NicknameChangeBtn: styled.button`
    border: none;
    width: 170px;
    height: 35px;
    margin-top: 10px;
    border-radius: 5px;
  `
};
