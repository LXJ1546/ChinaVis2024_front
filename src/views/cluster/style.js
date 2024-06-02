import styled from 'styled-components'
// 通过导入或者在线链接SVG
import DiamondSvg from '../../assets/images/diamond.svg'
import CircleSvg from '../../assets/images/circle.svg'
import TriangleSvg from '../../assets/images/triangle.svg'
export const ScatterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    height: 30px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #9b9ca0;
    margin-bottom: 0px;
    font-size: 16px;
    opacity: 0.8;
    .title-icon {
      font-size: 20px;
      margin-left: 4px;
      margin-right: 4px;
    }
  }
  .content {
    flex: 1 1 0%;
    display: flex;
    .left {
      width: 100%;
      display: flex;
      flex-direction: column;
      .shapelegend {
        display: flex;
        align-items: center;
        position: absolute;
        z-index: 10;
        top: 11.4%;
        right: 55%;
        .legend-item {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
          text-align: center;
          .circle {
            width: 15px;
            height: 15px;
            margin-right: 5px;
            background-image: url(${CircleSvg});
            background-size: cover; /* 使SVG图片覆盖整个容器 */
            background-position: center; /* 将SVG图片居中显示 */
          }
          .triangle {
            width: 15px;
            height: 15px;
            margin-right: 5px;
            background-image: url(${TriangleSvg});
            background-size: cover; /* 使SVG图片覆盖整个容器 */
            background-position: center; /* 将SVG图片居中显示 */
          }
          .diamond {
            width: 15px;
            height: 15px;
            margin-right: 5px;
            background-image: url(${DiamondSvg});
            background-size: cover; /* 使SVG图片覆盖整个容器 */
            background-position: center; /* 将SVG图片居中显示 */
          }
        }
      }
      .btn {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1px;
        width: 100%;
        height: 60px;
        background-color: rgb(245, 245, 245);
        align-items: center;
        .leftbtn {
          display: flex;
          align-items: center;
          .label {
            opacity: 0.8;
            margin-left: 10px;
            font-size: 15px;
          }
          .answerbtn {
            display: flex;
            align-items: center;
          }
          .monthbtn {
            display: flex;
            align-items: center;
          }
          .to {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 5px;
          }
        }
        .rightbtn {
          display: flex;
          margin-right: 10px;
          align-items: center;
          .aslider {
            width: 80px;
          }
          .label {
            opacity: 0.8;
            margin-left: 10px;
            font-size: 15px;
          }
        }
      }
      .clusterView {
        flex: 1 1 0%;
      }
    }
  }
`
