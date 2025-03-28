import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Container = styled.div`
  width: 1920px;
  height: 100%;
  padding: 25px 0;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 20px;
  @media (max-width: 2030px) {
    width: 95%;
  }
  @media (max-width: 1350px) {
    flex-direction: column;
    margin: 24px auto;
    gap: 35px;
    padding: 0;
  }
`;

export const ContainerSticky = styled.div`
  height: fit-content;
  position: sticky;
  top: 10px;
  @media (max-width: 1350px) {
    position: relative;
  }
  @media (max-height: 1050px) {
    position: relative;
  }
`;
