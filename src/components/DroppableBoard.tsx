import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.0784313725);
`;

const Board = styled.div<{ isDraggingOver: boolean }>`
  background-color: ${(props) => props.theme.boardColor};
  padding: 0px 10px;
  padding-top: 2px;
  border-radius: 7px;
  width: 200px;
  flex-grow: 1;
`;
const Title = styled.h2`
  display: flex;
  font-size: 28px;
  font-weight: 600;
  justify-content: center;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.cardColor};
  padding: 5px;
  border-radius: 5px;
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
        {(magic, snapshot) => (
          <Board
            ref={magic.innerRef}
            {...magic.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
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
