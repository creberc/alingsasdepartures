export type TrafikStorning = {
    situationNumber:    string;
    creationTime:       Date;
    startTime:          Date;
    endTime:            Date;
    severity:           string;
    title:              string;
    description:        string;
    affectedStopPoints: AffectedStopPoint[];
    affectedLines:      Line[];
    affectedJourneys:   AffectedJourney[];
}

export type AffectedJourney = {
    gid:               string;
    departureDateTime: Date;
    line:              Line;
}

export type Line = {
    gid:                      string;
    name:                     string;
    technicalNumber:          number;
    designation:              string;
    defaultTransportModeCode: string;
    transportAuthorityCode:   string;
    transportAuthorityName:   string;
    textColor:                string;
    backgroundColor:          string;
    directions:               Direction[];
    municipalities:           Municipality[];
    affectedStopPointGids:    string[];
}

export type Direction = {
    gid:           string;
    directionCode: number;
    name:          string;
}

export type Municipality = {
    municipalityNumber: number;
    municipalityName:   string;
}

export type AffectedStopPoint = {
    gid:                string;
    name:               string;
    shortName:          string;
    stopAreaGid:        string;
    stopAreaName:       string;
    stopAreaShortName:  string;
    municipalityName:   string;
    municipalityNumber: number;
}
