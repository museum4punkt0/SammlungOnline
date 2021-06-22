import { useTranslation } from 'react-i18next';

import { EVisibility } from '../enums/visibility.enum';

import { ExhibitDescriptionFieldsVisibilityConfig } from '../configuration/visible-fields.config';

import { IAccordionItem } from 'smb-react-components-library/dist/modules/Exhibit/components/ExhibitDescription/components/ExhibitDescriptionAccordion/ExhibitDescriptionAccordionList';
import { ExhibitModel } from 'smb-react-components-library';

export interface IUseVisibilityConfiguration {
    name: keyof typeof ExhibitDescriptionFieldsVisibilityConfig;
    exhibit: ExhibitModel | null;
    lineBreak: string;
}

export const useVisibilityConfiguration = ({
    name,
    exhibit,
    lineBreak = '\n',
}: IUseVisibilityConfiguration): IAccordionItem[] => {
    const { t } = useTranslation();
    const configurations = ExhibitDescriptionFieldsVisibilityConfig[name];

    let configuration = null;

    for (const _config of configurations) {
        if (exhibit?.collectionKey?.startsWith(_config.compilation)) {
            configuration = _config;
        } else if (!configuration && _config.compilation === 'default') {
            configuration = _config;
        }
    }

    if (!configuration || !exhibit) {
        return [];
    }

    const items: IAccordionItem[] = configuration?.fields
        ?.map((field) => {
            const noDataAvailableText = t('search.exhibit.attributes.noData');
            const content = exhibit[(field.key as unknown) as keyof ExhibitModel] as string | string[];
            let contentTransformed: string = Array.isArray(content) ? content.join('\n') : content ?? '';
            contentTransformed = contentTransformed
                .split('\n')
                .filter((value) => value.trim())
                .join(lineBreak);

            if (field.visibility === EVisibility.VISIBLE_IF_AVAILABLE && !contentTransformed?.trim()) {
                return { title: '', content: '' };
            } else {
                contentTransformed = contentTransformed || noDataAvailableText;
            }

            return {
                title: t(`search.exhibit.attributes.${field.key}`),
                content: contentTransformed,
            };
        })
        .filter((item) => item.title && item.content);

    return items ?? [];
};
