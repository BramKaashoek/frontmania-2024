type Fruit = {
  name: string;
  price: string;
  imageUrl: string;
  icon: string;
  slug: string;
  blurb: string;
  description: string;
};

export const fruits: { [key: string]: Fruit } = {
  apple: {
    name: 'Premium Apple',
    price: '$9.99',
    imageUrl: 'apple.jpg',
    icon: 'Apple',
    slug: 'apple',
    description: `Our Premium Apple is the crown jewel of the fruit world. Each apple is carefully nurtured from blossom to harvest, resulting in a perfect balance of sweetness and crispness. With its vibrant red skin and satisfying crunch, this apple isn't just a snack - it's an experience. Whether you're looking to keep the doctor away, create the perfect pie, or simply impress your friends with your exquisite taste in fruits, our Premium Apple is the obvious choice. Remember, an apple a day keeps the FOMO away!`,
    blurb: `  Experience the pinnacle of apple perfection with our Premium Apple. Handpicked from the finest orchards and polished to a gleaming shine, this isn't just an apple - it's a lifestyle choice.`,
  },
  banana: {
    name: 'Artisanal Banana',
    icon: 'Banana',
    price: '$10.00',
    imageUrl: 'banana.jpg',
    slug: 'banana',
    blurb: `Our Artisanal Banana is a cut above the rest. Grown in the lush jungles of South America, each banana is handpicked by skilled farmers who know the secret to perfect ripeness. With its creamy texture and delicate flavor, this banana is the perfect addition to your morning smoothie or afternoon snack.`,
    description: `Our Artisanal Banana is a work of art. Grown in the rich soil of South America and ripened to perfection, this banana is the epitome of tropical luxury. Whether you're blending it into a smoothie, slicing it onto your cereal, or simply enjoying it on its own, our Artisanal Banana is sure to delight your taste buds.Don't settle for ordinary fruit - elevate your snacking experience with our Artisanal Banana. You deserve the best!`,
  },
  cherry: {
    name: 'Gourmet Cherry',
    icon: 'Cherry',
    price: '$12.99',
    imageUrl: 'cherry.jpg',
    slug: 'cherry',
    blurb: `Our Gourmet Cherry is a true delicacy. Grown in the sun-drenched orchards of Italy, each cherry is handpicked at the peak of ripeness to ensure maximum flavor and sweetness. With its deep red hue and juicy flesh, this cherry is a treat for the senses. Whether you're baking a decadent dessert, mixing up a refreshing cocktail, or simply enjoying them on their own, our Gourmet Cherry is sure to impress.`,
    description: `Indulge in the sweet taste of luxury with our Gourmet Cherry. Handpicked from the finest orchards in Italy and bursting with flavor, this cherry is a true delight for the senses. Whether you're baking a luscious pie, mixing up a refreshing cocktail, or simply enjoying them on their own, our Gourmet Cherry is sure to impress. Treat yourself to the best - you deserve it!`,
  },
  orange: {
    name: 'Designer Orange',
    icon: 'Citrus',
    price: '$10.99',
    imageUrl: 'orange.jpg',
    slug: 'orange',
    blurb: `Our Designer Orange is a cut above the rest. Grown in the sun-drenched groves of Florida, each orange is handpicked at the peak of ripeness to ensure maximum flavor and juiciness. With its vibrant color and refreshing taste, this orange is the perfect addition to your morning routine or afternoon snack.`,
    description: `Elevate your citrus game with our Designer Orange. Grown in the sunny groves of Florida and bursting with flavor, this orange is a true delight for the senses. Whether you're juicing it for breakfast, slicing it into a salad, or simply enjoying it on its own, our Designer Orange is sure to impress. Treat yourself to the best - you deserve it!`,
  },
  grape: {
    name: 'Luxury Grape',
    icon: 'Grape',
    price: '$15.99',
    imageUrl: 'grape.jpg',
    slug: 'grape',
    blurb: `Our Luxury Grape is a true indulgence. Grown in the fertile vineyards of France, each grape is handpicked at the peak of ripeness to ensure maximum flavor and sweetness. With its plump texture and rich flavor, this grape is a treat for the senses. Whether you're pairing it with cheese, mixing it into a salad, or simply enjoying it on its own, our Luxury Grape is sure to impress.`,
    description: `Treat yourself to the taste of luxury with our Luxury Grape. Handpicked from the finest vineyards in France and bursting with flavor, this grape is a true delight for the senses. Whether you're pairing it with cheese, mixing it into a salad, or simply enjoying it on its own, our Luxury Grape is sure to impress. Treat yourself to the best - you deserve it!`,
  },
  lemon: {
    name: 'Exotic Lemon',
    icon: 'Citrus',
    price: '$8.99',
    imageUrl: 'lemon.jpg',
    slug: 'lemon',
    blurb: `Our Exotic Lemon is a true delight. Grown in the sun-drenched groves of California, each lemon is handpicked at the peak of ripeness to ensure maximum flavor and juiciness. With its vibrant color and zesty taste, this lemon is the perfect addition to your favorite recipes or refreshing beverages.`,
    description: `Elevate your citrus game with our Exotic Lemon. Grown in the sunny groves of California and bursting with flavor, this lemon is a true delight for the senses. Whether you're zesting it into a cake, squeezing it into a cocktail, or simply enjoying it on its own, our Exotic Lemon is sure to impress. Treat yourself to the best - you deserve it!`,
  },
};
