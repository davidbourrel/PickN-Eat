import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navigation/Navbar';
import ShopSvg from '../images/icons/ShopSvg';
import UserSvg from '../images/icons/UserSvg';
import BCLogo from '../images/BCLogo';
import BurgerToggleButton from '../elements/Buttons/BurgerToggleButton';
import useTotalCart from '../../contexts/cartContext/useCartTotal';

interface HeaderProps {
  handleToggleMenu: () => void;
  closeMenu: () => void;
  isOpen: boolean;
}

const Header: FC<HeaderProps> = ({ handleToggleMenu, isOpen, closeMenu }) => {
  const { cartTotalItems } = useTotalCart();

  const computedClassName = useMemo(
    () =>
      cartTotalItems === 0
        ? 'hidden'
        : 'select-none absolute bottom-5 left-7 bg-red-600 rounded-full w-7 h-7 text-white flex items-center justify-center',
    [cartTotalItems]
  );

  return (
    <header className='w-full shadow-md bg-gray-50'>
      <div className='tracking-wider font-bold xl:mx-auto xl:max-w-6xl'>
        <div className='flex items-center justify-between py-3 px-4 sm:px-8'>
          <BurgerToggleButton
            isOpen={isOpen}
            handleToggleMenu={handleToggleMenu}
          />
          <Navbar closeMenu={closeMenu} />
          <Link to='/' onClick={closeMenu}>
            <BCLogo />
          </Link>

          <div className='grid grid-cols-2 gap-5 items-center'>
            <Link to='/cart' className='relative'>
              <ShopSvg />
              <span className={computedClassName}>{cartTotalItems}</span>
            </Link>
            <Link to='/user'>
              <UserSvg />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
