import dataSourceProd, { dataSourceOptions as dataSourceOptionsProd } from "./data-source-prod";
import dataSourceLocal, { dataSourceOptions as dataSourceOptionsLocal } from "./data-source-local";
import env from "config/env";

console.log(`Using ${env().node_env} configuration`);

export const dataSourceOptions = env().node_env === "production"
    ? dataSourceOptionsProd
    : dataSourceOptionsLocal;

export default env().node_env === "production"
    ? dataSourceProd
    : dataSourceLocal;
