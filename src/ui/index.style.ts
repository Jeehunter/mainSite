import { sidebarBackground } from "../common/color.style";

export const indexStyle = `
    html,body {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    .main {
        display: flex;
        flex-wrap: nowrap;
        height: 100%;
    }

    .main {
        --sidebar-background: ${sidebarBackground};
    }
`;