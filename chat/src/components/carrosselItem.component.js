import react, { useEffect, useState } from 'react';
import { Card, Typography, Button, IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { COLORS } from '../styles/colors';
import CustomCard from './card.component';

const StyledCarrosselItem = styled('div')`
  height: 100%;
  display: ${props => props.currentIndex === props.index ? 'block' : 'none'};
`;

const CarrosselControl = styled(CustomCard)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`

const CardWrapper = styled('div')`
  padding: 15px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const CarrosselWrapper = styled('div')`
  background: ${props => !props.nightMode && COLORS.primary};
  color: ${props => !props.nightMode && COLORS.light0};
  min-width: 140px;
  min-height: 140px;
  // width: max-content;
  padding: 15px;
  border: 5px solid ${COLORS.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${COLORS.borderRadius};
`;

const CarrosselValue = styled(Typography)`
  font-weight: bold;
`;

// const CarrosselButtons = styled('div')`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   height: 20%;
// `;

const CarrosselButton = styled(IconButton)`
  svg{
    font-size: 40px;
  }
`

export const CarrosselItemComponent = ({ title, subtitle, value, label, index, currentIndex, show }) => {

  const accessibility = useSelector(state => state.accessibility);

  return (
    <StyledCarrosselItem index={show || index} currentIndex={show || currentIndex}>
      <CardWrapper>
        <Typography><b>{title}</b></Typography>
        <CarrosselWrapper nightMode={accessibility.nightMode}>
          <CarrosselValue variant="h3" className="main-font-style main-font-type">{value}</CarrosselValue>
          <Typography>{label}</Typography>
        </CarrosselWrapper>
        <Typography><b>{subtitle}</b></Typography>
      </CardWrapper>
    </StyledCarrosselItem>
  )
}

export function CarrosselItem({ carrossel, currentIndex, setCurrentIndex }) {

  const [carrosselLength, setCarrosselLength] = useState(0);

  const handleNext = () => {
    if (currentIndex + 1 < carrosselLength) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  };

  useEffect(() => {
    setCarrosselLength(carrossel?.length);
  }, [carrossel])

  return (
    <CarrosselControl height={'360px'} className="second-background main-text">
      <CarrosselButton onClick={() => handlePrev()}><ChevronLeft /></CarrosselButton>

      {
        carrossel?.map((item, index) => (
          <CarrosselItemComponent key={index} title={item.title} subtitle={item.subtitle} label={item.label}
            value={item.value} index={index} currentIndex={currentIndex} />
        ))
      }

      <CarrosselButton onClick={() => handleNext()}><ChevronRight /></CarrosselButton>
    </CarrosselControl>
  )
}