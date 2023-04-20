import { IConfigurableForEnvironment } from '../../types/index';
import { AppStage } from '../../enums/index';

export interface ISearchOption {
  name: string;
  value: string;
}

export interface ISearchFilter<T = ISearchOption[]> {
  name: string;
  level?: string;
  value?: string;
  label?: string;
  optionsKey?: string;
  options?: T;
}

export interface ISearchFilterGroup<T = ISearchFilter[]> {
  name: string;
  filtersKey: string;
  label: string;
  sublevel?: Array<{
    title?: string;
    text?: string;
  }>;
  filters: T;
}

export const searchFormFilterAccordionsConfig: Array<ISearchFilterGroup &
  IConfigurableForEnvironment> = [
  {
    name: 'collections',
    filtersKey: 'collectionKey',
    label: 'searchForm.filters.collection',
    sublevel: [
      {
        title: 'Sammlungen der Staatlichen Museen zu Berlin',
        text: '',
      },
      {
        title: 'Institute der Staatlichen Museen zu Berlin',
        text: '',
      },
      {
        title: 'Sammlung des Staatlichen Instituts für Musikforschung',
        text: '',
      },
    ],
    filters: [
      {
        name: 'Ägyptisches Museum und Papyrussammlung',
        level: '0',
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
        level: '0',
        value: 'ANT*',
      },
      {
        name: 'Ethnologisches Museum',
        level: '0',
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
            name: 'Ozeanien',
            value: 'EMSudseeAustralien',
          },
          {
            name: 'Phonogramm-Archiv',
            value: 'EMPhonogrammArchiv',
          },
          {
            name: 'Süd- und Südostasien',
            value: 'EMSudundSudostasien',
          },
        ],
      },
      {
        name: 'Gemäldegalerie',
        level: '0',
        value: 'GG*',
      },
      {
        name: 'Kunstbibliothek',
        level: '0',
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
        level: '0',
        value: 'KGM*',
      },
      {
        name: 'Kupferstichkabinett',
        level: '0',
        value: 'KK*',
      },
      {
        name: 'Münzkabinett',
        level: '0',
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
            value: 'MKMittelalterFruhmittelalter476bis900',
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
        level: '0',
        value: 'MEK*',
      },
      {
        name: 'Museum für Asiatische Kunst',
        level: '0',
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
        level: '0',
        value: 'ISL*',
      },
      {
        name: 'Museum für Vor- und Frühgeschichte',
        level: '0',
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
        level: '0',
        value: 'NG*',
        optionsKey: 'collectionKey',
        label: 'searchForm.filters.compilation',
        options: [
          {
            name: 'Alte Nationalgalerie',
            value: 'NGAlteNationalgalerie',
          },
          {
            name: 'Hamburger Bahnhof - Nationalgalerie der Gegenwart',
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
        level: '0',
        value: 'SBM* OR SKS* OR MSB*',
        optionsKey: 'collectionKey',
        label: 'searchForm.filters.compilation',
        options: [
          {
            name: 'Skulpturensammlung',
            value: 'SKSSkulpturen OR SBM*',
          },
          {
            name: 'Museum für Byzantinische Kunst',
            value: 'MSBNichtdefiniert',
          },
        ],
      },
      {
        name: 'Vorderasiatisches Museum',
        level: '0',
        value: 'VAM*',
      },
      {
        name: 'Gipsformerei',
        level: '1',
        // value: 'GF*',
        value: '',
      },
      {
        name: 'Institut für Museumsforschung',
        level: '1',
        value: 'IFM*',
      },
      {
        name: 'Rathgen Forschungslabor',
        level: '1',
        // value: 'RaO*',
        value: '',
      },
      {
        name: 'Zentralarchiv',
        level: '1',
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
        level: '2',
        value: 'MIM*',
      },
    ],
    stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE, AppStage.PRODUCTION],
  },
  {
    name: 'locations',
    filtersKey: 'location',
    label: 'searchForm.filters.location',
    sublevel: [
      {
        title: '',
        text:
          'Filtern Sie Objekte mit einem hinterlegten Ausstellungsstatus nach ihrem aktuellen Standort. Die Daten werden sukzessiv erweitert.',
      },
    ],
    filters: [
      {
        name: 'Alte Nationalgalerie',
        value: '"Alte Nationalgalerie"',
        level: '0',
      },
      { name: 'Altes Museum', value: '"Altes Museum"', level: '0' },
      { name: 'Bode-Museum', value: '"Bode-Museum"', level: '0' },
      {
        name: 'Friedrichswerdersche Kirche',
        value: '"Friedrichswerdersche Kirche"',
        level: '0',
      },
      { name: 'Gemäldegalerie', value: 'Gemäldegalerie', level: '0' },
      {
        name: 'Hamburger Bahnhof - Nationalgalerie der Gegenwart',
        // value: '"Hamburger Bahnhof"',
        level: '0',
      },
      {
        name: 'Humboldt Forum',
        // value: '"Humboldt Forum"',
        level: '0',
      },
      {
        name: 'James-Simon-Galerie',
        // value: '"James-Simon-Galerie"'
        level: '0',
      },
      {
        name: 'Kunstbibliothek',
        // value: 'Kunstbibliothek'
        level: '0',
      },
      { name: 'Kunstgewerbemuseum', value: 'Kunstgewerbemuseum', level: '0' },
      {
        name: 'Kupferstichkabinett',
        // value: 'Kupferstichkabinett'
        level: '0',
      },
      {
        name: 'Museum Berggruen',
        // value: 'Berggruen'
        level: '0',
      },
      {
        name: 'Museum Europäischer Kulturen',
        value: '"Europäischer Kulturen"',
        level: '0',
      },
      {
        name: 'Museum für Fotografie',
        // value: 'Fotografie'
        level: '0',
      },
      { name: 'Neue Nationalgalerie', value: '"Neue Nationalgalerie"', level: '0' },
      {
        name: 'Neues Museum',
        value: '"Neues Museum"',
        level: '0',
      },
      {
        name: 'SIM | Musikinstrumenten-Museum',
        value: '"Musikinstrumenten-Museum"',
        level: '0',
      },
      { name: 'Pergamonmuseum', value: 'Pergamonmuseum', level: '0' },
      {
        name: 'Pergamonmuseum. Das Panorama',
        // value: '"Das Panorama"'
        level: '0',
      },
      {
        name: 'Sammlung Scharf-Gerstenberg',
        // value: '"Scharf-Gerstenberg"'
        level: '0',
      },
      {
        name: 'Schloss Köpenick',
        // value: '"Schloss Köpenick"'
        level: '0',
      },
    ],
    stages: [AppStage.LOCAL, AppStage.DEV, AppStage.STAGE, AppStage.PRODUCTION],
  },
];
