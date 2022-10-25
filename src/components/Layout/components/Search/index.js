import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import AccountItem from '~/components/AccountItem';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import styles from './Search.module.scss';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    if(!searchValue.trim()){
      setSearchResult([]);
      return;
    }

    setLoading(true);

    fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
      .then(res => res.json())
      .then(res => {
        setSearchResult(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
  }, [searchValue]);

  const handleInputChange = (val) => {
    setSearchValue(val);
  }

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  }

  const handleHideResult = () => {
    setShowResult(false);
  }

  return (
    <HeadlessTippy
      appendTo={document.body}
      visible={searchResult.length > 0 && showResult}
      interactive
      render={(attrs) => (
        <div className={cx('search-result')}>
          <PopperWrapper tabIndex="-1" {...attrs}>
            <h4 className={cx('search-title')}>Accounts</h4>
            {
              searchResult.map((result) => (
                <AccountItem key={result.id} data={result} />
              ))
            }
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className={cx('search')}>
        <input 
          ref={inputRef}
          value={searchValue} 
          placeholder="Search accounts and videos" 
          spellCheck={false} 
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setShowResult(true)}
        />
        {
          !!searchValue && !loading && (
            <button className={cx('clear')} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )
        }
        {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
        <button className={cx('search-btn')}>
          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
