import styled from 'styled-components';

type ButtonWrapperProps = {
    correct: boolean;
    userClicked: boolean;
  };
  
  export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    transition: all 0.3s ease;
    :hover {
      opacity: 0.8;
    }
    button {
        width: 400px;
        height: 35px;
        padding: 10px;
        margin-bottom: 5px;
        border: none;
        color: white;
        
        border-radius: 5px;
      background: ${({ correct, userClicked }) =>
        correct
          ? '#20bf6b'
          : !correct && userClicked
          ? '#eb3b5a'
          : '#4b7bec'};
      
    }
  `;