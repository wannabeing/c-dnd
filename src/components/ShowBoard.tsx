import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, IPlayer } from "../atoms";
import Card from "./Card";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.0784313725);
  margin-bottom: 15px;
`;

const Board = styled.div<{ isDraggingOver: boolean }>`
  background-color: ${(props) => props.theme.boardColor};
  padding: 0px 10px;
  padding-top: 2px;
  border-radius: 7px;
  width: 200px;
  flex-grow: 1;
`;
const Title = styled.h2<{ boardName: string }>`
  display: flex;
  align-items: center;
  font-size: 28px;
  font-weight: 600;
  justify-content: space-between;
  background-color: ${(props) =>
    props.boardName === "forward"
      ? "red"
      : props.boardName === "midfielder"
      ? "green"
      : props.boardName === "defender"
      ? "blue"
      : props.theme.textColor};
  color: ${(props) => props.theme.cardColor};
  padding: 5px;
  border-radius: 5px;

  img {
    width: 20px;
    height: 20px;
  }
`;
const DelBtn = styled.button`
  cursor: pointer;
  background-color: inherit;
  border: none;
  border-radius: 7px;
  &:hover {
    opacity: 0.7;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    width: 99%;
    height: 30px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    text-align: center;
    font-size: 10px;
  }
`;
const ErrorMsg = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #e84118;
  font-size: 12px;
  margin-top: 5px;
`;

interface IForm {
  name: string;
}

interface IBoardProps {
  board: IPlayer[];
  boardName: string;
  index: number;
}

function DroppableBoard({ board, boardName, index }: IBoardProps) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const setBoards = useSetRecoilState(boardState);

  const onValid = ({ name }: IForm) => {
    const playerObj = {
      id: Date.now(),
      name,
    };
    setBoards((currentBoards) => {
      return {
        ...currentBoards,
        [boardName]: [...currentBoards[boardName], playerObj],
      };
    });
    setValue("name", "");
  };
  const delBoard = () => {
    setBoards((currentBoards) => {
      // currnetBoards(obj) -> arr로 변환
      const entryBoards = Object.entries(currentBoards);
      // 삭제하고 싶은 board 뺀 나머지 arr 저장
      const editBoards = entryBoards.filter(
        (entryBoard) => entryBoard[0] !== boardName
      );
      // 다시 arr -> obj 변환
      const newBoards = Object.fromEntries(editBoards);

      return newBoards;
    });
  };
  return (
    <Draggable index={index} draggableId={boardName} key={boardName}>
      {(magic) => (
        <Wrapper
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          <Title boardName={boardName}>
            {boardName.toUpperCase()}
            <DelBtn onClick={delBoard}>
              <img
                src="https://img.icons8.com/stickers/100/000000/delete-sign.png"
                alt="delete"
              />
            </DelBtn>
          </Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("name", {
                minLength: {
                  value: 3,
                  message: "너무 짧아요!",
                },
                maxLength: {
                  value: 8,
                  message: "너무 길어요!",
                },
              })}
              type="text"
              placeholder="ADD PLAYER & PRESS ENTER !!"
            />
            <ErrorMsg>{errors.name?.message}</ErrorMsg>
          </Form>
          <hr />

          <Droppable droppableId={boardName}>
            {(magic, snapshot) => (
              <Board
                ref={magic.innerRef}
                {...magic.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {board.map((card, index) => (
                  <Card
                    key={card.id}
                    cardId={card.id}
                    cardName={card.name}
                    index={index}
                    boardName={boardName}
                  />
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default React.memo(DroppableBoard);
