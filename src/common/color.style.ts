 import { ITheme, LayoutService } from "../server/layoutService";

function isLightTheme() {
    const theme = LayoutService.getInstance();
    if (theme.theme === ITheme.Light) {
        return true;
    }
    return false;
}



export const sidebarBackground = isLightTheme() ? `linear-gradient(
    180deg,
    rgba(247, 149, 51, 0.101961) 0,
    rgba(243, 112, 85, 0.101961) 15%,
    rgba(239, 78, 123, 0.101961) 30%,
    rgba(161, 102, 171, 0.101961) 44%,
    rgba(80, 115, 184, 0.101961) 58%,
    rgba(16, 152, 173, 0.101961) 72%,
    rgba(7, 179, 155, 0.101961) 86%,
    rgba(109, 186, 130, 0.101961) 100%
  )` : 'rgb(37,37,38)';
export const background = 'rgb(37,37,38)';