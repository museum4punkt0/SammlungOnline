import LanguageService from './LanguageService';

const languageOptionsOrder = ['de', 'de-ls', 'de-dgs', 'en', 'en-sl', 'en-asl'];

const languageOptionsData = {
  de: {
    map: { en: 'en' },
    icon: 'language',
  },

  en: {
    map: { de: 'de' },
    icon: 'language',
  },

  'de-ls': {
    map: { en: 'en-SL' },
    icon: 'simple_language',
  },

  'de-dgs': {
    map: { en: 'en-ASL' },
    icon: 'sign_language',
  },

  'en-sl': {
    map: { de: 'de-LS' },
    icon: 'simple_language',
  },

  'en-asl': {
    map: { de: 'de-DGS' },
    icon: 'sign_language',
  },
};

const LANGUAGE_ICONS = {
  language: `<g
          id="Gruppe_318"
          data-name="Gruppe 318"
          transform="translate(-19.998 217)"
        >
          <path
            id="Icon_material-chat-bubble"
            data-name="Icon material-chat-bubble"
            d="M28.2,3H5.8A2.808,2.808,0,0,0,3,5.8V31l5.6-5.6H28.2A2.808,2.808,0,0,0,31,22.6V5.8A2.808,2.808,0,0,0,28.2,3Z"
            transform="translate(16.998 -220)"
            fill="currentColor"
          />
          <text
            id="DE"
            transform="translate(43.091 -201)"
            fill="#fff"
            fontSize="14"
            fontFamily="GTWalsheimPro-Black, GT Walsheim"
            letterSpacing="0.027em"
          >
            <tspan x="-16" y="0">
              ...
            </tspan>
          </text>
        </g>`,

  simple_language: `<path
          id="Icon_awesome-book-reader"
          data-name="Icon awesome-book-reader"
          d="M19.25,5.25A5.25,5.25,0,1,0,14,10.5,5.25,5.25,0,0,0,19.25,5.25Zm-6.475,7.935C9.53,11.2,4.274,10.653,1.63,10.5A1.513,1.513,0,0,0,0,11.984V24.168a1.5,1.5,0,0,0,1.449,1.479c2.388.125,7.218.584,10.557,2.266a.761.761,0,0,0,1.12-.649V13.812a.728.728,0,0,0-.351-.627ZM26.37,10.5c-2.644.15-7.9.7-11.144,2.682a.741.741,0,0,0-.351.636V27.262A.763.763,0,0,0,16,27.913c3.338-1.68,8.166-2.139,10.553-2.264A1.5,1.5,0,0,0,28,24.169V11.984A1.514,1.514,0,0,0,26.37,10.5Z"
          fill="currentColor"
        />`,

  sign_language: `<g
          id="dtloFO_00000018926322535516363510000012078273516230456243_"
          transform="translate(-12.375 -7.776)"
        >
          <g
            id="Gruppe_390"
            data-name="Gruppe 390"
            transform="translate(12.375 7.776)"
          >
            <path
              id="Pfad_150"
              data-name="Pfad 150"
              d="M22.037,23.545c.379-.467.758-.817,1.021-1.225a27.429,27.429,0,0,0,2.013-3.15,1.717,1.717,0,0,0-.613-1.954c-.642-.379-1.138.087-1.633.379l-.35.263c-2.129,1.808-4.288,3.588-6.388,5.454a10.546,10.546,0,0,0-3.179,4.054c-.817,2.129-.5,4.375-.321,6.533.233,2.625,2.654,4.4,5.629,4.433,5.221.029,10.413,0,15.633.029,1.021,0,1.633-.525,1.633-1.4s-.613-1.4-1.633-1.4c-2.363,0-4.7-.029-7.058,0-.642,0-.438-.379-.467-.7-.029-.35.058-.5.438-.5,3.5.029,7,0,10.5,0,1.021,0,1.633-.554,1.633-1.4,0-.875-.642-1.4-1.633-1.4-2.742,0-5.483-.029-8.225,0-.583,0-.438-.35-.438-.642-.029-.35,0-.554.467-.554,2.975.029,5.95,0,8.954,0a5.973,5.973,0,0,0,1.021-.029,1.41,1.41,0,0,0-.467-2.771c-3.558,0-7.117-.029-10.675,0-.467,0-.438-.233-.438-.554,0-.292-.146-.642.438-.642,2.771.029,5.513,0,8.283,0a1.385,1.385,0,0,0,1.575-1.4,1.421,1.421,0,0,0-1.575-1.429H22.037ZM16.7,18.762c-.087-.788-.117-1.488-.263-2.188a24.492,24.492,0,0,0-.7-2.888,1.755,1.755,0,0,0-1.925-1.079c-.788.2-.788.9-.875,1.517-.087.642-.087,1.283-.117,1.925-.117,2.6-.233,5.163-.35,7.758a13.7,13.7,0,0,0,.117,1.808,37.894,37.894,0,0,1,7.175-6.854c1.079-.875,2.275-1.663,3.267-2.625,1.925-1.9,3.763-3.908,5.6-5.863a1.386,1.386,0,0,0-.058-2.042,1.409,1.409,0,0,0-2.013.146c-2.188,2.275-4.375,4.608-6.563,6.913C18.916,16.429,17.837,17.537,16.7,18.762Zm7.992,3.675h3.063a.761.761,0,0,0,.5-.2c2.333-2.421,4.638-4.871,6.942-7.321a1.641,1.641,0,0,0,.408-.846,1.3,1.3,0,0,0-.817-1.429,1.339,1.339,0,0,0-1.6.321c-1.867,1.954-3.7,3.908-5.542,5.863-.292.321-.613.554-.992.2-.379-.379-.146-.7.146-.992,2.1-2.246,4.2-4.463,6.271-6.708A1.405,1.405,0,1,0,31.02,9.4l-2.567,2.742c-1.225,1.313-2.479,2.6-3.7,3.908a2.705,2.705,0,0,1,1.429,3.121A22,22,0,0,1,24.691,22.437Zm4.958,0h3.792a.223.223,0,0,0,.146-.058c.788-.817,1.575-1.633,2.3-2.479a1.39,1.39,0,0,0-2.013-1.867C32.449,19.462,31.107,20.92,29.649,22.437Z"
              transform="translate(-12.375 -7.847)"
              fill="#fff"
            />
            <path
              id="Pfad_151"
              data-name="Pfad 151"
              d="M22.151,45.813H36.385a1.423,1.423,0,1,1,0,2.829c-2.771,0-5.513.029-8.283,0-.554,0-.408.35-.438.642,0,.292-.058.554.438.554,3.558-.029,7.117,0,10.675,0a1.408,1.408,0,0,1,1.517,1.254,1.342,1.342,0,0,1-1.05,1.517,5.887,5.887,0,0,1-1.021.029H29.268c-.467,0-.5.2-.467.554.029.292-.146.642.438.642,2.742-.029,5.483,0,8.225,0,.992,0,1.633.554,1.633,1.4s-.642,1.4-1.633,1.4h-10.5c-.408,0-.5.146-.438.5.029.321-.175.7.467.7,2.363-.029,4.7-.029,7.058,0,1.021,0,1.633.554,1.633,1.4,0,.875-.613,1.4-1.633,1.4-5.221,0-10.413,0-15.633-.029-3-.058-5.425-1.838-5.658-4.463-.2-2.158-.5-4.4.321-6.533A10.767,10.767,0,0,1,16.26,45.55c2.1-1.838,4.258-3.646,6.388-5.454a3.644,3.644,0,0,1,.35-.263c.5-.292.992-.758,1.633-.379a1.717,1.717,0,0,1,.613,1.954,32.054,32.054,0,0,1-2.013,3.15C22.91,45,22.531,45.346,22.151,45.813Z"
              transform="translate(-12.49 -30.114)"
              fill="currentColor"
            />
            <path
              id="Pfad_152"
              data-name="Pfad 152"
              d="M17,18.691c1.138-1.2,2.217-2.333,3.3-3.442,2.188-2.333,4.375-4.667,6.592-6.971A1.409,1.409,0,0,1,28.9,8.133a1.386,1.386,0,0,1,.058,2.042c-1.867,1.983-3.675,3.967-5.6,5.863a40.192,40.192,0,0,1-3.267,2.625,37.894,37.894,0,0,0-7.175,6.854c-.058-.671-.117-1.254-.117-1.808.088-2.6.233-5.163.35-7.758.029-.642.029-1.283.117-1.925.087-.613.087-1.313.875-1.517a1.722,1.722,0,0,1,1.925,1.079,19.83,19.83,0,0,1,.7,2.888C16.883,17.175,16.913,17.875,17,18.691Z"
              transform="translate(-12.676 -7.776)"
              fill="currentColor"
            />
            <path
              id="Pfad_153"
              data-name="Pfad 153"
              d="M54.6,24.916a23.445,23.445,0,0,0,1.488-3.267,2.793,2.793,0,0,0-1.429-3.121c1.254-1.313,2.479-2.6,3.7-3.908l2.567-2.742A1.405,1.405,0,1,1,62.971,13.8c-2.071,2.246-4.171,4.463-6.3,6.679-.292.321-.525.642-.146.992s.7.117.992-.2c1.838-1.954,3.675-3.908,5.542-5.863a1.347,1.347,0,0,1,1.6-.321,1.3,1.3,0,0,1,.817,1.429,1.54,1.54,0,0,1-.408.846c-2.3,2.45-4.608,4.9-6.942,7.321a.761.761,0,0,1-.5.2C56.583,24.945,55.5,24.916,54.6,24.916Z"
              transform="translate(-42.284 -10.326)"
              fill="currentColor"
            />
            <path
              id="Pfad_154"
              data-name="Pfad 154"
              d="M71.6,46.322c1.458-1.517,2.829-2.975,4.229-4.4a1.307,1.307,0,0,1,1.779.058,1.332,1.332,0,0,1,.233,1.808c-.729.875-1.517,1.663-2.3,2.479a.223.223,0,0,1-.146.058Z"
              transform="translate(-54.326 -31.731)"
              fill="currentColor"
            />
          </g>
        </g>`,
};

