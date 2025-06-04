import { defineStore } from 'pinia'

interface PollOption {
  id: number
  text: string
  votes: number
}

interface Poll {
  question: string
  options: PollOption[]
}

export const usePollStore = defineStore('poll', {
  state: () => ({
    activePoll: null as Poll | null
  }),

  actions: {
    createPoll(question: string, options: string[]) {
      this.activePoll = {
        question,
        options: options.map((text, index) => ({
          id: index,
          text,
          votes: 0
        }))
      }
    },

    vote(optionId: number) {
      if (this.activePoll) {
        const option = this.activePoll.options.find(o => o.id === optionId)
        if (option) {
          option.votes++
        }
      }
    },

    resetPoll() {
      this.activePoll = null
    }
  },

  getters: {
    totalVotes(): number {
      return this.activePoll?.options.reduce((sum, option) => sum + option.votes, 0) ?? 0
    }
  }
})
