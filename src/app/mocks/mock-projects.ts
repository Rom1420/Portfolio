import { Project } from "../models/projects-model";

export const PROJECTS: { [key: string]: Project } = {
  tetrys: {
    title: 'Tetrys',
    description: 'This project is designed to assist young individuals with <span class="highlight-text">dys disorders (dyslexia, dysgraphia, etc.)</span> in their learning journey. It also provides occupational therapists with tools to track their patients\' progress. The game combines traditional Tetris elements with word recognition exercises, <span class="highlight-text">making learning both fun and educational.</span>',
    link: 'http://tetrys-game.fr/pre-game',
    logo: 'tetris-logo.svg',
    image: 'tetrys.png',
    video: 'tetrys.mp4',
  },
  android: {
    title: 'CrazyDinguo Festival App',
    description: 'The goal of this project was to create an Android application to enhance the festival-goer experience at the <span class="highlight-text">CrazyDinguo Festival</span>. Users can request assistance, reserve parking spots, and access the event schedule.',
    link: 'https://github.com/martgauthier/crazy-dinguo-android-app',
    logo: 'android-logo.svg',
  },
  babylon: {
    title: 'Games On Web',
    description: 'This project was developed for a competition using <span class="highlight-text"> Babylon.js to create 3D graphics</span>. The game is themed around the Olympics, featuring a commentator character who participates in various events.',
    link: 'https://github.com/martgauthier/gamesonweb',
    logo: 'babylon-jo-logo.svg',
  },
  matchup: {
    title: 'MatchUp',
    description: 'MatchUp is an app that allows users to create and join sports sessions, making it easy to find partners. For this project, I designed the <span class="highlight-text">Figma mockup</span>.',
    link: 'https://www.figma.com/proto/jUcZ78ve6PW3iPkEyhnKek/MatchUp?node-id=20-2178&t=ZHy6lUzspfTH6yDJ-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1',
    logo: 'matchup-logo.svg',
    image: 'matchup.png',
    video: 'matchup.mp4',
  },
  redbull: {
    title: 'RedBull Campaign',
    description: 'This project involves a <span class="highlight-text">Figma mockup</span> showcasing RedBull products. The design highlights the brand\'s dynamic and energetic image.',
    link: 'https://www.figma.com/proto/xq0e8FI1lBo0mpMh35Pgfs/redbull?node-id=11-2231&t=U9gfsXXcvSfg82es-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=11%3A2265',
    logo: 'redbull-logo.svg',
    image: 'redbull.png',
    video: 'redbull.mp4',
  }
};