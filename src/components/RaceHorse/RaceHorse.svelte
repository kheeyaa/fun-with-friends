<script lang="ts">
import {onMount} from "svelte";
import Button from "../common/Button.svelte";
import Horse from "./Horse.svelte";
import RankText from "./RankText.svelte";

type horseType = {
  name: string;
  id: number;
  rank: number;
};

let horseList: horseType[] = [{name: "", id: 1, rank: -1}];
let isStart = false;
let isReset = false;
let raceWidth = 1000;
let rankingList: horseType[] = [];

const resetRace = () => {
  horseList = horseList.map((horse) => ({
    ...horse,
    rank: -1
  }));
  rankingList = [];
  isReset = true;
  isStart = false;
};

onMount(resetRace);
</script>

<Button
  onClick={() => {
    const lastHorse = horseList[horseList.length - 1];
    horseList = [...horseList, {name: "", id: lastHorse.id + 1, rank: -1}];
    resetRace();
  }}
  type="button">말 추가하기</Button
>
<Button
  onClick={() => {
    resetRace();
    const timer = setTimeout(() => {
      isStart = true;
      clearTimeout(timer);
    }, 300);
  }}
  type="button">시작하기</Button
>
<Button onClick={resetRace} type="button">리셋하기</Button>

<!-- 말 sprite css 로 바꾸기  -->
{#each horseList as horse (horse.id)}
  <div class="flex items-center">
    <div>{horse.id}번 말</div>
    <div style={`width: ${raceWidth + 100}px`}>
      <Horse
        {raceWidth}
        setHorseInfo={() => {
          horseList = horseList.map((newHorse) => {
            if (horse.id === newHorse.id) {
              const updatedHorse = {
                ...newHorse,
                rank: rankingList.length + 1
              };
              rankingList.push(updatedHorse);
              return updatedHorse;
            }
            return newHorse;
          });
        }}
        initReset={() => {
          isReset = false;
        }}
        {isStart}
        {isReset}
      />
    </div>

    <RankText rank={horse.rank} lastLank={horseList.length} />
  </div>
{/each}
