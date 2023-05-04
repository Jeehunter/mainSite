const background = 'rgb(37,37,38)';
const foreground = '#e7e7e7';
const linkableColor = '#006AB1';
const hover = '#3794FF';
// const lightBackground = `linear-gradient(
//   180deg,
//   rgba(247, 149, 51, 0.101961) 0,
//   rgba(243, 112, 85, 0.101961) 15%,
//   rgba(239, 78, 123, 0.101961) 30%,
//   rgba(161, 102, 171, 0.101961) 44%,
//   rgba(80, 115, 184, 0.101961) 58%,
//   rgba(16, 152, 173, 0.101961) 72%,
//   rgba(7, 179, 155, 0.101961) 86%,
//   rgba(109, 186, 130, 0.101961) 100%
// )`;


export const sideBarStyle = `
    .main > .side-bar {
        position: relative;
        height: 100%;
        backdrop-filter: saturate(180%) blur(1em);
        background: ${background};
        border-right: 1px solid ${foreground};
    }

    .main > .side-bar .owner-name {
      font-size: 21px;
      font-weight: bold;
      text-align: center;
      color: ${foreground};
    }

    .main > .side-bar .owner-info-container {
      margin-bottom: 10px;
    }
    
    .main > .side-bar .copyright-container {
      font-size: 12px;
      color: ${foreground};
      text-align: center;
      position: absolute;
      bottom: 0px;
    }

    .main > .side-bar .copyright-container .copyright-container-content .copyright-container-content-linkable {
      color: ${linkableColor};
    }

    .main > .side-bar .copyright-container .copyright-container-content .copyright-container-content-linkable:hover {
      color: ${hover}
    }
`;