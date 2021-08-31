import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DealCardList from "../DealCard/DealCardList";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import moment from "moment";
import { mockDeals } from "data/utils/mock";
const DragDropContextContainer = styled('div')`
  padding: 20px;
  border: 4px solid indianred;
  border-radius: 6px;
`;

const ListGrid = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;

const getItems = (prefix) =>{
  const teste = [];
  mockDeals.map((d) => {
    d.prefix === prefix ? teste.push(d) : null
  })  
  return teste
}

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ["todo", "inProgress", "done"];

const generateLists = () =>
  lists.reduce(
    (acc, listKey, index) => ({ ...acc, [listKey]: getItems(index) }),
    {}
  );

function DealPipeline() {
  const [elements, setElements] = React.useState(generateLists());

  useEffect(() => {
    setElements(generateLists());
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
  };

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {lists.map((listKey) => (
            <DealCardList
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
}

export default DealPipeline;
// Put the thing into the DOM!

/* import React, { useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import { pipes } from "data/utils/mock";
import DealCard from "../DealCard/DealCard";
import moment from "moment";

const board = {
  columns: pipes,
};

function UncontrolledBoard() {
  return (
    <Board
      allowRemoveLane
      allowRenameColumn
      allowRemoveCard
      onLaneRemove={console.log}
      onCardRemove={console.log}
      onLaneRename={console.log}
      initialBoard={board}
      allowAddCard={{ on: "top" }}
      onNewCardConfirm={(draftCard) => ({
        id: new Date().getTime(),
        ...draftCard,
      })}
      onCardNew={console.log}
    />
  );
}

const DealPipeline: React.FC = () => {
  return (
    <>
      <Board
        renderCard={({ content }, { removeCard, dragging }) => (
          <DealCard
            dragging={dragging}
            title="Privatização dos correios"
            companyName="coxinha"
            companyPicture={
              "https://i0.zi.org.tw/kocpc/2021/02/1613622663-c613247d3bbbd06adf918a93f4e5098f.jpg"
            }
            contactName="Willian Rodrigues"
            type="teste"
            budget={2457}
            startDate={moment().format("DD/MM/YYYY HH:MM")}
            tag={"hot"}
          ></DealCard>
        )}
      >
        {board}
      </Board>
    </>
  );
};
export default DealPipeline;
 */














// // a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// const move = (source, destination, droppableSource, droppableDestination) => {
//   const sourceClone = Array.from(source);
//   const destClone = Array.from(destination);
//   const [removed] = sourceClone.splice(droppableSource.index, 1);

//   destClone.splice(droppableDestination.index, 0, removed);

//   const result = {};
//   result[droppableSource.droppableId] = sourceClone;
//   result[droppableDestination.droppableId] = destClone;

//   return result;
// };

// const onDragEnd = (result) => {
//   const { source, destination } = result;
//   // dropped outside the list
//   if (!destination) {
//     return;
//   }
//   if (source.droppableId === destination.droppableId) {
//     const items = reorder(
//       pipes[source.droppableId],
//       source.index,
//       destination.index
//     );

//     let state: any = { items };

//     if (source.droppableId === "droppable2") {
//       state = { selected: items };
//     }

//     pipes = [...state];
//   } else {
//     const result = move(
//       pipes[source.droppableId],
//       pipes[destination.droppableId],
//       source,
//       destination
//     );
//   }
// };

// const DealPipeline = (props) => {
//   function onDragEnd(result) {
//     const { source, destination } = result;
//     // dropped outside the list
//     if (!destination) {
//       return;
//     }
// /*     if (source.droppableId === destination.droppableId) {
//       const items = reorder(
//         pipes[source.droppableId],
//         source.index,
//         destination.index
//       );

//       let state: any = { items };

//       if (source.droppableId === pipes[1].id) {
//         state = { selected: items };
//       }
      
//       pipes = [...state];
//     } else {
//       const result = move(
//         pipes[source.droppableId],
//         pipes[destination.droppableId],
//         source,
//         destination
//       );
//       pipes[source.droppableId];

//     }
//  */
//          // dropped outside the list
//     if (!result.destination) {
//       return;
//     }
//     pipes.forEach((pipe) => {
//       const items: any = reorder(
//         pipe.cards,
//         result.source.index,
//         result.destination.index
//       );

//       pipe.cards = items;
//       console.log(pipe);
//       console.log(items);
//     });
 
//   }
