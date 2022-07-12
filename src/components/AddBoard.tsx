import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "../atoms";

const Board = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 10px;
  margin-right: 20px;
  margin-bottom: 25px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-width: 350px;
  min-height: 150px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.0784313725);
`;
const Title = styled.h2`
  display: flex;
  font-size: 28px;
  font-weight: 600;
  justify-content: center;
  background-color: #4b6584;
  color: ${(props) => props.theme.cardColor};
  padding: 5px;
  border-radius: 5px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  input {
    width: 100%;
    height: 30px;
    margin-top: 5px;
    border: none;
    border-radius: 8px;
    text-align: center;
    font-size: 12px;
  }
`;

interface IForm {
  name: string;
}

function PlayerBoard() {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setBoard = useSetRecoilState(boardState);

  const onValid = ({ name }: IForm) => {
    setBoard((currentBoards) => {
      return {
        ...currentBoards,
        [name]: [],
      };
    });

    setValue("name", "");
  };

  return (
    <Board>
      <Title>ADD BOARD</Title>
      <hr />
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="ADD BOARD & PRESS ENTER !!"
        />
      </Form>
    </Board>
  );
}

export default React.memo(PlayerBoard);