export const getLanguageIndex = (locale: string) => {
  return languageOptionsOrder.indexOf(locale);
};

export const getLanguageMap = () => {
  return languageOptionsData;
};

export const getLanguageValue = (value: string) => {
  if (value.includes('-')) {
    const lang = value.split('-');
    lang.splice(1, 1, lang[1].toLocaleUpperCase());
    return lang.join('-');
  }
  return value;
};

export const getLanguageIcon = (locale: string) => {
  return languageOptionsData[locale].icon;
};

export const getLegalPagesMap = (
  currentLegalPages: any[],
  localeLegalPages: { slug: any }[],
) => {
  const legalPagesMap = {};
  currentLegalPages.forEach((page: any, index: number) => {
    legalPagesMap[page.slug] = '';

    if (localeLegalPages[index]) {
      legalPagesMap[page.slug] = localeLegalPages[index]?.slug;
    }
  });
  return legalPagesMap;
};

export const getLanguageRoute = (
  option: any,
  availableLanguages?: string[],
  main?: boolean,
) => {
  const strapiLanguage = LanguageService.getCurrentStrapiLanguage();
  if (main && strapiLanguage.includes(option.value)) return '';

  const regex = new RegExp(/^\/[\w-]+\/|^\//g);
  const path = [window.location.origin];
  let pathname = window.location.pathname;

  if (regex.test(pathname)) {
    pathname = main
      ? getPathname(pathname, option, availableLanguages, main)
      : getPathname(pathname, option);
    path.push(pathname);
  }
  return path.filter((item) => item).join('/');
};

export const getLanguageOptionIcon = (icon?: string) => {
  return icon && LANGUAGE_ICONS[icon];
};

const getLanguage = (
  localeOption: any,
  strapiLanguage: string,
  availableLanguages?: string[],
) => {
  if (!strapiLanguage.includes(localeOption.value)) {
    const lang =
      localeOption.map[strapiLanguage.toLocaleLowerCase()].map[
        localeOption.value
      ];
    return availableLanguages && availableLanguages.includes(lang)
      ? lang
      : localeOption.value;
  }
  return localeOption.value;
};

const getPathname = (
  pathname: string,
  localeOption: any,
  availableLanguages?: string[],
  main?: boolean,
) => {
  const strapiLanguage = LanguageService.getCurrentStrapiLanguage();
  const language = main
    ? getLanguage(localeOption, strapiLanguage, availableLanguages)
    : localeOption.value;

  const legalPagePathname = pathname.split('/');

  if (legalPagePathname.indexOf(strapiLanguage) !== -1) {
    if (main && language !== 'de') {
      legalPagePathname.splice(1, 1, language);
    } else {
      localeOption.value !== 'de'
        ? legalPagePathname.splice(1, 1, language)
        : legalPagePathname.splice(1, 1, '');
    }
    legalPagePathname.splice(
      2,
      1,
      localeOption.legalPages[legalPagePathname[2]],
    );
  } else {
    localeOption.value !== 'de' && legalPagePathname.splice(1, 0, language);
    legalPagePathname.splice(
      2,
      1,
      localeOption.legalPages[legalPagePathname[2]],
    );
  }

  return legalPagePathname.filter((item) => item).join('/');
};
