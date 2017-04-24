import {ConnectionManager} from "typeorm";
import {Container} from "typedi";
import {Handler} from "typedi/types/Handler";

/**
 * Allows to inject an Connection using typedi's Container.
 */
export function OrmConnection(connectionName: string = "default"): Function {
    return function(target: Object|Function, propertyName: string, index?: number) {

        const getValue = () => {
            const connectionManager = Container.get(ConnectionManager);
            if (!connectionManager.has(connectionName))
                throw new Error(`Cannot get connection "${connectionName}" from the connection manager. ` +
                `Make sure you have created such connection. Also make sure you have called useContainer(Container) ` +
                `in your application before you established a connection and importing any entity.`);

            return connectionManager.get(connectionName);
        };

        let handler = <Handler> {
            object: target,
            value: getValue
        };

        if (index !== undefined) {
            handler.index = index;
        }

        if (propertyName !== undefined) {
            handler.propertyName = propertyName;
        }

        Container.registerHandler(handler);

    };
}
