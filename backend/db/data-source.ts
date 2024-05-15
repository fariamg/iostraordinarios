import dataSourceProd, { dataSourceOptions as dataSourceOptionsProd } from "./data-source-prod";
import dataSourceLocal, { dataSourceOptions as dataSourceOptionsLocal } from "./data-source-local";

export const dataSourceOptions = process.env.NODE_ENV === "production"
    ? dataSourceOptionsProd
    : dataSourceOptionsLocal;

export default process.env.NODE_ENV === "production"
    ? dataSourceProd
    : dataSourceLocal;
