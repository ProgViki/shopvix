export const ProductType = {
  MIRO_SERVICE_MANAGEMENT: 'MIRO_SERVICE_MANAGEMENT',
  FOTREX: 'FOTREX',
  NSOC: 'NSOC',
  ZMART: 'ZMART',
  RENEW: 'RENEW',
  FIELD: 'FIELD',
  MIRO_OBSERVABILITY: 'MIRO_OBSERVABILITY',
} as const;

export type ProductTypeKeys = keyof typeof ProductType;
export type ProductTypeValues = (typeof ProductType)[ProductTypeKeys];
