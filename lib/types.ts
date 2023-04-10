export interface ChargingStation {
  ID?: number;
  AddressInfo?: {
    Title?: string;
    AddressLine1?: string;
    Town?: string;
    StateOrProvince?: string;
    Postcode?: string;
    CountryID?: number;
    Latitude?: number;
    Longitude?: number;
  };
  Connections?: {
    ID?: number;
    ConnectionTypeID?: number;
    LevelID?: number;
    Amps?: number;
    Voltage?: number;
    PowerKW?: number;
    CurrentTypeID?: number;
    Quantity?: number;
  }[];
  StatusType?: {
    IsOperational?: boolean;
  };
  UsageType?: {
    ID?: number;
    Title?: string;
  };
  OperatorInfo?: {
    ID?: number;
    Title?: string;
  };
  DateLastStatusUpdate?: string;
  DataQualityLevel?: number;
  DateCreated?: string;
  SubmissionStatus?: {
    IsLive?: boolean;
  };
}
