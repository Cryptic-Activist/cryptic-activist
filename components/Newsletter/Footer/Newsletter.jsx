import React, { useState, memo } from 'react';

import { FaEnvelope } from 'react-icons/fa';
import {
  Title,
  Email,
  Icon,
} from '../../../styles/Components/UI/Footer/Newsletter/newsletter.styled-components';

const Newsletter = () => {
  const [email, setEmail] = useState('')
  
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  return (
    <>
      <Title>
        Newsletter
      </Title>
      <Email 
        placeholder="Email"
        onChange={handleEmail}
        value={email}
      />
      <Icon>
        <FaEnvelope />
      </Icon>
    </>
  );
}

export default memo(Newsletter)