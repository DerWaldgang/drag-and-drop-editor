import { useState, DragEvent } from "react";

type ICard = {
  id: number;
  order: number;
  text: string;
};
//  DRAG AND DROP TESTING
export const DragAndDropList = () => {
    
  const [cards, setCards] = useState<ICard[]>([
    { id: 1, order: 3, text: "КАРТОЧКА 3" },
    { id: 2, order: 1, text: "КАРТОЧКА 1" },
    { id: 3, order: 2, text: "КАРТОЧКА 2" },
    { id: 4, order: 4, text: "КАРТОЧКА 4" },
  ]);

  const [currentCard, setCurrentCard] = useState<ICard>();

  const dragStartHandler = (e: DragEvent<HTMLDivElement>, card: ICard) => {
    setCurrentCard(card);
  };

  const dragEndHanlder = (e: any) => {
    e.target.style.background = "transparent";
  };

  const dragOverHandler = (e: any) => {
    e.preventDefault();
    e.target.style.background = "lightgrey";
  };

  const dropHanlder = (e: any, card: ICard) => {
    e.preventDefault();

    if (currentCard) {
      setCards(
        cards.map((c) => {
          if (c.id === card.id) {
            return { ...c, order: currentCard.order };
          }
          if (c.id === currentCard.id) {
            return { ...c, order: card.order };
          }
          return c;
        })
      );
    }
    e.target.style.background = "transparent";
  };

  const sortCard = (a: ICard, b: ICard) => {
    if(a.order > b.order) {
        return 1
    } else {
        return -1
    }
  }

  return (
    <div className="wrapper">
      {cards.sort(sortCard).map((card) => (
        <div
          className="card"
          draggable
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragLeave={(e) => dragEndHanlder(e)}
          onDragEnd={(e) => dragEndHanlder(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHanlder(e, card)}
          key={card.id}
        >
          {card.text}
        </div>
      ))}
    </div>
  );
};

// onDragStart={} -> когда взяли
// onDragLeave={} -> когда вышли запределы другой карты
// onDragEnd={} -> когда отпустили перемещение
// onDragOver={} -> если находимся над другим обьектом
// onDrop={} -> когда отпустили карты и рассчитваем на какое то действие
