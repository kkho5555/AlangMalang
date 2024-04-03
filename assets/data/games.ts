import { GameType } from '../../types';

export const GameData: Array<GameType> = [
    {
        num: 1,
        bgColor1: '#ffa235',
        bgColor2: '#fff3b2',
        title: '이어말하기',
        type: '개인전',
        headCount: {
            min: 2,
            max: 6,
        },
        gameManual: {
            tester: '이어 제시되는 단어를 행동으로 설명해요',
            participant: '이어 행동을 보고 어떤 단어인지 맞춰요',
        },
        imgPath: require('../images/backgrounds/banana.png'),
    },
    {
        num: 2,
        bgColor1: '#35aaff',
        bgColor2: '#fff3b2',
        title: '고요속의 외침',
        type: '개인전',
        headCount: {
            min: 2,
            max: 6,
        },
        gameManual: {
            tester: '고요 제시되는 단어를 행동으로 설명해요',
            participant: '고요 행동을 보고 어떤 단어인지 맞춰요',
        },
        imgPath: require('../images/backgrounds/star.png'),
    },
    {
        num: 3,
        bgColor1: '#ff3565',
        bgColor2: '#ffcbc4',
        title: '몸으로 말해요',
        type: '개인전',
        headCount: {
            min: 2,
            max: 6,
        },
        gameManual: {
            tester: '몸말 제시되는 단어를 행동으로 설명해요',
            participant: '몸말 행동을 보고 어떤 단어인지 맞춰요',
        },
        imgPath: require('../images/backgrounds/cherry.png'),
    },
];
