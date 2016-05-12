/**
 * @author ngnmhieu
 * @since 12.05.16
 */

export class AppConfig {
    API_ENDPOINT: {
        AUTH: string;
    };
}

let serverUrl = "http://localhost:8080";

export const APP_CONFIG:AppConfig = {
    API_ENDPOINT: {
        AUTH: serverUrl + "/api/auth/request-token"
    }
};
