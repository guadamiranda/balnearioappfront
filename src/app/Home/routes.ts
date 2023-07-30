export interface ITenantList {
    [tenantName: string]: boolean;
  }

const routesAdmin: ITenantList = {
    Reserves: false,
    ABMPrice: false,
    ABMDiscounts: false,
    ABMRol: true,
    ABMEmployee: true,
}

export const isRouteAdmin = (route:string): boolean => {
    return routesAdmin[route]
}