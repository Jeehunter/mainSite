import { baseBlue, baseBorderRadius, middleFontSize } from '../common';

export const uiButtonStyle = `
    .ui-button {
        color: #fff;
        border-radius: ${baseBorderRadius};
        border: 1px solid ${baseBlue};
        background-color: ${baseBlue};
        cursor: pointer;
    }

    .small {
        width: 80px;
        height: 40px;
    }

    .middle {
        width: 83px;
        height: 47px;
        font-size: ${middleFontSize};
    }

    .large {
        width: 120px;
        height: 60px;
    }

    .ui-button:hover {
        background-color: ${baseBlue};
    }
`;