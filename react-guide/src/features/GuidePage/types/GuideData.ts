export interface TourJsonData {
  guide: {
    id: 0;
    title: '';
    number: 0;
    subtitle: '';
    abstract: '';
    description: '';
    image: '';
    location: '';
    duration: 0;
    objectsCount: 0;
    stations: [];
  };
  stations: [];
  directions: [];
  objects: [];
  relatedTours: [];
}

// todo unify interfaces
export interface TourData {
  id: number; // ...wie in der Übersicht
  title: string; // ...wie in der Übersicht
  number: number; // ...wie in der Übersicht
  subtitle: string; // "Zusätzlicher" Titel
  abstract: string; // Einleitender Beschreibungstext, wie in der Übersicht
  description: string;
  image: string; // Bild, wie previewImage in der Übersicht, gewünschte Abmessungen im Service setzen
  location: string; // Standort/Institut
  duration: string; // Geschätze Dauer in Minuten
  objectsCount: number; // Anzahl der Objekte in der Route
  stations: StationData[]; // Die Stationen der Route, in korrekter Reihenfolge
}

export interface slimTourData {
  id: number;
  title: string;
}

// for exaample: room 111
export interface StationData {
  id: string; // Eindeutige id innerhalb dieser Tour, soll als Anker dienen um per URL hinscrollen zu können
  name: string;
  tour: slimTourData; // Notwendige Daten der Tour um den Self-Link bauen zu können,               // Primärer Anzeigename
  description: string; // Erklärender Text, vielleicht hilfreich für ARIA
  map: string; // Link zum Bild des Grundrisses
  level: string; // Etage, zur Anzeige beim Grundriss
  directions: Direction[]; // Die Wegbeschreibung, Elemente in korrekter Reihenfolge; das letzte Element in der Wegbeschreibung ist die Station selbst
  objects: TourObjectData[]; // Die Objekte in dieser Station, in korrekter Reihenfolge
}

export interface Direction {
  name: string; // Primärer Anzeigename
  description: string; // Erklärender Text, vielleicht hilfreich
  facilities: string[]; // Einfache Auflistung, soll koma-separiert angezeigt werden
  relatedStations: RelatedStation[]; // Stationen weiterer Touren, die den Weg kreuzen - mindestens mit "description" und "link"
}

export interface TourObjectData {
  id: 1; //
  displayTitle: string; //
  image: string; //
  pictureCredits: string; //
  geographicalReferences: string; //
  materialAndTechnique: string; //
  dimensionsAndWeight: string; //
  identNr: string; //
  abstract: string; //
  description: string; //
  link: string; //
  relatedTours: slimTourData[]; // Weitere Touren, die das Objeckt enthalten - mindestens mit "title" und "link"
}

export interface RelatedStation {
  tour: slimTourData;
  id: string;
  description: string;
}

export interface slimTourData {
  id: number;
  title: string;
}
