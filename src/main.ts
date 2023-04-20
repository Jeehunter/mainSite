import { IInstantiationService, ServiceIdentifier, SyncDescriptor, createDecorator } from './common/instantiation';
import { AuthService, IAuthService } from './server/authService';
import { MainUi } from './ui';


(function main() {
	const authService = AuthService.getInstance();
    const mainUi = new MainUi(authService);
    mainUi.render();
})();

