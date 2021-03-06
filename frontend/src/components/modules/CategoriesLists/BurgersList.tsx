import { FC } from 'react';
import Loader from '../../images/icons/Loader';
import Section from '../Section';
import HeaderTwo from '../../elements/Headings/HeaderTwo';
import { BurgerInterface } from '../../../_types/datas';
import CardItem from '../../elements/CardItem';
import useFetchingDatas from '../../../hooks/useFetchingDatas';
import { UseFetchingDatasUrl } from '../../../_types/fetchData';

const BurgersList: FC = () => {
  const {
    data: burgersList,
    loading,
    error,
  } = useFetchingDatas(
    `${process.env.REACT_APP_API_URL}/burgers` as unknown as UseFetchingDatasUrl
  );

  if (error)
    return (
      <Section className='items-center flex-1'>
        <p className='text-xl text-red-600 font-semibold'>
          Error ! We cannot find burgers. {error}
        </p>
      </Section>
    );

  if (loading)
    return (
      <Section className='items-center flex-1'>
        <Loader />
      </Section>
    );

  return burgersList && burgersList.length > 0 ? (
    <Section>
      <HeaderTwo>Burgers</HeaderTwo>
      <div className='grid grid-cols-1 xs:grid-cols-2 mt-8 gap-8 items-start md:grid-cols-3 xl:grid-cols-4'>
        {burgersList.map((burger) => (
          <CardItem key={burger.id} item={burger as BurgerInterface} />
        ))}
      </div>
    </Section>
  ) : null;
};
export default BurgersList;
