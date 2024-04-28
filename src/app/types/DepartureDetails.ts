export type DepartureDetails = {
    serviceJourneys: ServiceJourney[];
    occupancy:       Occupancy;
}

export type Occupancy = {
    level:  string;
    source: string;
}

export type ServiceJourney = {
    gid:                       string;
    direction:                 string;
    directionDetails:          DirectionDetails;
    line:                      Line;
    serviceJourneyCoordinates: ServiceJourneyCoordinate[];
    callsOnServiceJourney:     CallsOnServiceJourney[];
}

export type CallsOnServiceJourney = {
    stopPoint:                              StopPoint;
    plannedArrivalTime:                     string;
    plannedDepartureTime:                   string;
    estimatedArrivalTime:                   string;
    estimatedDepartureTime:                 string;
    estimatedOtherwisePlannedArrivalTime:   string;
    estimatedOtherwisePlannedDepartureTime: string;
    plannedPlatform:                        string;
    estimatedPlatform:                      string;
    latitude:                               number;
    longitude:                              number;
    index:                                  string;
    occupancy:                              Occupancy;
    isCancelled:                            boolean;
    isDepartureCancelled:                   boolean;
    isArrivalCancelled:                     boolean;
}

export type StopPoint = {
    gid:       string;
    name:      string;
    platform:  string;
    latitude:  number;
    longitude: number;
    stopArea:  StopArea;
}

export type StopArea = {
    gid:         string;
    name:        string;
    latitude:    number;
    longitude:   number;
    tariffZone1: TariffZone;
    tariffZone2: TariffZone;
}

export type TariffZone = {
    gid:       string;
    name:      string;
    number:    number;
    shortName: string;
}

export type DirectionDetails = {
    fullDirection:          string;
    shortDirection:         string;
    replaces:               string;
    via:                    string;
    isFreeService:          boolean;
    isPaidService:          boolean;
    isSwimmingService:      boolean;
    isDirectDestinationBus: boolean;
    isFrontEntry:           boolean;
    isExtraBus:             boolean;
    isExtraBoat:            boolean;
    isExtraTram:            boolean;
}

export type Line = {
    name:             string;
    backgroundColor:  string;
    foregroundColor:  string;
    borderColor:      string;
    transportMode:    string;
    transportSubMode: string;
}

export type ServiceJourneyCoordinate = {
    latitude:  number;
    longitude: number;
    elevation: number;
}