const foreground = '#e7e7e7';
const linkableColor = '#3794FF';
const hover = '#006AB1';

export const iconLabelStyle = `
    .icon-label > .icon {
        display: inline-block;
        vertical-align: middle;
        margin: 0 9px;
    }

    .icon-label {
        position: relative;
        color: ${hover};
        white-space:nowrap;
    }

    .icon-label:hover {
        color: ${linkableColor};
    }

    .linkable {
        text-decoration: none;
    }

    .icon-label > .icon > .icon-content {
        width: 100%;
        height: 100%;
    }

    .icon-label > .hover {
        width: 100%;
        height: 100%;
    }

    .icon-label:hover > .hover > .hover-content {
        position: absolute;
        height: 200px;
        width: 200px;
        background-size: cover;
        margin-left: 20px;
    }
`;