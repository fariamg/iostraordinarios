import DataSourceProd, { dataSourceOptions as dataSourceOptionsProd } from "./data-source-prod";
import DataSourceLocal, { dataSourceOptions as dataSourceOptionsLocal } from "./data-source-local";
import env from "config/env";

console.log(`Using ${env().node_env} configuration`);

export const dataSourceOptions = env().node_env === "production"
    ? dataSourceOptionsProd
    : dataSourceOptionsLocal;

export default env().node_env === "production"
    ? DataSourceProd
    : DataSourceLocal;
