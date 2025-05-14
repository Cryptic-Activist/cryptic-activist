'use client';

import {
  FaArrowRightArrowLeft,
  FaArrowUp,
  FaCircle,
  FaEllipsis,
} from 'react-icons/fa6';
import type {
  FilterSectionProps,
  OfferItemProps,
  OffersNewProps,
} from './types';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { getInitials, setLocalStorage, timeSince, toUpperCase } from '@/utils';
import { useApp, useNavigationBar, useOffers, useOutsideClick } from '@/hooks';

import { FaSpinner } from 'react-icons/fa';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import Info from '@/components/Info';
import Link from 'next/link';
import styles from './index.module.scss';
import useDebounce from '@/hooks/useDebounce';

export const OfferItem: FC<OfferItemProps> = ({ offer, app }) => {
  const isRatePositive = offer.pricingType === 'market' && offer.listAt > 0;

  return (
    <div className={styles.offerItem}>
      <div className={styles.traderInfo}>
        <div
          className={styles.traderAvatar}
          style={{
            backgroundColor: offer.vendor.profileColor,
          }}
        >
          {getInitials(
            offer?.vendor?.firstName ?? '',
            offer?.vendor?.lastName ?? ''
          )}
        </div>
        <div className={styles.traderDetails}>
          <Link href={`/vendor/${offer.vendor.id}`}>
            <div
              className={styles.traderName}
            >{`${offer.vendor.firstName} ${offer.vendor.lastName}`}</div>
            <div className={styles.traderUsername}>{offer.vendor.username}</div>
          </Link>
          <div className={styles.traderMetrics}>
            {/* <span className={styles.heartIcon}>
              <FaHeart size={10} /> {offer._count?.feedbacks}
            </span> */}
            <span>
              <FaArrowRightArrowLeft size={10} /> {offer._count?.trades}
            </span>
          </div>
          <div className={styles.traderStatus}>
            <FaCircle size={10} />
            <span>{timeSince(offer.vendor.lastLoginAt)}</span>
          </div>
        </div>
      </div>

      <div className={styles.labelTermsTags}>
        <div>{offer.label}</div>
        <div className={styles.terms}>{offer.terms}</div>
        <div className={styles.tags}>
          {offer.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.tradeSpeed}>
        {offer.averageTradeSpeed ? offer.averageTradeSpeed : 'No estimates yet'}
      </div>

      <div className={styles.rateContainer}>
        {offer.pricingType === 'fixed' && offer.listAt}
        {offer.pricingType === 'market' && (
          <span>
            {app.currentPrice &&
              app.currentPrice > 0 &&
              (
                parseFloat((offer.listAt / 100 + 1).toFixed(4)) *
                app.currentPrice
              ).toFixed(2)}
            {` ${offer.fiat.symbol}`}
          </span>
        )}
        {offer.pricingType === 'market' && (
          <div
            className={`${styles.rateDifference} ${
              isRatePositive ? styles.positive : ''
            }`}
          >
            <span>
              <FaArrowUp size={10} />
              <span>{offer.listAt}</span>
            </span>
            <Info
              message={`The asking price is ${offer.listAt}% above the market price`}
            />
          </div>
        )}
        <div
          className={styles.limits}
        >{`Limits: ${offer.limitMin} - ${offer.limitMax} ${offer.fiat.symbol}`}</div>
        <div className={styles.offerAction}>
          <Link href={`/offer/${offer.id}`} className={styles.buyBtn}>
            {app.type === 'buy' ? 'Buy' : 'Sell'}
          </Link>
        </div>
      </div>
      <div className={styles.offerActionMobile}>
        <Link href={`/offer/${offer.id}`} className={styles.buyBtn}>
          {app.type === 'buy' ? 'Buy' : 'Sell'}
        </Link>
      </div>
    </div>
  );
};

