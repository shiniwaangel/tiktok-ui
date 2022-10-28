import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Tippy from '@tippyjs/react/headless';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => { };

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  return (
    //Using a wrapper <div> or <span> tag around the reference element solves this 
    //by creating a new parentNode context. 
    <div>
      <Tippy
        hideOnClick={hideOnClick}
        delay={[0, 500]}
        interactive
        placement="bottom-end"
        offset={[12, 8]}
        render={(attrs) => (
          <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
              {history.length > 1 && (
                <Header
                  title="Language"
                  onBack={() => {
                    setHistory((prev) => prev.slice(0, prev.length - 1));
                  }}
                />
              )}
              <div className={cx('menu-body')}>
                {renderItems()}
              </div>
            </PopperWrapper>
          </div>
        )}
        onHide={() => setHistory((prev) => prev.slice(0, 1))}
      >
        {children}
      </Tippy>
    </div>
  );
}

export default Menu;
