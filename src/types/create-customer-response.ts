export type CreateCustomerResponse = {
  User: {
    AuthenticationToken: string;
  };
  Barcode: string;
  Result: 0 | 1 | 3 | 4 | 5 | 6 | 7;
};
