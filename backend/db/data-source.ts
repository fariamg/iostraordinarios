import DataSourceProd from "./data-source-prod";
import DataSourceLocal from "./data-source-local";
import env from "config/env";

console.log(`Using ${env().node_env} configuration`);

export default env().node_env === "production"
    ? DataSourceProd
    : DataSourceLocal;
