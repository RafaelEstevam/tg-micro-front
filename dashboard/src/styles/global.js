import { createGlobalStyle } from 'styled-components';
import {COLORS} from './colors';

export default createGlobalStyle`

  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-size: 16px;
    // opacity: ${(props) => 1 - ((props.theme.brightness / 100) * 2)}; /*brilho*/
    // filter: brightness(${(props) => 1 + ((props.theme.brightness / 100))}) contrast(${(props) => 1 + ((props.theme.contrast / 100))});
  }

  ::-webkit-scrollbar-track {
    background-color: #666;
  }
  ::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border: 2px solid transparent;
  }

  html{
    font-size: ${(props) => 1 + ((props.theme.fontSize / 10) * 2)}rem;
    height: 100vh;
    body, #root{
      min-height: 100vh;
    }
  }

  .main-font-type{
    font-family: 'Impact';
  }

  .main-font-style{
    transform: skew(-20deg);
  }

  .mobile{
    display: none;
  }
  .desktop{
    display: block;
  }
  
  @media(max-width: 980px){
    .mobile{
      display: block;
    }
    .desktop{
      display: none;
    }
  }

  .main-background{
    background: ${COLORS.light1};
  }

  .primary-background{
    background: ${COLORS.primary};
  }

  .second-background{
    background: ${COLORS.light0};
  }

  .primary-text{
    color: ${COLORS.primary};
  }

  .secondary-text{
    color: ${COLORS.secondary};
  }

  .success-text{
    color: ${COLORS.success};
  }

  .danger-text{
    color: ${COLORS.danger};
  }

  .main-text{
    color: ${COLORS.gray0};
    svg, span{
      color: ${COLORS.gray0};
    }
  }

  .nightMode{
    .main-background{
      background: ${COLORS.dark0};
    }
    .second-background{
      background: ${COLORS.dark1};
    }
    .main-text{
      color: ${COLORS.light0};
      svg, span{
        color: ${COLORS.light0};
      }
    }

    input, select{
      color: ${COLORS.light0};
    }
    
  }

 

`;