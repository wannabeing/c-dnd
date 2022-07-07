import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "./atoms";
import DroppableBoard from "./components/DroppableBoard";

const Title = styled.div`
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
  height: 85vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Boards = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(4, 1fr);
  /* forward */
  div:nth-child(2) {
    h2 {
      background-color: red;
    }
  }
  /* midfielder */
  div:nth-child(3) {
    h2 {
      background-color: green;
    }
  }
  /* defender */
  div:nth-child(4) {
    h2 {
      background-color: blue;
    }
  }
`;

function App() {
  const [boards, setBoards] = useRecoilState(boardState);

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    // detination: 도착지점, source: 출발지점, dragID: 카드 값
    const { destination, source, draggableId } = info;
    // 제자리 이동시 return
    if (!destination) return;

    // 동일 보드 내에서 움직이는지
    if (destination?.droppableId === source.droppableId) {
      setBoards((currentBoards) => {
        const boardName = source.droppableId;
        // 움직인 보드(arr) 가져오기
        const editBoard = [...currentBoards[boardName]];
        // 1. 출발지점 index에 값 삭제
        editBoard.splice(source.index, 1);
        // 2. 도착지점 index에 값 넣기
        editBoard.splice(destination?.index, 0, draggableId);
        return {
          ...currentBoards,
          [boardName]: editBoard,
        };
      });
    }
    // 다른 보드끼리의 이동
    if (destination.droppableId !== source.droppableId) {
      setBoards((currentBoards) => {
        // 수정될 보드 이름
        const startName = source.droppableId;
        const endName = destination.droppableId;
        // 수정할 보드 값 가져오기
        const startBoard = [...currentBoards[startName]];
        const endBoard = [...currentBoards[endName]];

        // 1. 출발 board 수정
        startBoard.splice(source.index, 1);
        // 2. 도착 board 수정
        endBoard.splice(destination.index, 0, draggableId);
        return {
          ...currentBoards,
          [startName]: startBoard,
          [endName]: endBoard,
        };
      });
    }

    // source: 출발지점
    // destination: 도착지점
    // draggableId: 움직이고자 하는 값
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
      <Wrapper>
        <Boards>
          {Object.keys(boards).map((boardName) => (
            <DroppableBoard
              key={boardName}
              boardName={boardName}
              board={boards[boardName]}
            />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
