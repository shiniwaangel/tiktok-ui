import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { useDebounce } from '~/hook';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon } from '~/components/Icons';
import AccountItem from '~/components/AccountItem';
import styles from './Search.module.scss';
import * as searchServices from '~/services/searchService';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      const res = await searchServices.search(debouncedValue);

      setSearchResult(res);
      setLoading(false);
    }

    fetchApi();
  }, [debouncedValue]);

  const handleInputChange = (e) => {
    const searchValue = e.target.value;

    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
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
    //Using a wrapper <div> or <span> tag around the reference element solves this 
    //by creating a new parentNode context. 
    <div>
      <HeadlessTippy
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
            onChange={e => handleInputChange(e)}
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
          <button className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
