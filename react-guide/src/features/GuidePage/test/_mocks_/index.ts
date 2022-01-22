export * from './components/MockTourDesktopComponent';
export * from './types';

export const mockTourData = {
  abstract: `Die zweite Route befasst sich mit Werken, die von Künstlern geschaffen wurden, die homosexuell waren oder zumindest dieser Gruppe nahestanden.`,
  description: `Im 14. Jahrhundert verbreitete sich von Italien ausgehend in ganz Europa ein neues kulturelles Weltverständnis,
   das auf dem Wiederbeleben der klassischen Antike beruhte: der Humanismus. Eine neue Lesart antiker Literatur sowie ein erwachendes Interesse an klassischer Kunst, Philosophie und Wissenschaft rückten den Menschen in das Zentrum der Aufmerksamkeit. Die Welt wurde nun hinsichtlich menschlicher Werte betrachtet und der mittelalterliche Theozentrismus (Ausrichtung aller Lebensbereiche auf Gott als universalem Zentrum) verlor langsam an Bedeutung`,
  duration: '120 min',
  id: 2,
  image: 'https://smb-guide.xailabs.dev/images/5598450_2500x2500.jpg',
  location: 'Bode Museum',
  number: 2,
  objectsCount: 5,
  stations: [
    {
      description: '',
      directions: [
        {
          description: '4. Station: MÄNNLICHE KÜNSTLER UND HOMOSEXUALITÄT',
          facilities: [],
          name: 'Weiter zu Raum 261 (TIEPOLO-RAUM)',
          relatedStations: [],
        },
      ],
      id: '5',
      level: 'OG',
      map: '/data/map/bode_museum_OG.png',
      name: 'Raum 261 (Tiepolo-Raum)',
      objects: [
        {
          abstract: `Im 14. Jahrhundert verbreitete sich von Italien ausgehend in ganz Europa ein neues kulturelles Weltverständnis, das auf dem Wiederbeleben der klassischen Antike beruhte: der Humanismus. Eine neue Lesart antiker Literatur sowie ein erwachendes Interesse an klassischer Kunst, Philosophie und Wissenschaft rückten den Menschen in das Zentrum der Aufmerksamkeit. Die Welt wurde nun hinsichtlich menschlicher Werte betrachtet und der mittelalterliche Theozentrismus (Ausrichtung aller Lebensbereiche auf Gott als universalem Zentrum) verlor langsam an Bedeutung.`,
          description: `1620 wurde in Rom eine antike griechische Marmorskulptur gefunden, deren Ursprung vermutlich im 3. Jh. v. Chr. liegt. Trotz zahlreicher Schäden – so fehlten ihr etwa beide Beine und ein Arm – galt sie schon bald als eine der Glanzleistungen antiker Bildhauerkunst. Lange Zeit befand sie sich im Besitz einer berühmten römischen Familie, was sich im Titel der heute in der Münchener Glyptothek verwahrten Figur niederschlug: 
  Der Barberinische Faun. Wie ihre griechischen Vorläufer, die Satyrn, waren Faune ein wiederkehrendes Motiv in der Antike und hatten ihren Ursprung in einer Figur der griechischen Mythologie namens Pan. In der römischen Mythologie sah man sie traditionellerweise als betrunkene und verschrobene Gefährten von Bacchus, dem Gott des Weines.\r\n\r\nWie im byzantinischen Marmorrelieffragment Pan im Rankenwerk (11. Jh.) wurden Faune oft tanzend dargestellt, man zeigte sie aber auch gerne an den Folgen ihres exzessiven Lebens leidend. Letzteres ist der Fall beim Barberinischen Faun: Den rechten Arm unter dem Kopf und den linken an seiner Seite herabhängend, liegt er betrunken mit geschlossenen Augen da. Mit gespreizten Beinen präsentiert er zugleich seine völlige Nacktheit wie auch seinen gutgebauten Körper. Offenbar scheint er sich schamlos dem Moment hinzugeben. 1799 kam der Barberinische Faun vorübergehend in den Besitz des Sammlers und Künstlers Vincenzo Pacetti. Dieser nutzte die Gelegenheit, um die bereits zuvor mehrfach ergänzte Skulptur erneut zu überarbeiten – eventuell, um sie hinterher gewinnbringend zu verkaufen.
   Indem er das rechte Bein deutlich anhob, verstärkte er nochmals deren ohnehin schon deutlich erotische Pose.
   In diesem Zusammenhang entstand auch ein Terrakotta-Modell des Fauns, das sich heute im Bode-Museum befindet.`,
          dimensionsAndWeight: '',
          displayTitle: 'Der Barberinische Faun',
          geographicalReferences: '',
          id: 1363213,
          identNr: '',
          image: 'https://smb-guide.xailabs.dev/images/2505540_580x580.jpg',
          link: 1363213,
          materialAndTechnique: '',
          pictureCredits: '',
          relatedTours: [],
        },
      ],
      tour: {
        id: 2,
        title: 'Männliche Künstler und Homo­sexualität',
      },
    },
  ],
  subtitle: 'DER ZWEITE BLICK - Spielarten der Liebe.',
  title: 'Männliche Künstler und Homo­sexualität',
};

export const mockCollections = [
  {
    elementCount: 3,
    id: 3,
    image: 'https://smb-guide.xailabs.dev/images/2704809_580x580.jpg',
    onClick: () => undefined,
    subtitle:
      'Die dritte Route beschäftigt sich mit männlichen Sammlern, die bekanntermaßen homosexuell waren.',
    tintColor: 'rgba(0, 0, 0, 0.5)',
    title: 'Antike Kunst und Aufgeklärtes Sammeln',
  },
];
export const mockConfig = {
  GUIDE_DOMAIN: 'https://smb-guide.xailabs.dev',
};
