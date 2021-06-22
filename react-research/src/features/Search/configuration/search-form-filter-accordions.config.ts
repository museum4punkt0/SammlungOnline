import { IConfigurableForEnvironment } from '../../../core/interfaces/configurable-for-environment.interface';
import { AppStage } from '../../../core/enums/app-stage.enum';

export interface ISearchOption {
    name: string;
    value: string;
}

export interface ISearchFilter<T = ISearchOption[]> {
    name: string;
    value: string;
    label?: string;
    optionsKey?: string;
    options?: T;
}

export interface ISearchFilterGroup<T = ISearchFilter[]> {
    name: string;
    filtersKey: string;
    label: string;
    filters: T;
}

const searchFormFilterAccordionsConfig: Array<ISearchFilterGroup & IConfigurableForEnvironment> = [
    {
        name: 'collections',
        filtersKey: 'collectionKey',
        label: 'searchForm.filters.collection',
        filters: [
            {
                name: 'Ägyptisches Museum und Papyrussammlung',
                value: 'AMP*',
                optionsKey: 'collectionKey',
                label: 'searchForm.filters.compilation',
                options: [
                    {
                        name: 'Ägyptisches Museum',
                        value: 'AMPAgyptischesMuseum',
                    },
                    {
                        name: 'Papyrussammlung',
                        value: 'AMPPapyrussammlung',
                    },
                ],
            },
            {
                name: 'Antikensammlung',
                value: 'ANT*',
            },
            {
                name: 'Ethnologisches Museum',
                value: 'EM*',
                optionsKey: 'collectionKey',
                label: 'searchForm.filters.compilation',
                options: [
                    {
                        name: 'Afrika',
                        value: 'EMAfrika1',
                    },
                    {
                        name: 'Allgemeiner Sammlungsbereich',
                        value: 'EMAllgemein',
                    },
                    {
                        name: 'Amerika',
                        value: 'EMAm*',
                    },
                    {
                        name: 'Archiv',
                        value: 'EMArchiv',
                    },
                    {
                        name: 'Medienarchiv',
                        value: 'EMMedienarchiv',
                    },
                    {
                        name: 'Musikethnologie',
                        value: 'EMMusikethnologie',
                    },
                    {
                        name: 'Nordafrika, West- und Zentralasien',
                        value: 'EMIslamischerOrient',
                    },
                    {
                        name: 'Ost- und Nordasien',
                        value: 'EMOstundNordasien',
                    },
                    {
                        name: 'Phonogramm-Archiv',
                        value: 'EMPhonogrammArchiv',
                    },
                    {
                        name: 'Süd- und Südostasien',
                        value: 'EMSudundSudostasien',
                    },
                    {
                        name: 'Südsee und Australien',
                        value: 'EMSudseeAustralien',
                    },
                ],
            },
            {
                name: 'Gemäldegalerie',
                value: 'GG*',
            },
            {
                name: 'Kunstbibliothek',
                value: 'KB*',
                optionsKey: 'collectionKey',
                label: 'searchForm.filters.compilation',
                options: [
                    {
                        name: 'Sammlung Architektur',
                        value: 'KBArchitekturzeichnung',
                    },
                    {
                        name: 'Sammlung Buchkunst und Neue Medien',
                        value: 'KBBuchkunstundNeueMedien',
                    },
                    {
                        name: 'Sammlung Fotografie',
                        value: 'KBMuseumfurFotografie',
                    },
                    {
                        name: 'Sammlung Grafikdesign',
                        value: 'KBPlakat',
                    },
                    {
                        name: 'Sammlung Modebild',
                        value: 'KBModekarikatur',
                    },
                    {
                        name: 'Ornamentstichsammlung',
                        value: 'KBOSKatalog',
                    },
                ],
            },
            {
                name: 'Kunstgewerbemuseum',
                value: 'KGM*',
            },
            {
                name: 'Kupferstichkabinett',
                value: 'KK*',
            },
            {
                name: 'Münzkabinett',
                value: 'MK*',
                optionsKey: 'collectionKey',
                label: 'searchForm.filters.compilation',
                options: [
                    {
                        name: 'Antike | Griechen, Archaik und Klassik (-650 bis -336)',
                        value: 'MKAntikeGriechenArchaikundKlassik650bis336',
                    },
                    {
                        name: 'Antike | Griechen, Hellenismus (-336 bis -30)',
                        value: 'MKAntikeGriechenHellenismus336bis30',
                    },
                    {
                        name: 'Antike | Griechen, Römische Kaiserzeit (-30 bis 283)',
                        value: 'MKAntikeGriechenRomischeKaiserzeit30bis283',
                    },
                    {
                        name: 'Antike | Römische Kaiserzeit (-30 bis 283)',
                        value: 'MKAntikeRomischeKaiserzeit30bis283',
                    },
                    {
                        name: 'Antike | Römische Republik (-280 bis -30)',
                        value: 'MKAntikeRomischeRepublik280bis30',
                    },
                    {
                        name: 'Antike | Römische Spätantike (284 bis 476)',
                        value: 'MKAntikeRomischeSpatantike284bis476',
                    },
                    {
                        name: 'Mittelalter | Frühmittelalter (476 bis 900)',
                        value: 'MKAntikeRomischeSpatantike476bis900',
                    },
                    {
                        name: 'Mittelalter | Hochmittelalter (900 bis 1250)',
                        value: 'MKMittelalterHochmittelalter900bis1250',
                    },
                    {
                        name: 'Mittelalter | Spätmittelalter (1251 bis 1500)',
                        value: 'MKMittelalterSpatmittelalter1251bis1500',
                    },
                    {
                        name: 'Neuzeit | 16. Jh. (1501 bis 1600)',
                        value: 'MKNeuzeit16Jh',
                    },
                    {
                        name: 'Neuzeit | 17. Jh. (1601 bis 1700)',
                        value: 'MKNeuzeit17Jh',
                    },
                    {
                        name: 'Neuzeit | 18. Jh. (1701 bis 1800)',
                        value: 'MKNeuzeit18Jh',
                    },
                    {
                        name: 'Neuzeit | 19. Jh. (1801 bis 1900)',
                        value: 'MKNeuzeit19Jh',
                    },
                    {
                        name: 'Neuzeit | Moderne seit 1900 (1900 bis heute)',
                        value: 'MKNeuzeitModerneseit19001900bisheute',
                    },
                    {
                        name: 'Neuzeit | Deutschland Gedenkmünzen 20.-21. Jh. (1901 bis heute)',
                        value: 'MKNeuzeitDeutschlandGedenkmunzen2021Jh1901bisheute',
                    },
                    {
                        name: 'Medaillen | Renaissance (1435 bis 1550)',
                        value: 'MKMedaillenRenaissance1435bis1550',
                    },
                    {
                        name: 'Medaillen | Brandenburg-Preußen (1500 bis 1918)',
                        value: 'MKMedaillenBrandenburgPreuszen1500bis1918',
                    },
                    {
                        name: 'Medaillen | Barock und Rokoko (1600 bis 1770)',
                        value: 'MKMedaillenBarockundRokoko1600bis1770',
                    },
                    {
                        name: 'Medaillen | Klassizismus (1770 bis 1830)',
                        value: 'MKMedaillenKlassizismus1770bis1830',
                    },
                    {
                        name: 'Medaillen | 19. Jh. nach 1830 (1830 bis 1900)',
                        value: 'MKMedaillen19Jhnach18301830bis1900',
                    },
                    {
                        name: 'Medaillen | 20. Jh. bis heute (1900 bis heute)',
                        value: 'MKMedaillen20Jhbisheute1900bisheute',
                    },
                    {
                        name: 'Papiergeld | Ausländische Geldscheine (1300 bis heute)',
                        value: 'MKPapiergeldAuslandischeGeldscheine1300bisheute',
                    },
                    {
                        name: 'Papiergeld | Altdeutsche Staaten (1700 bis 1871)',
                        value: 'MKPapiergeldAltdeutscheStaaten1700bis1871',
                    },
                    {
                        name: 'Papiergeld | Ausländisches Notgeld (1800 bis heute)',
                        value: 'MKPapiergeldAuslandischesNotgeld1800bisheute',
                    },
                    {
                        name: 'Papiergeld | Deutsches Reich (1871 bis 1948)',
                        value: 'MKPapiergeldDeutschesReich1871bis1948',
                    },
                    {
                        name: 'Papiergeld | Deutsches Notgeld (1914 bis 1924)',
                        value: 'MKPapiergeldDeutschesNotgeld1914bis1924',
                    },
                    {
                        name: 'Papiergeld | Deutsche Demokratische Republik (1948 bis 1990)',
                        value: 'MKPapiergeldDeutscheDemokratischeRepublik1948bis1990',
                    },
                    {
                        name: 'Papiergeld | Bundesrepublik Deutschland (1948 bis 2011)',
                        value: 'MKPapiergeldBundesrepublikDeutschland1948bisheute',
                    },
                ],
            },
            {
                name: 'Museum Europäischer Kulturen',
                value: 'MEK*',
            },
            {
                name: 'Museum für Asiatische Kunst',
                value: 'AKu*',
                optionsKey: 'collectionKey',
                label: 'searchForm.filters.compilation',
                options: [
                    {
                        name: 'Fotoarchiv',
                        value: 'AKuArchiv',
                    },
                    {
                        name: 'Süd-, Südost- und Zentralasien',
                        value: 'AKuSudSudostundZentralasien',
                    },
                    {
                        name: 'Ostasien',
                        value: 'AKuOstasiatischeKunst',
                    },
                ],
            },
            {
                name: 'Museum für Islamische Kunst',
                value: 'ISL*',
            },
            {
                name: 'Museum für Vor- und Frühgeschichte',
                value: 'MVF*',
                optionsKey: 'collectionKey',
                label: 'searchForm.filters.compilation',
                options: [
                    {
                        name: 'Europa',
                        value: 'MVFMusBEuropa',
                    },
                    {
                        name: 'Kaukasus und Vorderer Orient',
                        value: 'MVFMusBKaukasusundVordererOrient',
                    },
                    {
                        name: 'Berliner Bodenfunde',
                        value: 'MVFMusSBerlinerBodenfunde',
                    },
                    {
                        name: 'Prussia-Sammlung',
                        value: 'MVFMusSPrussia2',
                    },
                    {
                        name: 'Altbestand Märkisches Museum',
                        value: 'MVFMusSMarkischesMuseum',
                    },
                    {
                        name: 'Schliemann-Sammlung',
                        value: 'MVFMusSSchliemann',
                    },
                    {
                        name: 'Archiv',
                        value: 'MVFArvBArchivischeSammlungen',
                    },
                    {
                        name: 'Prussia-Ortsarchiv',
                        value: 'MVFArvBOrtsarchivPrussiaMuseum',
                    },
                ],
            },
            {
                name: 'Nationalgalerie',
                value: 'NG*',
                optionsKey: 'collectionKey',
                label: 'searchForm.filters.compilation',
                options: [
                    {
                        name: 'Alte Nationalgalerie',
                        value: 'NGAlteNationalgalerie',
                    },
                    {
                        name: 'Hamburger Bahnhof - Museum für Gegenwart',
                        value: 'NGHamburgerBahnhofMuseumfurGegenwart',
                    },
                    {
                        name: 'Museum Berggruen',
                        value: 'NGMuseumBerggruen',
                    },
                    {
                        name: 'Neue Nationalgalerie',
                        value: 'NGNeueNationalgalerie',
                    },
                    {
                        name: 'Sammlung Scharf-Gerstenberg',
                        value: 'NGSammlungScharfGerstenberg',
                    },
                ],
            },
            {
                name: 'Skulpturensammlung und Museum für Byzantinische Kunst',
                value: 'SKS* OR MSB*',
                optionsKey: 'collectionKey',
                label: 'searchForm.filters.compilation',
                options: [
                    {
                        name: 'Skulpturensammlung',
                        value: 'SKSSkulpturen',
                    },
                    {
                        name: 'Museum für Byzantinische Kunst',
                        value: 'MSBNichtdefiniert',
                    },
                ],
            },
            {
                name: 'Vorderasiatisches Museum',
                value: 'VAM*',
            },
            {
                name: 'Gipsformerei',
                value: 'GF*',
            },
            {
                name: 'Institut für Museumsforschung',
                value: 'IFM*',
            },
            {
                name: 'Rathgen Forschungslabor',
                value: 'RaO*',
            },
            {
                name: 'Zentralarchiv',
                value: 'ZA*',
                optionsKey: 'collectionKey',
                label: 'searchForm.filters.compilation',
                options: [
                    {
                        name: 'Fotosammlung',
                        value: 'ZAFotosammlung2',
                    },
                ],
            },
            {
                name: 'SIM | Musikinstrumenten-Museum',
                value: 'MIM*',
            },
        ],
        stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE, AppStage.PRODUCTION],
    },
    {
        name: 'locations',
        filtersKey: 'location',
        label: 'searchForm.filters.location',
        filters: [
            { name: 'Altes Museum', value: '"Altes Museum"' },
            { name: 'Bode-Museum', value: '"Bode-Museum"' },
            { name: 'Friedrichswerdersche Kirche', value: '"Friedrichswerdersche Kirche"' },
            { name: 'Gemäldegalerie', value: 'Gemäldegalerie' },
            {
                name: 'Hamburger Bahnhof - Museum für Gegenwart - Berlin',
                value: '"Hamburger Bahnhof"',
            },
            { name: 'James-Simon-Galerie', value: '"James-Simon-Galerie"' },
            { name: 'Kunstbibliothek', value: 'Kunstbibliothek' },
            { name: 'Kunstgewerbemuseum', value: 'Kunstgewerbemuseum' },
            { name: 'Kupferstichkabinett', value: 'Kupferstichkabinett' },
            { name: 'Museum Berggruen', value: 'Berggruen' },
            { name: 'Museum Europäischer Kulturen', value: '"Europäischer Kulturen"' },
            { name: 'Museum für Fotografie', value: '"Fotografie"' },
            { name: 'Neue Nationalgalerie', value: '"Neue Nationalgalerie"' },
            { name: 'Neues Museum', value: '"Neues Museum"' },
            { name: 'Pergamonmuseum', value: 'Pergamonmuseum' },
            { name: 'Pergamonmuseum. Das Panorama', value: '"Das Panorama"' },
            { name: 'Sammlung Scharf-Gerstenberg', value: '"Scharf-Gerstenberg"' },
            { name: 'Schloss Köpenick', value: '"Schloss Köpenick"' },
        ],
        stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE],
    },
];

export default searchFormFilterAccordionsConfig;
