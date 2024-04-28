import { DepartureDetails } from "./DepartureDetails";

export type Departures = {
    results:    Result[];
    pagination: Pagination;
    links:      Links;
}

export type Links = {
    previous: string;
    next:     string;
    current:  string;
}

export type Pagination = {
    limit:  number;
    offset: number;
    size:   number;
}

export type Result = {
    detailsReference:              string;
    serviceJourney:                ServiceJourney;
    stopPoint:                     StopPoint;
    plannedTime:                   string;
    estimatedTime:                 string;
    estimatedOtherwisePlannedTime: string;
    isCancelled:                   boolean;
    isPartCancelled:               boolean;
    occupancy:                     Occupancy;
    departureDetails:              DepartureDetails;
    showExpandedDetails:           boolean;
}

export type Occupancy = {
    level:  string;
    source: string;
}

export type ServiceJourney = {
    gid:       string;
    origin:    string;
    direction: string;
    line:      Line;
}

export type Line = {
    gid:                    string;
    name:                   string;
    shortName:              string;
    designation:            string;
    backgroundColor:        string;
    foregroundColor:        string;
    borderColor:            string;
    transportMode:          string;
    transportSubMode:       string;
    isWheelchairAccessible: boolean;
}

export type StopPoint = {
    gid:       string;
    name:      string;
    platform:  string;
    latitude:  number;
    longitude: number;
}
