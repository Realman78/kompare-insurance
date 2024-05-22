export interface GetCoveragesRequestBody {
    name: string;
    birthdate: string;
    city: string;
    vehiclePower: number;
    voucher?: number;
    selectedCoverages: string[];
    selectedDiscounts: string[];
}