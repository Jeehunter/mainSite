import { IInstantiationService, ServiceIdentifier, SyncDescriptor, createDecorator } from './common/instantiation';
import { AuthService, IAuthService } from './server/authService';
import { LayoutService } from './server/layoutService';
import { LanguageService } from './server/languageService';
import { MainUi } from './ui';

(function main() {
	const authService = AuthService.getInstance();
    const layoutService = LayoutService.getInstance();
    const languageService = LanguageService.getInstance();
    const mainUi = new MainUi(authService,layoutService,languageService);
    mainUi.render();
})();

