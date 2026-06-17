const crops = [
  {
    name: "Maize",
    image: "https://source.unsplash.com/400x300/?maize,farm",
    description: "Maize is a staple crop that is widely cultivated for its versatility and high yield.",
  },
  {
    name: "Wheat",
    image: "https://source.unsplash.com/400x300/?wheat,farm",
    description: "Wheat is a cereal grain that is a major source of food worldwide, used for making bread, pasta, and other products.",
  },
  {
    name: "Rice",
    image: "https://source.unsplash.com/400x300/?rice,field",
    description: "Rice is a staple food for more than half of the world's population, known for its adaptability to different climates.",
  },
  {
    name: "Beans",
    image: "https://source.unsplash.com/400x300/?beans,farm",
    description: "Beans are a nutritious legume that provides protein and essential nutrients, commonly grown in various regions.",
  },
];

export default function CropCards() {
    return (
       <div>
        <h3>Mazao maarufu</h3>

        <div style={styles.grid}>
          {crops.map((crop) => (
            <div key={crop.name} style={styles.card}>
              <img src={crop.image} alt={crop.name} style={styles.image} />
              <h4 style={styles.cropName}>{crop.name}</h4>
              <p style={styles.description}>{crop.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
}   

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px'
    },
    card: {
        background: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '4px'
    },
    cropName: {
        fontSize: '1.2rem',
        marginTop: '10px'
    },
    description: {
        fontSize: '1rem',
        color: '#555',
        marginTop: '5px'
    }
};
