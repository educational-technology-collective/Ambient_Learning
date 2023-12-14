import { signal } from "@preact/signals-react";

const stats = signal({
    total: 0,
    duration: 0,
    correct: 0,
    incorrect: 0,
    skipped: 0,
    know: 0,
    dontKnow: 0,
    oneMore: 0,
    poorCard: 0,
  });

const updateStats = (testEval, selfEval) => {
    console.log('StatsStore.updateStats:  ' + testEval + ' ' + selfEval);
    stats.value.total += 1;
    if (testEval !== '') stats.value[testEval] += 1;
    stats.value[selfEval] += 1;
    console.log('UPDATE STATS: ', stats.value);
}

const updateDuration = (duration) => {
    stats.value.duration = duration;
    console.log('Duration updated to ' + duration);
}

const StatsStore = {
    stats,
    updateStats,
    updateDuration
};

export default StatsStore;