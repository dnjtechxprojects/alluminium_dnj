export interface WithId {
    id:number;
}

export type ResponseStatusType = 'Warning' | 'Success' | 'Error'
export interface ApiResponse {
    message:string;
    data?:any;
    statusType:ResponseStatusType
    [key:string]:any
}

export type SeachTypes = 'Filter' | 'Input' | ''

export interface StatCards {
    iconName: string;
    name: string;
    color: string;
    value: any;
}