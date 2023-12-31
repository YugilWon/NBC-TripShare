import { styled } from 'styled-components';

export const St = {
  Header: styled.header`
    width: 100%;
    height: 90px;
    background-color: rgb(236, 249, 255);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 2;
  `,
  MenuWrapper: styled.div`
    display: flex;
  `,

  ProfileImg: styled.img`
    background-color: white;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-left: 20px;
    image-rendering: -webkit-optimize-contrast !important ;
  `,

  // //이안진
  // Header: styled.header`
  //   position: relative;
  //   width: 100%;
  //   min-width: 800px;
  //   height: 80px;
  //   margin: 0 auto;
  //   background-color: skyblue;
  //   z-index: 999;
  // `,
  // MenuWrapper: styled.div`
  //   display: flex;
  //   align-items: center;
  //   width: 90%;
  //   height: 100%;
  //   margin: 0 auto;
  // `,

  Img: styled.img`
    background-color: white;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    cursor: pointer;
    margin-left: 10px;
  `,

  LogoWrapper: styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  `,

  LogoImg: styled.img`
    width: auto;
    height: 90px;
    cursor: pointer;
    margin-top: 5px;
  `,

  HeaderMenu: styled.div`
    cursor: pointer;
    margin-left: 20px;
  `,

  Nickname: styled.div`
    cursor: pointer;
    font-size: 15px;
    display: flex;
    gap: 5px;
    font-weight: 600;
    align-items: center;
    margin-left: 10px;
  `,

  Dropdown: styled.div`
    width: 100px;
    position: absolute;
    top: 65px;
    margin-left: 5rem;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    z-index: 1;
  `,
  DropdownItem: styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    font-weight: 500;
    color: gray;
    padding: 10px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: #000;
      font-weight: 600;
    }
  `,

  DropdownLine: styled.div`
    border-top: 1px solid #ccc;
  `
};
