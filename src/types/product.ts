export const ProductType = {
  ENTERPRISE_SUITE: "ENTERPRISE_SUITE",
  BUSINESS_EDITION: "BUSINESS_EDITION",
  STARTER_PACK: "STARTER_PACK",
  CUSTOM_SOLUTION: "CUSTOM_SOLUTION",
} as const;

export type ProductTypeKeys = keyof typeof ProductType;
export type ProductTypeValues = (typeof ProductType)[ProductTypeKeys];
