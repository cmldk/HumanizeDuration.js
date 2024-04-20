# Humanize Duration

An extra time adverb has been added to the original package. It accepts negative durations. "-361000" becomes "6 minutes, 1 second ago".

**timeAdverb**

Time adverb added to the result according to duration. This accepts negative durations while using it.

```js
humanizeDuration(363000); // '6 minutes, 3 seconds'
humanizeDuration(363000, { timeAdverb: true }); // 'in 6 minutes, 3 seconds'
humanizeDuration(-363000, { timeAdverb: true }); // '6 minutes, 3 seconds ago'
humanizeDuration(-363000, { language: "tr", timeAdverb: true }); // '6 dakika, 3 saniye önce'
```
