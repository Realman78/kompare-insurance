export const round2Decimals = (num: number) => {
    return parseFloat((Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2));
  };
  