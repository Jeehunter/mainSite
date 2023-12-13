const background = 'rgb(37,37,38)';
const foreground = '#e7e7e7';
const linkableColor = '#006AB1';
const hover = '#3794FF';
const rightBorder = '#111';


export const sideBarStyle = `
    .main > .side-bar {
        display: block;
        position: relative;
        height: 100%;
        backdrop-filter: saturate(180%) blur(1em);
        background: var(--sidebar-background);
        border-right: 1px solid ${rightBorder};
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