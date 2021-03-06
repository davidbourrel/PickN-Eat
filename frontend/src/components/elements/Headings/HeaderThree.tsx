import { FC, useMemo } from 'react';
import { ClassNameComponentProps } from '../../../_types/components';

const HeaderThree: FC<ClassNameComponentProps> = ({ className, children }) => {
  const computedClassName = useMemo(
    () => `text-lg text-gray-800 font-semibold ${className ?? ''}`,
    [className]
  );

  return <h3 className={computedClassName}>{children}</h3>;
};

export default HeaderThree;
