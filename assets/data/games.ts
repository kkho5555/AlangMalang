import { GameType } from '../../types';

export const GameList: Array<GameType> = [
    {
        id: 'speedQuiz',
        num: 1,
        bgColor1: '#ffa235',
        bgColor2: '#fff3b2',
        title: '스피드퀴즈',
        type: '개인전',
        headCount: {
            min: 2,
            max: 6
        },
        gameManual: {
            tester: '스피드퀴즈 설명입니다.',
            participant: '스피드퀴즈 설명입니다.'
        },
        imgPath: require('../images/backgrounds/banana.png')
    },
    {
        id: 'silentScream',
        num: 2,
        bgColor1: '#35aaff',
        bgColor2: '#fff3b2',
        title: '신조어 퀴즈',
        type: '개인전',
        headCount: {
            min: 2,
            max: 6
        },
        gameManual: {
            tester: '신조어 제시되는 단어를 행동으로 설명해요',
            participant: '신조어 행동을 보고 어떤 단어인지 맞춰요'
        },
        imgPath: require('../images/backgrounds/star.png')
    },
    {
        id: 'bodyTalk',
        num: 3,
        bgColor1: '#ff3565',
        bgColor2: '#ffcbc4',
        title: '몸으로 말해요',
        type: '개인전',
        headCount: {
            min: 2,
            max: 6
        },
        gameManual: {
            tester: '몸말 제시되는 단어를 행동으로 설명해요',
            participant: '몸말 행동을 보고 어떤 단어인지 맞춰요'
        },
        imgPath: require('../images/backgrounds/cherry.png')
    }
];
