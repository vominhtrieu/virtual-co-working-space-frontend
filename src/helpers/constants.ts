export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const ANIMATION_LIST = ['Idle', 'Walking', 'Wave', 'Rumba', 'Clapping', 'FallBackward', 'Back Pain', 'Stretching', 'Thankful'] as const
export const EMOJI_LIST: string[] = ['Smile', 'FunnyFace', 'Surprised', 'PuffedOutCheeks', 'Cry', 'Ehe', 'Annoy', 'Love', 'Kissing']
export const AppearanceGroups:any[] = [
    {
        groupName: "Skin Color",
        items: [
            {code: "Yellow", type: "color", hex: "#F2CCB7"},
            {code: "Black", type: "color", hex: "#D19477"},
            {code: "White", type: "color", hex: "#FEE3D4"},
        ],
    },
    {
        groupName: "Hair Style",
        items: [
            {code: "Hair1", type: "image", url: "./images/Hair1.png"},
            {code: "Hair2", type: "image", url: "./images/Hair2.png"},
            {code: "Hair3", type: "image", url: "./images/Hair2.png"},
        ],
    },
    {
        groupName: "Hair Color",
        items: [
            {code: "Orange", type: "color", hex: "#C79100"},
            {code: "Gray", type: "color", hex: "#808080"},
            {code: "Black", type: "color", hex: "#111111"},
        ],
    },
    {
        groupName: "Eyes Style",
        items: [
            {code: "Eyes1", type: "image", url: "./images/Eyes1.png"},
            {code: "Eyes2", type: "image", url: "./images/Eyes2.png"},
        ],
    },
    {
        groupName: "Shirt Color",
        items: [
            {code: "Orange", type: "color", hex: "#F5AA2E"},
            {code: "White", type: "color", hex: "#FFFFFF"},
            {code: "Black", type: "color", hex: "#000000"},
        ],
    },
    {
        groupName: "Pant Color",
        items: [
            {code: "Orange", type: "color", hex: "#F5AA2E"},
            {code: "White", type: "color", hex: "#FFFFFF"},
            {code: "Black", type: "color", hex: "#000000"},
        ],
    },
    {
        groupName: "Shoe Color",
        items: [
            {code: "Orange", type: "color", hex: "#F5AA2E"},
            {code: "White", type: "color", hex: "#FFFFFF"},
            {code: "Black", type: "color", hex: "#000000"},
        ],
    },
];
