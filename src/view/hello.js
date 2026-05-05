import { Card, Shopping, CardV2 } from "../components/index.js"
import { Observable } from "../Util/Observable.js"

export const ViewCard = () => {
  const element = document.createElement("div")
  element.className = "container"
  const observable = new Observable(20)
  const shopping = new Shopping(observable.state)
  const card = new Card({
    title: "afva",
    imageUrl:
      "https://www.motortrend.com/uploads/2022/03/2022-Honda-Civic-Touring-vs-2022-Hyundai-Elantra-Limited-vs-2022-Kia-Forte-GT-vs-2022-Mazda-Mazda3-Sedan-AWD-Turbo-vs-2022-Nissan-Sentra-SR-vs-2022-Volkswagen-Jetta-SEL-19.jpg?fit=around%7C875:492",
    description: "hello wordl",
    observable,
  })

  const card02 = new Card({
    title: "afva02",
    imageUrl:
      "https://www.motortrend.com/uploads/2022/03/2022-Honda-Civic-Touring-vs-2022-Hyundai-Elantra-Limited-vs-2022-Kia-Forte-GT-vs-2022-Mazda-Mazda3-Sedan-AWD-Turbo-vs-2022-Nissan-Sentra-SR-vs-2022-Volkswagen-Jetta-SEL-19.jpg?fit=around%7C875:492",
    description: "hello wordl 02",
    observable,
  })

  const cardV2 = new CardV2({
    title: "afva03",
    imageUrl:
      "https://www.motortrend.com/uploads/2022/03/2022-Honda-Civic-Touring-vs-2022-Hyundai-Elantra-Limited-vs-2022-Kia-Forte-GT-vs-2022-Mazda-Mazda3-Sedan-AWD-Turbo-vs-2022-Nissan-Sentra-SR-vs-2022-Volkswagen-Jetta-SEL-19.jpg?fit=around%7C875:492",
    description: "hello wordl 03",
    observable,
  })

  observable.subscribe(card)
  observable.subscribe(shopping)
  observable.subscribe(cardV2)
  element.appendChild(shopping.element)
  element.appendChild(card.element)
  element.appendChild(card02.element)
  element.appendChild(cardV2.render())

  return element
}
