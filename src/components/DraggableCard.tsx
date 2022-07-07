import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px 10px;
  border-radius: 7px;
  margin-bottom: 7px;
`;

interface ICardProps {
  cardName: string;
  index: number;
}

function DraggableCard({ cardName, index }: ICardProps) {
  return (
    <Draggable key={cardName} draggableId={cardName} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <span>🔥</span>
          {cardName.toUpperCase()}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DraggableCard);
