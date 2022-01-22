import { useParams } from 'react-router-dom';

interface IDetailPageParams {
  exhibitId: string;
}

export const useExhibitId = (): number => {
  const { exhibitId: exhibitIdNotParsed } = useParams<IDetailPageParams>();

  return Number(exhibitIdNotParsed) ;
};
