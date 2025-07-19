export interface Section {
  number: number;
  path: string;
  color: string;
  labelX: number;
  labelY: number;
}

export interface Level {
  name: string;
  sections: Section[];
  colors: string[];
}

export const levels: Level[] = [
  {
  name: "Cloud",
  colors: ['#1E90FF'],
  sections: [
    {
      number: 1,
      color: '#1E90FF',
      path: 'M160,180 C140,160 200,130 220,160 C240,140 270,150 260,180 C280,200 220,210 200,200 C180,220 140,200 160,180 Z',
      labelX: 200,
      labelY: 180
    }
  ]
},
    {
      name: "Star",
      colors: ['#FFD700'],
      sections: [
        {
          number: 1,
          color: '#FFD700',
          path: 'M200,130 L215,180 L270,180 L225,210 L240,260 L200,230 L160,260 L175,210 L130,180 L185,180 Z',
          labelX: 200,
          labelY: 200
        }
      ]
    },
    {
  name: "Balloon",
  colors: ['#FF69B4', '#8B0000'],
  sections: [
    {
      number: 1,
      color: '#FF69B4',
      path: 'M200,120 A30,40 0 1,1 200,200 A30,40 0 1,1 200,120',
      labelX: 200,
      labelY: 160
    },
    {
      number: 2,
      color: '#8B0000',
      path: 'M195,200 L205,200 L200,230 Z',
      labelX: 200,
      labelY: 215
    }
  ]
},
    {
  name: "Sun",
  colors: ['#FFD700', '#FFA500'],
  sections: [
    {
      number: 1,
      color: '#FFD700',
      path: 'M180,180 A20,20 0 1,1 220,180 A20,20 0 1,1 180,180', // sun center
      labelX: 200,
      labelY: 180
    },
    {
      number: 2,
      color: '#FFA500',
      path: 'M200,60 L200,120', // top ray
      labelX: 200,
      labelY: 90
    },
    {
      number: 3,
      color: '#FFA500',
      path: 'M270,110 L230,150', // top-right ray
      labelX: 250,
      labelY: 130
    },
    {
      number: 4,
      color: '#FFA500',
      path: 'M140,110 L170,150', // top-left ray
      labelX: 155,
      labelY: 130
    }
  ]
},

  {
    name: "House",
    colors: ['#FF0000', '#FFD700', '#8B4513'], // ✅ Only one colors array
    sections: [
      {
        number: 1,
        color: '#FF0000',
        path: 'M200,100 L270,180 L130,180 Z', // roof
        labelX: 200,
        labelY: 140
      },
      {
        number: 2,
        color: '#FFD700',
        path: 'M150,180 H250 V250 H150 Z', // house base
        labelX: 200,
        labelY: 215
      },
      {
        number: 3,
        color: '#8B4513',
        path: 'M220,110 H230 V140 H220 Z', // chimney
        labelX: 225,
        labelY: 125
      }
    ]
  },
  {
    name: "Flower",
    colors: ["#EC4899", "#FCD34D", "#10B981", "#3B82F6", "#EF4444", "#8B5CF6"],
    sections: [
      {
        number: 1,
        path: "M 200 150 Q 150 100 100 150 Q 150 200 200 150",
        color: "#EC4899",
        labelX: 150,
        labelY: 150
      },
      {
        number: 2,
        path: "M 200 150 Q 250 100 300 150 Q 250 200 200 150",
        color: "#EC4899",
        labelX: 250,
        labelY: 150
      },
      {
        number: 3,
        path: "M 200 150 Q 150 200 200 250 Q 250 200 200 150",
        color: "#EC4899",
        labelX: 200,
        labelY: 200
      },
      {
        number: 4,
        path: "M 200 150 Q 250 100 200 50 Q 150 100 200 150",
        color: "#EC4899",
        labelX: 200,
        labelY: 100
      },
      {
        number: 5,
        path: "M 190 140 L 210 140 L 210 160 L 190 160 Z",
        color: "#FCD34D",
        labelX: 200,
        labelY: 150
      },
      {
        number: 6,
        path: "M 195 250 L 205 250 L 205 350 L 195 350 Z",
        color: "#10B981",
        labelX: 200,
        labelY: 300
      }
    ]
  }
,
  {
    name: "Cat",
    sections: [
      {
        number: 1,
        path: "M 150 120 Q 200 80 250 120 Q 225 180 200 200 Q 175 180 150 120",
        color: "#F97316",
        labelX: 200,
        labelY: 140
      },
      {
        number: 2,
        path: "M 160 110 L 180 90 L 170 120 Z",
        color: "#F97316",
        labelX: 170,
        labelY: 105
      },
      {
        number: 3,
        path: "M 220 120 L 240 90 L 230 110 Z",
        color: "#F97316",
        labelX: 230,
        labelY: 105
      },
      {
        number: 4,
        path: "M 185 140 L 195 140 L 195 150 L 185 150 Z",
        color: "#1F2937",
        labelX: 190,
        labelY: 145
      },
      {
        number: 5,
        path: "M 205 140 L 215 140 L 215 150 L 205 150 Z",
        color: "#1F2937",
        labelX: 210,
        labelY: 145
      },
      {
        number: 6,
        path: "M 190 160 Q 200 170 210 160",
        color: "#EC4899",
        labelX: 200,
        labelY: 165
      }
    ],
    colors: ["#F97316", "#1F2937", "#EC4899", "#FCD34D", "#10B981", "#3B82F6"]
  },
  {
    name: "Car",
    sections: [
      {
        number: 1,
        path: "M 100 200 L 300 200 L 300 250 L 100 250 Z",
        color: "#EF4444",
        labelX: 200,
        labelY: 225
      },
      {
        number: 2,
        path: "M 130 170 L 270 170 L 270 200 L 130 200 Z",
        color: "#3B82F6",
        labelX: 200,
        labelY: 185
      },
      {
        number: 3,
        path: "M 120 250 Q 140 280 160 250 Q 140 220 120 250",
        color: "#1F2937",
        labelX: 140,
        labelY: 250
      },
      {
        number: 4,
        path: "M 240 250 Q 260 280 280 250 Q 260 220 240 250",
        color: "#1F2937",
        labelX: 260,
        labelY: 250
      }
    ],
    colors: ["#EF4444", "#3B82F6", "#1F2937", "#FCD34D", "#10B981", "#8B5CF6"]
  },
  {
    name: "Rainbow",
    sections: [
      {
        number: 1,
        path: "M 50 250 Q 200 100 350 250 Q 200 120 50 250",
        color: "#EF4444",
        labelX: 200,
        labelY: 160
      },
      {
        number: 2,
        path: "M 60 250 Q 200 130 340 250 Q 200 140 60 250",
        color: "#F97316",
        labelX: 200,
        labelY: 180
      },
      {
        number: 3,
        path: "M 70 250 Q 200 150 330 250 Q 200 160 70 250",
        color: "#FCD34D",
        labelX: 200,
        labelY: 200
      },
      {
        number: 4,
        path: "M 80 250 Q 200 170 320 250 Q 200 180 80 250",
        color: "#10B981",
        labelX: 200,
        labelY: 220
      },
      {
        number: 5,
        path: "M 90 250 Q 200 190 310 250 Q 200 200 90 250",
        color: "#3B82F6",
        labelX: 200,
        labelY: 240
      }
    ],
    colors: ["#EF4444", "#F97316", "#FCD34D", "#10B981", "#3B82F6", "#8B5CF6"]
  },
  {
    name: "Butterfly",
    sections: [
      {
        number: 1,
        path: "M 180 150 Q 150 120 120 150 Q 150 180 180 150",
        color: "#EC4899",
        labelX: 150,
        labelY: 150
      },
      {
        number: 2,
        path: "M 220 150 Q 250 120 280 150 Q 250 180 220 150",
        color: "#EC4899",
        labelX: 250,
        labelY: 150
      },
      {
        number: 3,
        path: "M 180 200 Q 150 230 120 200 Q 150 170 180 200",
        color: "#8B5CF6",
        labelX: 150,
        labelY: 200
      },
      {
        number: 4,
        path: "M 220 200 Q 250 230 280 200 Q 250 170 220 200",
        color: "#8B5CF6",
        labelX: 250,
        labelY: 200
      },
      {
        number: 5,
        path: "M 195 120 L 205 120 L 205 280 L 195 280 Z",
        color: "#1F2937",
        labelX: 200,
        labelY: 200
      }
    ],
    colors: ["#EC4899", "#8B5CF6", "#1F2937", "#FCD34D", "#10B981", "#3B82F6"]
  },
  {
    name: "Ice Cream",
    sections: [
      {
        number: 1,
        path: "M 170 150 Q 200 120 230 150 L 230 200 L 170 200 Z",
        color: "#EC4899",
        labelX: 200,
        labelY: 165
      },
      {
        number: 2,
        path: "M 175 200 L 225 200 L 225 240 L 175 240 Z",
        color: "#FCD34D",
        labelX: 200,
        labelY: 220
      },
      {
        number: 3,
        path: "M 180 240 L 220 240 L 200 300 Z",
        color: "#D97706",
        labelX: 200,
        labelY: 260
      }
    ],
    colors: ["#EC4899", "#FCD34D", "#D97706", "#10B981", "#3B82F6", "#8B5CF6"]
  },
  {
    name: "Apple Tree",
    sections: [
      {
        number: 1,
        path: "M 150 100 Q 200 50 250 100 Q 225 150 200 180 Q 175 150 150 100",
        color: "#10B981",
        labelX: 200,
        labelY: 120
      },
      {
        number: 2,
        path: "M 190 180 L 210 180 L 210 300 L 190 300 Z",
        color: "#D97706",
        labelX: 200,
        labelY: 240
      },
      {
        number: 3,
        path: "M 170 120 Q 180 110 190 120 Q 180 130 170 120",
        color: "#EF4444",
        labelX: 180,
        labelY: 120
      },
      {
        number: 4,
        path: "M 210 140 Q 220 130 230 140 Q 220 150 210 140",
        color: "#EF4444",
        labelX: 220,
        labelY: 140
      }
    ],
    colors: ["#10B981", "#D97706", "#EF4444", "#FCD34D", "#3B82F6", "#8B5CF6"]
  },
  {
    name: "Rocket Ship",
    sections: [
      {
        number: 1,
        path: "M 180 50 L 220 50 L 200 20 Z",
        color: "#EF4444",
        labelX: 200,
        labelY: 40
      },
      {
        number: 2,
        path: "M 180 50 L 220 50 L 220 200 L 180 200 Z",
        color: "#F3F4F6",
        labelX: 200,
        labelY: 125
      },
      {
        number: 3,
        path: "M 185 100 L 215 100 L 215 130 L 185 130 Z",
        color: "#3B82F6",
        labelX: 200,
        labelY: 115
      },
      {
        number: 4,
        path: "M 160 200 L 180 200 L 170 250 Z",
        color: "#F97316",
        labelX: 170,
        labelY: 220
      },
      {
        number: 5,
        path: "M 220 200 L 240 200 L 230 250 Z",
        color: "#F97316",
        labelX: 230,
        labelY: 220
      }
    ],
    colors: ["#EF4444", "#F3F4F6", "#3B82F6", "#F97316", "#10B981", "#8B5CF6"]
  },
  {
  name: "Fish",
  colors: ['#1E90FF', '#FFD700', '#FFA500'],
  sections: [
    {
      number: 1,
      color: '#1E90FF',
      path: 'M140,180 C170,150 230,150 260,180 C230,210 170,210 140,180 Z', // body
      labelX: 200,
      labelY: 180
    },
    {
      number: 2,
      color: '#FFD700',
      path: 'M260,180 L290,160 L290,200 Z', // tail
      labelX: 280,
      labelY: 180
    },
    {
      number: 3,
      color: '#FFA500',
      path: 'M180,180 A5,5 0 1,1 190,180 A5,5 0 1,1 180,180', // eye
      labelX: 185,
      labelY: 180
    }
  ],
},
{
  name: "Train Engine",
  colors: ['#0000FF', '#8B0000', '#FFA500'],
  sections: [
    {
      number: 1,
      color: '#0000FF',
      path: 'M150,200 H250 V250 H150 Z', // body
      labelX: 200,
      labelY: 225
    },
    {
      number: 2,
      color: '#8B0000',
      path: 'M250,180 H280 V250 H250 Z', // cabin
      labelX: 265,
      labelY: 215
    },
    {
      number: 3,
      color: '#FFA500',
      path: 'M170,250 A10,10 0 1,1 190,250 A10,10 0 1,1 170,250', // wheel 1
      labelX: 180,
      labelY: 250
    },
    {
      number: 4,
      color: '#FFA500',
      path: 'M210,250 A10,10 0 1,1 230,250 A10,10 0 1,1 210,250', // wheel 2
      labelX: 220,
      labelY: 250
    }
  ]
},


];
