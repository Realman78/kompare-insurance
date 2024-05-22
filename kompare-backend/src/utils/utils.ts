export const round2Decimals = (num: number) => {
    return parseFloat((Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2));
  };
  
export const calculateBasePrice = (age: number, city: string) => {
   let ageFactor: number;
   if (age >= 18 && age <= 25) {
     ageFactor = 1.2;
   } else if (age >= 26 && age <= 35) {
     ageFactor = 1.0;
   } else if (age >= 36 && age <= 50) {
     ageFactor = 0.9;
   } else if (age >= 51 && age <= 65) {
     ageFactor = 1.1;
   } else {
     ageFactor = 1.3;
   }
 
   const firstLetter = city.charAt(0).toUpperCase();
   const asciiValue = firstLetter.charCodeAt(0);
   const cityFactor = asciiValue / 40;
 
   return cityFactor * ageFactor * 100;
}