export const OffersHeader = () => (
  <div className={styles.offersHeader}>
    <div className={styles.headerVendor}>Vendor</div>
    <div className={styles.headerPaymentMethod}>Payment Method</div>
    <div className={styles.headerTradeSpeed}>Trade Speed</div>
    <div className={styles.offersHeaderLeft}>Rate</div>
  </div>
);

export const FilterSection: FC<FilterSectionProps> = ({
  app,
  offers,
  setValue,
  updateHeight,
  paymentMethods,
}) => {
  const { toggleModal } = useNavigationBar();

  const [isMoreFiltersOpen, _setIsMoreFiltersOpen] = useState(false);
  const [isPaymentMethodOpen, setisPaymentMethoOpen] = useState(false);
  const [paymentMethodIds, setPaymentMethodIds] = useState<string[]>([]);

  // const toggleMoreFilters = () => {
  //   setIsMoreFiltersOpen((prev) => !prev);
  // };

  const togglePaymentMethod = () => {
    setisPaymentMethoOpen((prev) => !prev);
  };

  const selectType = () => {
    const newSelection = app.type === 'buy' ? 'sell' : 'buy';
    setValue({ type: newSelection }, 'app/setType');
    setLocalStorage('APP_TYPE', newSelection);
  };

  const openCryptocurrenciesModal = () => {
    toggleModal('cryptocurrencies');
  };

  const openFiatModal = () => {
    toggleModal('fiats');
  };

  const handleAmount = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue({
      defaults: {
        amount: value,
      },
    });
  }, 1500);

  useEffect(() => {
    updateHeight(isMoreFiltersOpen);
  }, [isMoreFiltersOpen]);

  const appendPaymentMethod = (id: string) => {
    setPaymentMethodIds((prev) => {
      if (paymentMethodIds.indexOf(id) === -1) {
        return [...prev, id];
      } else {
        const filteredOut = prev.filter((pm) => pm !== id);
        return filteredOut;
      }
    });
  };

  // useEffect(() => {
  //   if (app.defaults?.fiat?.symbol) {
  //     addSearchParam({ fiat: app.defaults.fiat.symbol });
  //   }
  // }, [app.defaults?.fiat?.symbol]);

  // useEffect(() => {
  //   if (app.defaults?.cryptocurrency?.symbol) {
  //     addSearchParam({ cryptocurrency: app.defaults.cryptocurrency.symbol });
  //   }
  // }, [app.defaults?.cryptocurrency?.symbol]);

  useEffect(() => {
    offers.setPaymentMethodIds({ selectedPaymentMethodIds: paymentMethodIds });
  }, [paymentMethodIds]);

  const setAllPaymentMethods = () => {
    setPaymentMethodIds([]);
  };

  const ref = useOutsideClick(togglePaymentMethod);

  return (
    <div className={styles.filterSection}>
      <div className={styles.primaryFilters}>
        <div className={styles.toggleContainer}>
          <button
            className={`${styles.toggleBtn} ${
              app.type === 'buy' ? styles.active : ''
            }`}
            onClick={selectType}
          >
            Buy
          </button>
          <button
            className={`${styles.toggleBtn} ${
              app.type === 'sell' ? styles.active : ''
            }`}
            onClick={selectType}
          >
            Sell
          </button>
        </div>

        <button
          className={styles.cryptoSelector}
          onClick={openCryptocurrenciesModal}
        >
          {app.defaults?.cryptocurrency?.name ? (
            <>
              {app.defaults.cryptocurrency.image && (
                <Image
                  src={app.defaults?.cryptocurrency?.image ?? null}
                  alt={app.defaults?.cryptocurrency?.name}
                  width={30}
                  height={30}
                  className={styles.cryptoIcon}
                />
              )}
              <span>{app.defaults?.cryptocurrency?.name}</span>
            </>
          ) : (
            <span className={styles.noData}>No Data</span>
          )}
        </button>

        {app.currentPrice ? (
          <div className={styles.exchangeRate}>{`1 ${toUpperCase(
            app.defaults?.cryptocurrency?.symbol
          )} = ${app.currentPrice} ${toUpperCase(
            app.defaults?.fiat?.symbol
          )}`}</div>
        ) : (
          <div className={styles.exchangeRate}>
            Exchange rate is unavailable
          </div>
        )}
      </div>

      <div className={styles.secondaryFilters}>
        <div className={styles.amountInputContainer}>
          <input
            type="text"
            placeholder="Amount"
            className={styles.amountInput}
            onChange={handleAmount}
          />
          <button className={styles.currencySelector} onClick={openFiatModal}>
            {toUpperCase(app.defaults?.fiat?.symbol)}
          </button>
        </div>

        <div className={styles.paymentMethodFilter}>
          <button
            className={styles.paymentMethodBtn}
            onClick={togglePaymentMethod}
          >
            Payment Method <span>{isPaymentMethodOpen ? '▲' : '▼'}</span>
          </button>
          {isPaymentMethodOpen && (
            <div className={styles.paymentMethodDropdown} ref={ref}>
              <button
                className={`${styles.paymentOption}`}
                onClick={setAllPaymentMethods}
              >
                <div
                  className={`${styles.paymentOptionCheckbox} ${
                    paymentMethodIds.length === 0
                      ? styles.paymentOptionCheckboxChecked
                      : ''
                  }`}
                >
                  <div />
                </div>
                All Payment Methods
              </button>
              {paymentMethods.map((paymentMethod: any, index: number) => {
                const isChecked = paymentMethodIds.includes(paymentMethod.id);
                return (
                  <button
                    key={index}
                    className={`${styles.paymentOption}`}
                    onClick={() => appendPaymentMethod(paymentMethod.id)}
                  >
                    <div
                      className={`${styles.paymentOptionCheckbox} ${
                        isChecked ? styles.paymentOptionCheckboxChecked : ''
                      }`}
                    >
                      <div />
                    </div>
                    {paymentMethod.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* <button
          className={`${styles.advancedFiltersBtn} ${styles.expanded}`}
          onClick={toggleMoreFilters}
        >
          <span>More filters</span>
          <span>{isMoreFiltersOpen ? '▲' : '▼'}</span>
        </button> */}
      </div>

      {/* {isMoreFiltersOpen && (
        <>
          <div className={styles.advancedFiltersPanel}>
            <div className={styles.advancedFiltersGrid}>
              <div className={styles.filterGroup}>
                <div className={styles.filterGroupTitle}>Seller Reputation</div>
                <div className={styles.filterOption}>
                  <input type="checkbox" id="verified" />
                  <label htmlFor="verified">Verified sellers only</label>
                </div>
                <div className={styles.filterOption}>
                  <input type="checkbox" id="trusted" />
                  <label htmlFor="trusted">Trusted (20+ trades)</label>
                </div>
                <div className={styles.filterOption}>
                  <input type="checkbox" id="new-ok" />
                  <label htmlFor="new-ok">Include new sellers</label>
                </div>
                <div className={styles.filterOption}>
                  <input type="checkbox" id="online" />
                  <label htmlFor="online">Online in last hour</label>
                </div>
              </div>

              <div className={styles.filterGroup}>
                <div className={styles.filterGroupTitle}>Trade Features</div>
                <div className={styles.filterOption}>
                  <input type="checkbox" id="escrow" />
                  <label htmlFor="escrow">Escrow protection</label>
                </div>
                <div className={styles.filterOption}>
                  <input type="checkbox" id="instant" />
                  <label htmlFor="instant">Instant release</label>
                </div>
                <div className={styles.filterOption}>
                  <input type="checkbox" id="kyc-free" />
                  <label htmlFor="kyc-free">No KYC required</label>
                </div>
                <div className={styles.filterOption}>
                  <input type="checkbox" id="insurance" />
                  <label htmlFor="insurance">Trade insurance</label>
                </div>
              </div>

              <div className={styles.filterGroup}>
                <div className={styles.filterGroupTitle}>Payment Speed</div>
                <div className={styles.filterOption}>
                  <input type="radio" name="speed" id="any-speed" />
                  <label htmlFor="any-speed">Any speed</label>
                </div>
                <div className={styles.filterOption}>
                  <input type="radio" name="speed" id="fast" defaultChecked />
                  <label htmlFor="fast">{`Fast (< 30 min)`}</label>
                </div>
                <div className={styles.filterOption}>
                  <input type="radio" name="speed" id="instant-speed" />
                  <label htmlFor="instant-speed">{`Instant (< 5 min)`}</label>
                </div>
              </div>

              <div className={styles.filterGroup}>
                <div className={styles.filterGroupTitle}>Trade Limits</div>
                <div className={styles.filterRange}>
                  <input type="text" placeholder="Min" />
                  <span>to</span>
                  <input type="text" placeholder="Max" />
                  <span>{toUpperCase(app.defaults?.fiat?.symbol)}</span>
                </div>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <div className={styles.filterGroupTitle}>Price Range</div>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value="50"
                  className={styles.slider}
                  id="priceRange"
                />
                <div className={styles.sliderLabels}>
                  <span className={styles.sliderLabel}>Market - 5%</span>
                  <span className={styles.sliderLabel}>Market Rate</span>
                  <span className={styles.sliderLabel}>Market + 5%</span>
                </div>
              </div>
            </div>

            <div className={styles.filterActions}>
              <button className={styles.filterResetBtn}>Reset Filters</button>
              <button className={styles.filterApplyBtn}>Apply Filters</button>
            </div>
          </div>

          <div className={styles.activeFilters}>
            <div className={styles.filterTag}>
              Verified Only
              <button className={styles.removeFilter}>✕</button>
            </div>
            <div className={styles.filterTag}>
              BTC
              <button className={styles.removeFilter}>✕</button>
            </div>
            <div className={styles.filterTag}>
              Fast Trades Only
              <button className={styles.removeFilter}>✕</button>
            </div>
          </div>
        </>
      )} */}
    </div>
  );
};

const OffersNew: FC<OffersNewProps> = ({ id, height }) => {
  const { offers, loadMore, initialFetch } = useOffers();
  const { app, setValue } = useApp();

  const [_isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  const updateHeight = (_isMoreFiltersOpen: boolean) => {
    setIsMoreFiltersOpen(_isMoreFiltersOpen);
  };

  // const newHeight =
  //   id === 'home' && isMoreFiltersOpen ? { height: '5.45rem' } : { height };

  console.log({
    offersHasMore: offers.hasMore,
    offersHasError: !offers.hasError,
  });

  return (
    <div className={styles.tradingContainer}>
      <FilterSection
        app={app}
        setValue={setValue}
        updateHeight={updateHeight}
        paymentMethods={offers.paymentMethods}
        offers={offers}
      />

      <div className={styles.offersList}>
        <OffersHeader />
        {offers.data && (
          <InfiniteScroll
            className={styles.infiniteScrollList}
            dataLength={offers.data?.length}
            hasMore={offers.hasMore && !offers.hasError}
            next={loadMore}
            // style={{
            //   ...(newHeight && { ...newHeight }),
            // }}
            loader={
              <div
                className={styles.spinner}
                style={{
                  ...(height && { height: `calc(${height} - 10rem)` }),
                }}
              >
                <FaSpinner size={20} />
              </div>
            }
            endMessage={
              <div className={styles.endOfList}>
                <FaEllipsis size={20} />
              </div>
            }
            scrollableTarget={id}
            refreshFunction={initialFetch}
          >
            {offers.data?.map((offer, index) => (
              <OfferItem key={index} offer={offer} app={app} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default OffersNew;
