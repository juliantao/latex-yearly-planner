const moment = require('moment');
const funcs = require('./funcs');
const ls = require('./latexsnips');

const dailySchedule = (year) => {
  let ptr = moment().year(year).month(0).date(0);
  let last = moment().year(year + 1).month(0).date(0).dayOfYear() + 1;

  return funcs
    .range(1, last)
    .map(() => ptr.add(1, 'day') && [
      ls.slink(ptr.year()),
      ls.slink('Q'+Math.floor((ptr.month() / 3)+1)),
      ls.slink(ptr.format('MMMM')),
      ls.slink('Week ' + ptr.isoWeek()),
      ptr.clone(),
    ])
    .map(hh => dayTemplate(hh.slice(0, 4), hh.pop()))
    .join('\n');
};

const dayTemplate = (hh, today) => {
  const schedule = funcs
    .range(6, 23)
    .map(h => `\\myLineOfColorGray\\myLineHBL${h}\\myLineOfColorLightGray\\vskip\\myHBL`)
    .join('');

  const refFormat = today.format('yyyyMMDD');
  const textFormat = today.format('dddd, D');
  const dailySchedule = funcs.interpolateTpl('daily', {
    schedule,
    dailyNotes: ls.link(refFormat+'note', 'Daily'),
    dailyDiary: ls.link(refFormat+'diary', 'Diary'),
    allNotes: ls.link('Notes Index', 'All notes'),
    allTodos: ls.link('To Do Index', 'All todos')
  });

  return `${ls.header([...hh, ls.target(refFormat, textFormat)])}
${dailySchedule}\\pagebreak
${ls.header([...hh, ls.link(refFormat, textFormat), ls.target(refFormat+'note', 'Notes')])}
${funcs.interpolateTpl('dailyNotes', {})}\\pagebreak
${ls.header([...hh, ls.link(refFormat, textFormat), ls.target(refFormat+'diary', 'Diary')])}
${funcs.interpolateTpl('dailyDiary', {})}\\pagebreak`;
}

module.exports.dailySchedule = dailySchedule;
