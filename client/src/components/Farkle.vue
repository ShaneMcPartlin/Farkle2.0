<template>
    <div v-if="!gameRunning">

    <div class="row">
      <div class="medium-offset-4 medium-4 columns">
        <h3 class="text-center">Enter Players</h3>
        <div class="row collapse">
          <div class="small-10 columns">
            <input v-model="playerEntry"
                   v-on:keyup.enter="addPlayer"
                   type="text"
                   placeholder="Enter player name">
          </div>
          <div class="small-2 columns">
            <a href="#" v-on:click="addPlayer" class="button postfix">Add</a>
          </div>
        </div>
        <div v-if="players.length > 0">
          <div class="row-collapse" v-for="(player, index) in players" v-bind:key="index">
            <div class="small-10 columns">
              <h3>{{player}}</h3>
            </div>
            <div class="small-2 columns">
              <a href="#" v-on:click="removePlayer(player)" class="button alert postfix">-</a>
            </div>
          </div>
        </div>
        <a href="#" v-on:click="startGame" class="button success medium-12 columns">Start Game</a>
      </div>
    </div>

    </div>
    <div v-else>

      <div class="row">
        <div class="medium-4 columns">
          <div v-for="(player, index) in players" v-bind:key="-index">
            <h3 v-if="player == players[curPlayer]"
                v-on:click="showTotals(player)"
                class="rolling">
                {{player}}: {{totalScore(player)}}
            </h3>
            <h3 v-else v-on:click="showTotals(player)">{{player}}: {{totalScore(player)}}</h3>
          </div>
        </div>
        <div class="medium-4 columns">
          <div class="">
            <h3>Roll Score</h3>
            <input v-model="curScore"
                   v-on:keyup.right="nextPlayer"
                   v-on:keyup.left="prevPlayer"
                   v-on:keyup.enter="addPoints"
                   type="number"
                   placeholder="Enter score">
          </div>
            <div class="row collapse">
              <div class="small-6 columns">
                <a href="#"
                  v-on:click="prevPlayer"
                  class="button secondary medium-12 columns">
                  Previous Player
                </a>
              </div>
              <div class="small-6 columns">
                <a href="#"
                   v-on:click="nextPlayer"
                   class="button primary medium-12 columns">
                   Next Player
                </a>
              </div>
            </div>
        </div>
        <div class="medium-4 columns">
        </div>
        </div>
        <div class="row">
          <img src="../assets/rules.png">
        </div>
      </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

export default {
  data() {
    return {
      playerEntry: '',
      players: [],
      scores: null,
      curPlayer: 0,
      gameRunning: false,
      curScore: 0
    }
  },
  methods: {
    addPlayer() {
      this.players.push(this.playerEntry);
      this.playerEntry = '';
    },
    removePlayer(player) {
      let idx = this.players.indexOf(player);
      this.players.splice(idx, 1);
    },
    startGame() {
      this.scores = new Map();
      for (let player = 0; player < this.players.length; ++player) {
        this.scores.set(this.players[player], [0]);
      }
      this.gameRunning = true;
    },
    addPoints() {
      this.scores.get(this.players[this.curPlayer]).push(parseInt(this.curScore));
      this.curScore = null;
    },
    nextPlayer() {
      this.curPlayer = (this.curPlayer + 1) % this.players.length;
    },
    prevPlayer() {
      this.curPlayer = (this.curPlayer + this.players.length - 1) % this.players.length;
    },
    totalScore(player) {
      let getSum = function(total, num) {
        return total + num;
      }
      return this.scores.get(player).reduce(getSum);
    },
    showTotals(player) {
      let accumulatedScore = 0;
      let scoreString = '';
      for (let i=1; i<this.scores.get(player).length; ++i) {
        accumulatedScore += this.scores.get(player)[i];
        scoreString += (accumulatedScore + "\n");
      }
      alert("Scores for " + player + ":\n" + scoreString);
    },
    getScores() {
      const path = 'http://localhost:5000/farkle';
      axios.get(path)
        .then((res) => {
          console.log(res.data);
        }).catch((error) => {
          console.error(error);
        });
    },
    recordScore(payload) {
      const path = 'http://localhost:5000/farkle';
      axios.post(path, payload)
        .then(() => {
          this.getScores();
        }).catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getScores();
        });
    }
  },
  watch: {
  },
  created() {
    console.log('boop');
    this.getScores();
    this.recordScore({player: '"shane"', score: '5000'})
  }
};
</script>
