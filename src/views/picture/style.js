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
  }
  .Pictureview {
    height: 100%;
    width: 100%;
    .wholePictureview {
      height: calc(100% - 30px);
      width: 80%;
      position: absolute;
      top: 30px;
      .major {
        height: 35%;
        width: 100%;
        position: absolute;
      }
      .age {
        height: 48%;
        width: 100%;
        position: absolute;
        top: 32%;
      }
      .gender {
        height: 30%;
        width: 100%;
        position: absolute;
        top: 75%;
      }
    }
    .Rankview {
      height: calc(100% - 30px);
      width: 20%;
      position: absolute;
      left: 80%;
      top: 32px;
    }
  }
`
