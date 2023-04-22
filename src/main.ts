import { IInstantiationService, ServiceIdentifier, SyncDescriptor, createDecorator } from './common/instantiation';
import { AuthService, IAuthService } from './server/authService';
import { LayoutService } from './server/layoutService';
import { MainUi } from './ui';

(function main() {
	const authService = AuthService.getInstance();
    const layoutService = LayoutService.getInstance();
    const mainUi = new MainUi(authService,layoutService);
    mainUi.render();
})();

