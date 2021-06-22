import { TranslationMessages } from 'ra-core';
import englishMessages from 'ra-language-english';

import germanMessages from './ra-language-german';
import smbGermanMessages from './smb-language-german';

const translateMessages: { [key: string]: TranslationMessages } = {
    en: englishMessages,
    de: { ...germanMessages, ...smbGermanMessages },
};

export default translateMessages;
