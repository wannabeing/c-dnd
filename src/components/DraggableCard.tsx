import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isDragging ? props.theme.textColor : props.theme.cardColor};
  color: ${(props) => (props.isDragging ? props.theme.cardColor : null)};
  font-weight: ${(props) => (props.isDragging ? 600 : null)};
  padding: 15px 10px;
  border-radius: 7px;
  margin-bottom: 10px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.0784313725);
`;

interface ICardProps {
  cardName: string;
  index: number;
}

function DraggableCard({ cardName, index }: ICardProps) {
  return (
    <Draggable key={cardName} draggableId={cardName} index={index}>
      {(magic, snapshot) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <span>🔥</span>
          {cardName.toUpperCase()}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DraggableCard);
