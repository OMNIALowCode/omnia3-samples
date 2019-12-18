import Mocks from './mocks.extensions';
import httpClient from './http-client';

export default class Context {
    constructor(tenant, environment, version, dataSource, username, token, userRoles, language, location, viewMode) {

        this.tenant = new TenantContext(tenant, environment, version);
        this.operation = new OperationContext(dataSource, language, location, viewMode);
        this.authentication = new AuthContext(username, token, userRoles);
    }

    createApiHttpClient() {
        const apiSettings = Mocks.Object();

        return new httpClient({
            url: apiSettings.endpoint,
            port: apiSettings.port,
            token: this.authentication.token,
            role: this.authentication.userRoles.length === 1 ? this.authentication.userRoles.first() : '',
            language: this.operation.language
        });
    }

    getLanguageTranslator() {
        return Mocks.Object();
    }

    redirectToApplicationAddress(address) {
        return Mocks.Function(address);
    }
}

class AuthContext {
    constructor(username, token, userRoles) {
        this.username = username;
        this.token = token;
        this.userRoles = userRoles;
    }

    userIsInRole(role) {
        if (!Array.isArray(this.userRoles))
            return false;

        return this.userRoles.filter(r => text.equalsIgnoringCase(r, role)).length > 0;
    }
}

class OperationContext {
    constructor(dataSource, language, location, viewMode) {
        this.dataSource = dataSource;
        this.language = language;
        this.location = location;
        this.decision = null;
        this.viewModel = viewMode;
    }

    setDecision(decision) {
        this.decision = decision;
    }
}

class TenantContext {
    constructor(code, environmentCode, version) {
        this.code = code;
        this.environmentCode = environmentCode;
        this.version = version;
    }
}

export const ViewModes = { CREATE: 'create', EDIT: 'edit', DETAILS: 'details', HISTORY: 'history' };
export const ContextMock = () => new Context("MyTenant", 'PRD', '1.0', null, 'user@omnia.com', 'token', [], 'ENUS');