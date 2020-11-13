import styled from 'styled-components';

function bkgColour(temperature) {
    if(temperature <= -10){
      return '#00ffff';} else if (temperature === 10)
      {return '#fff700';} else if(temperature >= 30){
      return '#ff8c00';} else {
    
      return 'white'}
}

export const Styles = styled.div`
  background-color: ${props => bkgColour(props.temperature)};

  .wrapper {
    min-height: 100vh;
    max-width: 40em;
    margin: 0 auto;
  }

  .permissions-msg {
    text-align: center;
  }

  .weather-icon {
    display: block;
    margin: 0 auto;
  }
`;
