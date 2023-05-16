
const foreground = '#e7e7e7';

export const indexStyle = `
    .main > .main-view > .index {
        position: relative;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .main > .main-view > .index > .welcome-wrapper {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background: rgba(0,0,0,0.1);
        backdrop-filter: blur(20px);
        border: 1px solid #333333;
        border-radius: 6px;
    }

    .main > .main-view > .index > .welcome-wrapper > .welcome-title {
        width: 100%;
        text-align: center;
        color: ${foreground};
        user-select: none;
    }
`;