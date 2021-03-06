import { TypeDIContainerProvider } from './container-provider.class';

export * from './decorators/inject-connection.decorator';
export * from './decorators/inject-manager.decorator';
export * from './decorators/inject-repository.decorator';

import './container-registrations.const';

/**
 * We export the current container implementation what transforms function
 * calls between the TypeORM container format and TypeDI.
 */
export const Container = new TypeDIContainerProvider();
