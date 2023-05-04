
const foreground = '#e7e7e7';
const hover = 'rgba(0,0,0,0.2)';

export const viewSelectorStyle = `
    .view-selector {
        width: 100%;
        list-style: none;
        padding: 0;
    }

    .view-selector > .view-item-container {
        width: 100%;
    }

    .view-selector > .view-item-container > .view-item-label {
        display: inline-block;
        text-decoration: none;
        color: ${foreground};
        margin: 0;
        padding: 0;
        width: 100%;
        text-align: center;
        padding: 8px 0;
        font-weight: 600;
        font-size: 16px;
    }

    .view-selector > .view-item-container > .view-item-label:hover {
        background: ${hover};
    }



    .view-selector > .view-item-container[isactive] > .view-item-label {
        background: ${hover};
    }


`;