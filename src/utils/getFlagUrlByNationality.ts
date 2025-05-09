const nationalityToCode: Record<string, string> = {
    British: 'gb',
    German: 'de',
    Spanish: 'es',
    French: 'fr',
    Italian: 'it',
    Dutch: 'nl',
    Australian: 'au',
    Canadian: 'ca',
    Finnish: 'fi',
    Japanese: 'jp',
    Brazilian: 'br',
    American: 'us',
    Mexican: 'mx',
    Chinese: 'cn',
    Russian: 'ru',
    Swiss: 'ch',
    Argentinian: 'ar'
    // добавим по мере необходимости
  };
  
  export const getFlagUrlByNationality = (nationality: string) => {
    const code = nationalityToCode[nationality];
    return code ? `https://flagcdn.com/w80/${code}.png` : null;
  };