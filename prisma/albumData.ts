type song = {
  songName: string
  url: string
  duration: number
}

type album = {
  albumName: string
  albumCover: string
}

export const artistsData: {
  name: string
  profile: string
  album: album
  songs: song[]
}[] = [
  {
    name: 'Barcelona Sonora',
    profile:
      'https://media.sonar.es/attached_images/8313/medium/sonar-94_2.jpg?1465044366',
    album: {
      albumName: 'Disco Pirata',
      albumCover:
        'https://freemusicarchive.org/image/?file=images%2Falbums%2FDisco_Pirata_-_20100621200206350.jpg&width=290&height=290&type=image',
    },
    songs: [
      {
        songName: 'Panayonki 76',
        url: 'https://dl.dropboxusercontent.com/s/qfnspp501i8dszw/,Duo%2520Cobra%2520-%2520Panayonki%252076.mp3?dl=0',
        duration: 300,
      },
      {
        songName: 'Gasolina',
        url: 'https://dl.dropboxusercontent.com/s/ysc07ptpmaztvz7/Kayo%2520Malayo%2520-%2520Gasolina.mp3?dl=0',
        duration: 238,
      },
      {
        songName: '¡Qué Paciencia!',
        url: 'https://dl.dropboxusercontent.com/s/66vjbwv1u7g8315/Los%2520Sundayers%2520-%2520%25C2%25A1Qu%25C3%25A9%2520Paciencia%2521.mp3?dl=0',
        duration: 173,
      },

      {
        songName: 'De Pronto no Estás Tú',
        url: 'https://dl.dropboxusercontent.com/s/jfre7eb8syn1482/Pacotiempo%2520-%2520De%2520Pronto%2520no%2520Est%25C3%25A1s%2520T%25C3%25BA.mp3?dl=0',
        duration: 223,
      },
    ],
  },
  {
    name: 'springtide',
    profile: 'https://i.scdn.co/image/ab67616d0000b27317f16f841a54c1f8ceb6f374',
    album: {
      albumName: 'Just Before April',
      albumCover:
        'https://freemusicarchive.org/image/?file=images%2Falbums%2Fspringtide_-_Just_Before_April_-_2013011574252365.jpg&width=290&height=290&type=image',
    },
    songs: [
      {
        songName: 'crucial',
        url: 'https://dl.dropboxusercontent.com/s/wpq9tbu1ax7fkzm/springtide%2520-%2520crucial.mp3?dl=0',
        duration: 250,
      },

      {
        songName: 'Indyair',
        url: 'https://dl.dropboxusercontent.com/s/hkppftnmvtc52li/springtide%2520-%2520Indyair.mp3?dl=0',
        duration: 160,
      },
      {
        songName: 'Just Before April',
        url: 'https://dl.dropboxusercontent.com/s/lp5g04lbqbk545n/springtide%2520-%2520Just%2520Before%2520April%2520%2528Album%2520Preview%2529.mp3?dl=0',
        duration: 176,
      },

      {
        songName: 'springtide',
        url: 'https://dl.dropboxusercontent.com/s/1by6vbxd5kwl6hc/springtide%2520-%2520springtide.mp3?dl=0',
        duration: 133,
      },
    ],
  },
  {
    name: 'YACHT',
    profile:
      'https://media.pitchfork.com/photos/5929b1a15e6ef95969322168/1:1/w_320/d2fe94e9.jpeg',
    album: {
      albumName: 'Shangri-La',
      albumCover:
        'https://freemusicarchive.org/image/?file=images%2Falbums%2FYACHT_-_Shangri-La_Instrumentals_-_2011101352600471.jpg&width=290&height=290&type=image',
    },
    songs: [
      {
        songName: 'Dystopia',
        duration: 231,
        url: 'https://dl.dropboxusercontent.com/s/d5il15hotazw45i/YACHT%2520-%2520Dystopia%2520%2528instrumental%2529.mp3?dl=0',
      },
      {
        songName: 'I Walked Alone',
        duration: 290,
        url: 'https://dl.dropboxusercontent.com/s/hvd5jmqmu8w6yl2/YACHT%2520-%2520I%2520Walked%2520Alone%2520%2528instrumental%2529.mp3?dl=0',
      },

      {
        songName: 'One Step',
        duration: 202,
        url: 'https://dl.dropboxusercontent.com/s/g4yvdqksqfqegdi/YACHT%2520-%2520One%2520Step%2520%2528instrumental%2529.mp3?dl=0',
      },

      {
        songName: 'Shangri-La',
        duration: 297,
        url: 'https://dl.dropboxusercontent.com/s/onvpa0kwp7sotfj/YACHT%2520-%2520Shangri-La%2520%2528instrumental%2529.mp3?dl=0',
      },
      {
        songName: 'Utopia',
        duration: 186,
        url: 'https://dl.dropboxusercontent.com/s/nz07lisgtn23jqy/YACHT%2520-%2520Utopia%2520%2528instrumental%2529.mp3?dl=0',
      },
    ],
  },
]
