let vm = new Vue({
  el: "#app",
  data: {
    gather: true, //牌堆狀態
    state: "Press the cards to start game!",
    symbols: [
      {label: "spades",symbol: "♠"},
      {label: "hearts",symbol: "♥"},
      {label: "clubs",symbol: "♣"},
      {label: "diamonds",symbol: "♦"}
    ],
    cards: [
      {id:1, label: "spades", open: false},
      {id:2, label: "hearts", open: false},
      {id:3, label: "clubs", open: false},
      {id:4, label: "diamonds", open: false}
    ],
    question: null,
    mode: "",
    count: 0
  },
  methods: {
    shuffle() {
      let newOrder = [1,2,3,4].sort((a,b) => Math.random() > 0.5 ? 1:-1)
      this.cards.forEach((card,cid) => card.id = newOrder[cid])
    },
    getSymbol(label) {
      let result = this.symbols.find(s => s.label == label)
      return result ? result.symbol:label
    },
    turnAll(state) {
      this.cards.forEach(card => {
        card.open = state
      })
    },
    startGame() {
      this.mode = ""
      this.question = this.symbols[parseInt(Math.random() * 4)]
      this.turnAll(false)
      this.gather = true
      this.state = "Ready..."
      setTimeout(() => {
        this.gather =false
        this.state = "Your mission is.."
      },1000)
      
      setTimeout(() => {
        this.turnAll(true)
        this.state = "Find " + this.question.label + this.question.symbol
      },2000)
      
      setTimeout(() => {
        this.turnAll(false)
        this.state = "Ready.....Go!!!"
      },4000)
      
      this.count = 0
      setTimeout(() => {
        let startShuffle = () => {
          this.shuffle()
          //console.log("Shuffle! " + this.count)
          if(this.count++ < 6) {
            setTimeout(startShuffle,300)
          } else {
            this.state = "Please Pick out " + this.question.label + this.question.symbol
            this.mode = "answer"
          }
        }
        startShuffle()
      },6000)
    },
    getCard(label) {
      return this.cards.find(card => card.label == label)
    },
    openCard(card) {
      if(this.mode == "answer") {
        card.open=!card.open
        if(card.label==this.question.label) {
          this.state = "You Get the " + this.question.label + this.question.symbol + "!!"
        } else {
          this.state = "You Lose!!!!"
          setTimeout(() => {
            let card = this.getCard(this.question.label)
            card.open = true
          },1000)
        }
        setTimeout(() => {
          this.startGame()
        },3000)
      } else {
        this.startGame()
      }
    }
  },
  // mounted() {
  //   this.startGame()
  // }
})
