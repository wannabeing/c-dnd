import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  padding-top: 2px;
  border-radius: 7px;
  width: 200px;
  min-height: 150px;
`;
const Title = styled.h2`
  display: flex;
  font-size: 28px;
  font-weight: 600;
  justify-content: center;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.cardColor};
  padding: 5px;
`;

interface IBoardProps {
  board: string[];
  boardName: string;
}

function DroppableBoard({ board, boardName }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardName.toUpperCase()}</Title>
      <hr />
      <Droppable droppableId={boardName}>
        {(magic) => (
          <Board ref={magic.innerRef} {...magic.droppableProps}>
            {board.map((cardName, index) => (
              <DraggableCard key={cardName} cardName={cardName} index={index} />
            ))}
            {magic.placeholder}
          </Board>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DroppableBoard;
