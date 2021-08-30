import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DealCard, { DealCardProps } from "../DealCard/DealCard";
import moment from "moment";
import DealCardList from "../DealCard/DealCardList";
import { mockDeals, mockPipes } from "data/utils/mock";
import { Typography, Container } from "@material-ui/core";

export let deals = [...mockDeals];
let pipes = [...mockPipes];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const onDragEnd = (result) => {
  const { source, destination } = result;
  // dropped outside the list
  if (!destination) {
    return;
  }
  if (source.droppableId === destination.droppableId) {
    const items = reorder(
      pipes[source.droppableId],
      source.index,
      destination.index
    );

    let state: any = { items };

    if (source.droppableId === "droppable2") {
      state = { selected: items };
    }

    pipes = [...state];
  } else {
    const result = move(
      pipes[source.droppableId],
      pipes[destination.droppableId],
      source,
      destination
    );
  }
};

const DealPipeline = (props) => {
  function onDragEnd(result) {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
/*     if (source.droppableId === destination.droppableId) {
      const items = reorder(
        pipes[source.droppableId],
        source.index,
        destination.index
      );

      let state: any = { items };

      if (source.droppableId === pipes[1].id) {
        state = { selected: items };
      }
      
      pipes = [...state];
    } else {
      const result = move(
        pipes[source.droppableId],
        pipes[destination.droppableId],
        source,
        destination
      );
      pipes[source.droppableId];

    }
 */
         // dropped outside the list
    if (!result.destination) {
      return;
    }
    pipes.forEach((pipe) => {
      const items: any = reorder(
        pipe.cards,
        result.source.index,
        result.destination.index
      );

      pipe.cards = items;
      console.log(pipe);
      console.log(items);
    });
 
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container sx={{my: 4}} style={{display: 'grid', gridTemplateColumns: '300px 300px', backgroundColor: '#afa7a7',}}>
      {pipes.map((pipe) => (
        <div key={pipe.id} >
          <Typography align="center" variant="subtitle1">
            {/* @ts-ignore */}
            {/*stageNames[stage]*/}
            {pipe.title}
          </Typography>
          <Droppable droppableId={pipe.id}>
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} >
                {pipe.cards.map((deal, index) => (
                  <Draggable key={deal.id} draggableId={deal.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <DealCard
                          index={index}
                          title={deal.title}
                          companyName={deal.companyName}
                          companyPicture={deal.companyPicture}
                          contactName={deal.contactName}
                          type={deal.type}
                          budget={deal.budget}
                          startDate={deal.startDate}
                          tag={deal.tag}
                        />
                      <br />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
      </Container>
    </DragDropContext>
  );
};

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
