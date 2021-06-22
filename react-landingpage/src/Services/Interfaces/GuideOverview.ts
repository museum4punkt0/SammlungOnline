

export interface guideOverview {
    id: number;               // Eindeutige ID, ist z.B. Bestandteil des Links
    title: string;            // Primärer Anzeigename
    number: number;           // Eindeutig durchnummeriert, beginnend bei 1, kann für die Anzeige, z.B. als "Tour <id>: <title>" verwendet werden
    subTitle: string;
    abstract: string;         // Einleitender Beschreibungstext. Kann ggf. lang sein, muss vielleicht in der Anzeige mit "text-overflow:ellipses" abgeschnitten werden
    previewImage: string;     // Link zu einem Bild. Der Link sollte im Service mit Hilfe eines ImageUrlBuilder auf die notwendige Größe beschränkt werden
    link: string;             // Link zur Detailseite der Tour, soll sich im selben Browser-Tab öffnen
    objectsCount: number;     // Anzahl der Objekte in der Tour
}
