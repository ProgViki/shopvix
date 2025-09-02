
export const ProductType = {
  MIRO_SERVICE_MANAGEMENT: 'Miro SM',
  FORTREX: 'Fortrex',
  ZMART: 'Zmart',
  MIRO_OBSERVABILITY: 'Miro Observability',
  FIELD: 'Field',
} as const;

export type ProductTypeKeys = keyof typeof ProductType;
export type ProductTypeValues = (typeof ProductType)[ProductTypeKeys];
