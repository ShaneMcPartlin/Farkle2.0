import Vue from 'vue'
import Farkle from '@/components/Farkle'

describe('Farkle.vue', () => {
  it('should start with an empty player entry', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    expect(vm.playerEntry).toEqual('')
  })

  it('should clear playerEntry after adding a player', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    vm.playerEntry = 'Dobby'
    vm.addPlayer()
    expect(vm.playerEntry).toEqual('')
  })

  it('should add a player to the players array with addPlayer()', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    vm.playerEntry = 'Dobby'
    vm.addPlayer()
    expect(vm.players.length).toEqual(1)
  })

  it('should add a player to the players array with addPlayer()', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    vm.playerEntry = 'Dobby'
    vm.addPlayer()
    expect(vm.players.length).toEqual(1)
  })

  it('should have the player name in the players array after adding a player', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    vm.playerEntry = 'Dobby'
    vm.addPlayer()
    expect(vm.players[0]).toEqual('Dobby')
  })

  it('should add 4 players to the players array with addPlayer()', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    vm.playerEntry = 'Dobby'
    vm.addPlayer()
    vm.playerEntry = 'Harry'
    vm.addPlayer()
    vm.playerEntry = 'Ron'
    vm.addPlayer()
    vm.playerEntry = 'Hermoine'
    vm.addPlayer()
    expect(vm.players.length).toEqual(4)
  })

  it('should reduce the length of the players array after removing a player', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    vm.playerEntry = 'Dobby'
    vm.addPlayer()
    vm.playerEntry = 'Harry'
    vm.addPlayer()
    vm.playerEntry = 'Ron'
    vm.addPlayer()
    vm.playerEntry = 'Hermoine'
    vm.addPlayer()
    vm.removePlayer('Dobby')
    expect(vm.players.length).toEqual(3)
  })

  it('should not find a player in the array that has been removed', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    vm.playerEntry = 'Dobby'
    vm.addPlayer()
    vm.playerEntry = 'Harry'
    vm.addPlayer()
    vm.playerEntry = 'Ron'
    vm.addPlayer()
    vm.playerEntry = 'Hermoine'
    vm.addPlayer()
    vm.removePlayer('Dobby')
    expect(vm.players.indexOf('Dobby')).toEqual(-1)
  })

  it('should change views when starting the game', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    vm.playerEntry = 'Dobby'
    vm.addPlayer()
    vm.playerEntry = 'Harry'
    vm.addPlayer()
    vm.playerEntry = 'Ron'
    vm.addPlayer()
    vm.playerEntry = 'Hermoine'
    vm.addPlayer()
    vm.removePlayer('Dobby')
    vm.startGame()
    expect(vm.gameRunning).toBe(true)
  })

  it('should make a map of scores for the players', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    vm.playerEntry = 'Dobby'
    vm.addPlayer()
    vm.playerEntry = 'Harry'
    vm.addPlayer()
    vm.playerEntry = 'Ron'
    vm.addPlayer()
    vm.playerEntry = 'Hermoine'
    vm.addPlayer()
    vm.removePlayer('Dobby')
    vm.startGame()
    expect(vm.scores.size).toEqual(3)
  })

  it('should reset the current score after adding points', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    vm.playerEntry = 'Dobby'
    vm.addPlayer()
    vm.playerEntry = 'Harry'
    vm.addPlayer()
    vm.playerEntry = 'Ron'
    vm.addPlayer()
    vm.playerEntry = 'Hermoine'
    vm.addPlayer()
    vm.removePlayer('Dobby')
    vm.startGame()

    vm.curScore = 800
    vm.addPoints()
    expect(vm.curScore).toEqual(0)
  })

  it('should reset the current score after adding points', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    vm.playerEntry = 'Dobby'
    vm.addPlayer()
    vm.playerEntry = 'Harry'
    vm.addPlayer()
    vm.playerEntry = 'Ron'
    vm.addPlayer()
    vm.playerEntry = 'Hermoine'
    vm.addPlayer()
    vm.removePlayer('Dobby')
    vm.startGame()

    vm.curScore = 800
    vm.addPoints()
    vm.curScore = 500
    vm.addPoints
    expect(vm.scores.get('Harry').length).toEqual(2)
  })

  it('should loop around to the first player after the last player has gone', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    vm.playerEntry = 'Dobby'
    vm.addPlayer()
    vm.playerEntry = 'Harry'
    vm.addPlayer()
    vm.playerEntry = 'Ron'
    vm.addPlayer()
    vm.playerEntry = 'Hermoine'
    vm.addPlayer()
    vm.removePlayer('Dobby')
    vm.startGame()

    vm.curPlayer = 2
    vm.nextPlayer()
    expect(vm.curPlayer).toEqual(0)
  })

  it('should loop around to the last player when going back from the first player', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    vm.playerEntry = 'Dobby'
    vm.addPlayer()
    vm.playerEntry = 'Harry'
    vm.addPlayer()
    vm.playerEntry = 'Ron'
    vm.addPlayer()
    vm.playerEntry = 'Hermoine'
    vm.addPlayer()
    vm.removePlayer('Dobby')
    vm.startGame()

    vm.curPlayer = 0
    vm.prevPlayer()
    expect(vm.curPlayer).toEqual(2)
  })

  it('should give the correct total score for a player', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    vm.playerEntry = 'Dobby'
    vm.addPlayer()
    vm.playerEntry = 'Harry'
    vm.addPlayer()
    vm.playerEntry = 'Ron'
    vm.addPlayer()
    vm.playerEntry = 'Hermoine'
    vm.addPlayer()
    vm.removePlayer('Dobby')
    vm.startGame()

    vm.curScore = 800
    vm.addPoints()
    vm.curScore = 500
    vm.addPoints()
    expect(vm.totalScore('Harry')).toEqual(1300)
  })

  it('should give a list of each roll value', () => {
    const Constructor = Vue.extend(Farkle)
    const vm = new Constructor().$mount()
    vm.playerEntry = 'Dobby'
    vm.addPlayer()
    vm.playerEntry = 'Harry'
    vm.addPlayer()
    vm.playerEntry = 'Ron'
    vm.addPlayer()
    vm.playerEntry = 'Hermoine'
    vm.addPlayer()
    vm.removePlayer('Dobby')
    vm.startGame()

    vm.curScore = 800
    vm.addPoints()
    vm.curScore = 500
    vm.addPoints()
    expect(vm.showTotals('Harry')).toEqual('Scores for Harry:\n800\n1300\n')
  })

  // https://stackoverflow.com/questions/51812626/vue-with-jest-test-with-asynchronous-call

})
