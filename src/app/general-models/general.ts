export interface ErrorModel {
    hasError: boolean,
    Code: number;
    Message: string;
    MessageViewType: number;
    LogData:any;
    LogID:number;
}

export interface Workstation {
    PK_ObjectID:number;
    Caption: string;
}

export interface UserWorkgroup {
    PK_WorkgroupID: number;
    Workgroup: string;
}

export interface UserProject {
    PK_ProjectID: number;
    Project: string;
    isDefault: boolean;
}

export interface SystemInformation {
    Error: ErrorModel | null;
    Direction:string;
    Caption:string;
    Remark:string;
    Version:string;
    ReleaseDate:string;
    PoweredBy:string;
    Culture:string;
}

export interface AuthenticateParameters {
    userID:string;
    userPSW:string;
    workstationID:number;
    workgroupID:number;
    clientInformation:ClientInformation;
}

export interface ClientInformation {
    browser: string;
    browserVersion: string;
    device: string;
    deviceType: string;
    orientation: string;
    os: string;
    osVersion: string;
    ip: string;
    mac: string;
    agent: string;
    latitude: number;
    longitude: number;
}

export interface AuthenticateResponse {
    Error: ErrorModel;
    Token: string | null;
    UserName: string;
    Workstations: Workstation[];
    Workgroups: UserWorkgroup[] | null;
    DefaultWorkgroupID: number | UserWorkgroup;
    Projects: UserProject[];
}

export interface BarcodeTracker {
    barcode:string;
}

export interface BarcodeInformation {
    Caption:string;
    Value:string;
}

export interface BarcodeTrackerResponse {
    Error: ErrorModel;
    Barcode: BarcodeInformation[];
}

export interface QCPrint {
    barcode:string;
    number:number;
}