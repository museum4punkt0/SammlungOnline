/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from '@testing-library/react'; // (or /dom, /vue, ...)
import { renderHook, act } from '@testing-library/react-hooks';
import { useGridConfiguration } from './use-visibility-configuration.hook';
import { ExhibitDescriptionFieldsVisibilityConfig } from '../utils/configuration/visible-fields.config';
import { EVisibility } from '../enums/visibility.enum';

import '../../../i18n.ts';

const arraysEqual = (a: any[], b: any[]) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

const realExhibit = {
  '@id': '869230',
  '@initialImport': '2021-03-17T11:19:17.509206+00:00',
  '@lastSynced': '2021-03-17T12:38:55.640734+00:00',
  attachments: true,
  collection: 'Skulpturensammlung und Museum für Byzantinische Kunst',
  collectionKey: 'SKSSkulpturen',
  compilation: 'Skulpturensammlung',
  dateRange: { gte: -11202714000, lte: -11139555600 },
  dating: ['MIDAS-Datierung 1615/1616'],
  dimensionsAndWeight: ['Höhe: 98,00 cm', 'Breite: 22,00 cm', 'Tiefe: 24,00 cm'],
  exhibit: false,
  highlight: false,
  id: 869230,
  identNumber: '2/63',
  involvedParties: ['Ludwig Münstermann (um 1570/1580), Bildhauer'],
  literature: [
    'Kessler, Hans-Ulrich & Knuth, Michael & Köllermann, Antje-Fee & Krahn, Volker & Krohm, Hartmut & Raschkewitz, Petra & Stöppler, Lutz & Thomas, Cynthia & Wenderholm, Iris: Skulpturensammlung im Bode-Museum, 2006, S. 68f, Abb. S. 68, Kat.-Nr. 77',
  ],
  longDescription:
    'Zu Recht gilt Ludwig Münstermann als einer der originellsten Bildschnitzer des 17. Jahrhunderts in Norddeutschland – sein hagerer, ganz unantik auftretender Gott Apoll scheint dieses Diktum zu bestätigen: Die Figur war ursprünglich mit einer farbigen Fassung versehen, die – wie bei vielen anderen Werken – im 19. Jahrhundert entfernt wurde. Der Eindruck der Skulpturen hat sich dadurch stark verändert. In der linken hielt der Gott der Musik sein Instrument, wahrscheinlich eine Lyra. Gemeinsam mit einem Gegenstück, einer Figur des König David, bekrönte die Skulptur einst einen Orgelprospekt in der Stadtkirche von Varel bei Oldenburg. Der heidnische Gott der Musen und Musik stand hier mit dem Harfe spielenden Propheten des Alten Testaments in einer sinnfälligen Korrelation.',
  materialAndTechnique: ['Eichenholz'],
  technicalTerm: 'Figur',
  titles: ['Apollo'],
};

/** What cases do we need to Cover ??
 * The Result should be the way the config defines it.
 * TODO: Test that ONLY data from cfg is returned
 * TODO: Test optional data vs required data
 *        -> reuqired is on object and in config with visibility
 * TODO: Test Linebreaks are handled correctly,
 * TODO: TEST invalid Data is handled
 *
 * TODO: NG startswith
 *
 */

const defaultConfig = {
  grid: [
    {
      compilation: 'default',
      fields: [
        { key: 'involvedParties', visibility: 'VISIBLE' },
        { key: 'dating', visibility: 'VISIBLE' },
        { key: 'geographicalReferences', visibility: 'VISIBLE' },
        { key: 'dimensionsAndWeight', visibility: 'VISIBLE' },
        { key: 'materialAndTechnique', visibility: 'VISIBLE' },
        { key: 'acquisition', visibility: 'VISIBLE' },
      ],
    },
  ],
  accordion: [
    {
      compilation: 'default',
      fields: [
        { key: 'description', visibility: 'VISIBLE' },
        { key: 'provenanceEvaluation', visibility: 'VISIBLE' },
        { key: 'provenance', visibility: 'VISIBLE' },
      ],
    },
    {
      compilation: 'NG',
      fields: [
        { key: 'description', visibility: 'VISIBLE' },
        { key: 'literature', visibility: 'VISIBLE_IF_AVAILABLE' },
        { key: 'provenanceEvaluation', visibility: 'VISIBLE' },
        { key: 'provenance', visibility: 'VISIBLE' },
        { key: 'signatures', visibility: 'VISIBLE_IF_AVAILABLE' },
        { key: 'exhibitions', visibility: 'VISIBLE_IF_AVAILABLE' },
      ],
    },
  ],
};

const brokenConfig = {
  grid: [
    {
      compilation: 'defsdfsdault',
      fields: [
        { key: 'involvedParties', visibility: 'VISIBLE' },

        { key: 'acquisition', visibility: 'VISIBLE' },
      ],
    },
  ],
  accordion: [
    {
      compilation: 'defaultdsfd',
      fields: [
        { key: 'description', visibility: 'VISIBLE' },
        { key: 'provenanceEvaluation', visibility: 'VISIBLE' },
        { key: 'provenance', visibility: 'VISIBLE' },
      ],
    },
    {
      compilation: 'NG',
      fields: [
        { key: 'description', visibility: 'VISIBLE' },
        { key: 'literature', visibility: 'VISIBLE_IF_AVAILABLE' },
        { key: 'provenanceEvaluation', visibility: 'VISIBLE' },
        { key: 'provenance', visibility: 'VISIBLE' },
        { key: 'signatures', visibility: 'VISIBLE_IF_AVAILABLE' },
        { key: 'exhibitions', visibility: 'VISIBLE_IF_AVAILABLE' },
      ],
    },
  ],
};
jest.mock('../configuration/visible-fields.config.ts', () => ({
  get ExhibitDescriptionFieldsVisibilityConfig() {
    return brokenConfig;
  },
}));

describe('Grid visibility config hook tests', () => {
  test('can parse a grid list and create output from Exhibition model', () => {
    const { result } = renderHook(() => useGridConfiguration({ exhibit: realExhibit }));
    const configData = ExhibitDescriptionFieldsVisibilityConfig['grid'];
    const configFields = configData[0].fields.map(field => field.key);
    const outputFields = result?.all[0].map(field =>
      field.title.replace('search.exhibit.attributes.', ''),
    );
    expect(outputFields.sort()).toEqual(configFields.sort());
  });
});
