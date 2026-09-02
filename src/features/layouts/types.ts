// LS & MK SETTING
export interface LottingSettingFormTypes {
    name: string;
    range: string;
    id?: number;
}

export interface LottingSettingItems {
    id: number;
    name: string;
    range: string[];
    table: string;
}

export type MakableTableTypes =
    | "Clarity"
    | "Shape"
    | "Diameter"
    | "Cent"
    | "Color"
    | "";

export type LsTableTypes = "Auto" | "Manual" | "";

// MACHINE MASTER
export interface MachineMasterSettingFormTypes {
    id?: number;
    name: string;
    employee_id: number;
    path: string;
}

export interface MachineMasterSettingItems {
    id: number;
    name: string;
    employee_id: number;
    employee: {
        name:string;
    };
    path: string;
}

// EMPLOYEE MASTER
export interface EmployeeMasterSettingFormTypes {
    id?: number;
    name: string;
    designation: string;
    mobile_no: number;
}

export interface EmployeeMasterSettingItems {
    id: number;
    name: string;
    designation: string;
    mobile_no: number;
}

// PARTY MASTER
export interface PartyMasterSettingFormTypes {
    id?: number;
    name: string;
    fields?:string[]
    mobile_no: number;
    address: string;
}

export interface PartyMasterSettingItems {
    id: number;
    name: string;
    fields:string[];
    mobile_no: number;
    status:string;
}

// EXPORT MASTER
export interface ImportMasterSettingFormTypes {
    id?: number;
    path: string;
}

export interface ImportMasterSettingItems {
    id: number;
    path: string;
}

// DESIGNATION MASTER
export interface DesignationMasterSettingFormTypes {
    id?: number;
    user: string;
    designation: string;
    role: string;
}

export interface DesignationMasterSettingItems {
    id: number;
    user: string;
    designation: string;
    role: string;
}

// USER
export interface UserSettingFormTypes {
    id?: number;
    username: string;
    password: string;
    designation?: string;
    role: string;
}

export interface UserSettingItems {
    id: number;
    username: string;
    password: string;
    designation: string;
    role: string;
}

// PRINT SETTING
export interface PrintSettingFormTypes {
    id?:number;
    text: string;
}

export interface PrintSettingItems {
    id: number;
    text:string;
    table:PrintTableTypes
}

export type PrintTableTypes =
    | "LS"
    | "MK"
    | "MK Manual"
    | "MK Total"
    | "Lot"


// TRA EMPLOYEE MASTER
export interface TraEmployeeMasterSettingFormTypes {
    id?: number;
    name: string;
    fields?:string[]
    mobile_no: number;
}

export interface TraEmployeeMasterSettingItems {
    id: number;
    name: string;
    fields:string[];
    mobile_no: number;
    status:string;
}

export type DataEntryTableTypes = "LS" | "MK" | "Lot";

export interface DataEntrySettingLSItems {
    file_name:string;
    kapan:string;
    r_weight:number;
    p_weight:number;
}
export interface DataEntrySettingMKItems {
    file_name:string;
    kapan:string;
    mk_weight:number;
    p_weight:number;
    color:string;
    shape:string;
    clarity:string;
    diameter:string;
}
export interface DataEntrySettingLotItems {
    mk_weight:number;
    piece:string;
    p_weight:number;
    clarity:string;
    kapan:string;
    lot_no:string;
    diameter:string;
    color:string;
}