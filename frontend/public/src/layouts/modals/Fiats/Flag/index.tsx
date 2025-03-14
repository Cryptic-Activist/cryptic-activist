import {
  Australia,
  Brazil,
  Canada,
  China,
  Coinbase,
  Czechia,
  Denmark,
  England,
  Europe,
  HongKong,
  India,
  Indonesia,
  Israel,
  Japan,
  Malaysia,
  Mexico,
  NewZealand,
  Norway,
  Philippines,
  Poland,
  SaudiArabia,
  Singapore,
  SolanaLogo,
  SouthAfrica,
  SouthKorea,
  Sweden,
  Switzerland,
  Thailand,
  Turkey,
  Ukraine,
  UnitedArabEmirates,
  UnitedStates,
} from '@/assets';
import React, { FC } from 'react';

import { FlagProps } from './types';
import Image from 'next/image';

const Flag: FC<FlagProps> = ({ country }) => {
  const getFlagIcon = () => {
    switch (country) {
      case 'united states': {
        return UnitedStates.src;
      }
      case 'european union': {
        return Europe.src;
      }
      case 'japan': {
        return Japan.src;
      }
      case 'united kingdom': {
        return England.src;
      }
      case 'china': {
        return China.src;
      }
      case 'switzerland': {
        return Switzerland.src;
      }
      case 'canada': {
        return Canada.src;
      }
      case 'australia': {
        return Australia.src;
      }
      case 'hong kong': {
        return HongKong.src;
      }
      case 'new zealand': {
        return NewZealand.src;
      }
      case 'sweden': {
        return Sweden.src;
      }
      case 'south korea': {
        return SouthKorea.src;
      }
      case 'singapore': {
        return Singapore.src;
      }
      case 'norway': {
        return Norway.src;
      }
      case 'india': {
        return India.src;
      }
      case 'mexico': {
        return Mexico.src;
      }
      case 'south africa': {
        return SouthAfrica.src;
      }
      case 'turkey': {
        return Turkey.src;
      }
      case 'brazil': {
        return Brazil.src;
      }
      case 'saudi arabia': {
        return SaudiArabia.src;
      }
      case 'united arab emirates': {
        return UnitedArabEmirates.src;
      }
      case 'thailand': {
        return Thailand.src;
      }
      case 'malaysia': {
        return Malaysia.src;
      }
      case 'poland': {
        return Poland.src;
      }
      case 'denmark': {
        return Denmark.src;
      }
      case 'indonesia': {
        return Indonesia.src;
      }
      case 'israel': {
        return Israel.src;
      }
      case 'philippines': {
        return Philippines.src;
      }
      case 'czech republic': {
        return Czechia.src;
      }
      case 'ukraine': {
        return Ukraine.src;
      }
    }
  };

  return (
    <div>
      <Image src={getFlagIcon()} alt="Country Flag" width={32} height={32} />
    </div>
  );
};

export default Flag;
