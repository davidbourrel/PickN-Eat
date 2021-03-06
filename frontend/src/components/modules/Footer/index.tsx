import { FC } from 'react';
import { Link } from 'react-router-dom';
import { COL_CLASSNAME, HEADER_CLASSNAME, ITEM_CLASSNAME } from './const';

const Footer: FC = () => {
  return (
    <footer className='w-full mt-4 pb-4 shadow-sm bg-gray-800 text-white'>
      <div className='flex flex-col flex-wrap xs:flex-row xs:justify-center xs:text-center xl:mx-auto xl:max-w-6xl'>
        <div className={COL_CLASSNAME}>
          <h3 className={HEADER_CLASSNAME}>About Us</h3>
          <ul>
            <li className={ITEM_CLASSNAME}>
              <Link to='/'>Leadership Team</Link>
            </li>
            <li className={ITEM_CLASSNAME}>
              <Link to='/'>Values In Action</Link>
            </li>
            <li className={ITEM_CLASSNAME}>
              <Link to='/'>Franchise Info</Link>
            </li>
          </ul>
        </div>
        <div className={COL_CLASSNAME}>
          <h3 className={HEADER_CLASSNAME}>Careers</h3>
          <ul>
            <li className={ITEM_CLASSNAME}>
              <Link to='/'>Employee Perks</Link>
            </li>
            <li className={ITEM_CLASSNAME}>
              <Link to='/'>Working with Us</Link>
            </li>
            <li className={ITEM_CLASSNAME}>
              <Link to='/'>Apply Now</Link>
            </li>
          </ul>
        </div>
        <div className={COL_CLASSNAME}>
          <h3 className={HEADER_CLASSNAME}>Contact Us</h3>
          <ul>
            <li className={ITEM_CLASSNAME}>
              <Link to='/'>Restaurant Feedback</Link>
            </li>
            <li className={ITEM_CLASSNAME}>
              <Link to='/'>Frequently Asked Questions</Link>
            </li>
            <li className={ITEM_CLASSNAME}>
              <Link to='/'>Send an email</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
