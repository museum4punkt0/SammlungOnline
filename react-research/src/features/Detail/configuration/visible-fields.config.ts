import { EVisibility } from '../enums/visibility.enum';

export const ExhibitDescriptionFieldsVisibilityConfig = {
    grid: [
        {
            compilation: 'default',
            fields: [
                { key: 'involvedParties', visibility: EVisibility.VISIBLE },
                { key: 'dating', visibility: EVisibility.VISIBLE },
                { key: 'geographicalReferences', visibility: EVisibility.VISIBLE },
                { key: 'dimensionsAndWeight', visibility: EVisibility.VISIBLE },
                { key: 'materialAndTechnique', visibility: EVisibility.VISIBLE },
                { key: 'provenance', visibility: EVisibility.VISIBLE },
            ],
        },
    ],
    accordion: [
        {
            compilation: 'default',
            fields: [{ key: 'description', visibility: EVisibility.VISIBLE }],
        },
        {
            compilation: 'NGAlteNationalgalerie',
            fields: [
                { key: 'description', visibility: EVisibility.VISIBLE },
                { key: 'literature', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
                { key: 'signatures', visibility: EVisibility.VISIBLE_IF_AVAILABLE },
            ],
        },
    ],
};
