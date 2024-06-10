import styled from 'styled-components'

export const PictureWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    height: 30px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #9b9ca0;
    margin-bottom: 6px;
    font-size: 16px;
    opacity: 0.8;
    background: rgb(245, 245, 245);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-weight: bold;
    .title-icon {
      font-size: 18px;
      margin-left: 4px;
      margin-right: 4px;
    }
  }
  .Pictureview {
    height: 100%;
    width: 100%;
    .distribution {
      height: 120px;
      width: 100%;
      position: absolute;
      top: carl(0% + 30px);
      .major {
        height: 100%;
        width: 30%;
        position: absolute;
        left: 1%;
      }
      .age {
        height: 100%;
        width: 30%;
        position: absolute;
        left: 35%;
      }
      .gender {
        height: 100%;
        width: 30%;
        position: absolute;
        left: 69%;
      }
    }
    .Rankview {
      height: 45%;
      width: 100%;
      position: absolute;
      left: 0%;
      top: 60%;
    }
  }
`
