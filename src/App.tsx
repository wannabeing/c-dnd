import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "./atoms";
import AddBoard from "./components/AddBoard";
import ShowBoard from "./components/ShowBoard";

const Title = styled.div`
  position: sticky;
  top: 0%;
  min-width: 680px;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.cardColor};
  color: #fdcb6e;
  font-weight: 800;
  font-size: 48px;
  img {
    width: 50px;
    margin-left: 5px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Boards = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(3, 1fr);
`;
const Player = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

function App() {
  const [boards, setBoards] = useRecoilState(boardState);

  const onDragEnd = (info: DropResult) => {
    // detination: 도착지점, source: 출발지점, dragID: 값을 갖고있는 객체의 id
    const { destination, source } = info;
    // 제자리 이동시 return
    if (!destination) return;

    // 이동하고자 하는 보드 이름
    const startBoardName = source.droppableId;
    const endBoardName = destination.droppableId;

    // 🔥 보드 이동
    if (startBoardName === "boards" && endBoardName === "boards") {
      // 옮기고자 하는 인덱스번호 (정수)
      const end = destination?.index;
      // 출발하는 인덱스번호 (정수)
      const start = source.index;

      setBoards((currentBoards) => {
        const arrs = Object.entries(currentBoards);
        const movedArr = arrs[start];
        // 옮기고자 하는 배열 삭제
        arrs.splice(start, 1);
        // 옮기고자 하는 곳에 배열 삽입
        arrs.splice(end, 0, movedArr);
        const editBoards = Object.fromEntries(arrs);
        return { ...editBoards };
      });
    }
    // 🔥 같은 보드 내에 카드 이동
    else if (startBoardName === endBoardName) {
      setBoards((currentBoards) => {
        // 수정해야 할 보드(arr) 가져오기
        const editBoard = [...currentBoards[startBoardName]];
        // 이동할 카드(obj) 가져오기
        const playerObj = editBoard[source.index];

        // 1. 출발지점 index에 값 삭제
        editBoard.splice(source.index, 1);
        // 2. 도착지점 index에 값 넣기
        editBoard.splice(destination?.index, 0, playerObj);

        return {
          ...currentBoards,
          [startBoardName]: editBoard,
        };
      });
    }

    // 🔥 서로 다른 보드에 카드 이동
    if (destination.droppableId !== source.droppableId) {
      setBoards((currentBoards) => {
        // 서로 이동할 보드(arr) 가져오기
        const startBoard = [...currentBoards[startBoardName]];
        const endBoard = [...currentBoards[endBoardName]];
        // 이동할 카드(obj) 가져오기
        const playerObj = startBoard[source.index];

        // 1. 출발 board 수정
        startBoard.splice(source.index, 1);
        // 2. 도착 board 수정
        endBoard.splice(destination.index, 0, playerObj);
        return {
          ...currentBoards,
          [startBoardName]: startBoard,
          [endBoardName]: endBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Title>
        <span>DRAG N DROP</span>
        <img
          src="https://img.icons8.com/stickers/100/000000/hang-10.png"
          alt="ten"
        />
      </Title>
      <Player>
        <AddBoard />
      </Player>
      <Droppable droppableId="boards" direction="horizontal" type="board">
        {(magic) => (
          <Wrapper>
            <Boards ref={magic.innerRef} {...magic.droppableProps}>
              {Object.keys(boards).map((boardName, index) => (
                <ShowBoard
                  key={boardName}
                  boardName={boardName}
                  board={boards[boardName]}
                  index={index}
                />
              ))}
              {magic.placeholder}
            </Boards>
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
