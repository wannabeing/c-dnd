import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) =>
    props.isDragging ? props.theme.textColor : props.theme.cardColor};
  color: ${(props) => (props.isDragging ? props.theme.cardColor : null)};
  font-weight: ${(props) => (props.isDragging ? 600 : null)};
  padding: 15px 10px;
  border-radius: 7px;
  margin-bottom: 10px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.0784313725);
  img {
    width: 20px;
  }
`;
const DelBtn = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 7px;
  background-color: ${(props) => props.theme.cardColor};
  &:hover {
    background-color: ${(props) => props.theme.boardColor};
  }
`;

interface ICardProps {
  boardName: string;
  cardId: number;
  cardName: string;
  index: number;
}

function DraggableCard({ boardName, cardId, cardName, index }: ICardProps) {
  const setBoards = useSetRecoilState(boardState);

  const onDelete = (event: React.MouseEvent) => {
    setBoards((currentBoards) => {
      // 수정할 board 가져오기
      const editBoard = [...currentBoards[boardName]];
      // 삭제누른 card 삭제
      editBoard.splice(index, 1);

      return {
        ...currentBoards,
        [boardName]: editBoard,
      };
    });
  };
  return (
    <Draggable key={cardName} draggableId={cardId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <span>🔥</span>
          {cardName.toUpperCase()}
          <DelBtn onClick={onDelete}>
            <img
              src="https://img.icons8.com/stickers/100/000000/delete-sign.png"
              alt="delete"
            />
          </DelBtn>
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DraggableCard);
