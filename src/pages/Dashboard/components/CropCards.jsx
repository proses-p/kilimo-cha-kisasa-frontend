const crops = [
  {
    name: "Maize",
    image: "https://images.unsplash.com/photo-1723645013435-c3c8948faf59?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Maize is a staple crop that is widely cultivated for its versatility and high yield.",
  },
  {
    name: "Wheat",
    image: "https://images.unsplash.com/photo-1511735643442-503bb3bd348a?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Wheat is a cereal grain that is a major source of food worldwide, used for making bread, pasta, and other products.",
  },
  {
    name: "Rice",
    image: "https://images.unsplash.com/photo-1610760722225-7cd1135ca2da?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Rice is a staple food for more than half of the world's population, known for its adaptability to different climates.",
  },
  {
    name: "Beans",
    image: "https://plus.unsplash.com/premium_photo-1661963106862-fac46c201cd6?q=80&w=906&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Beans are a nutritious legume that provides protein and essential nutrients, commonly grown in various regions.",
  },
];

export default function CropCards() {
    // Duplicated once so the slide loop is seamless (no visible jump/reset)
    const loopCrops = [...crops, ...crops];

    return (
       <div style={styles.wrapper}>
        <div style={styles.glow}></div>

        <h3 style={styles.heading}>Mazao maarufu</h3>

        <div style={styles.viewport}>
          <div style={styles.track} className="ck-track">
            {loopCrops.map((crop, i) => (
              <div key={crop.name + i} style={styles.card}>
                <img src={crop.image} alt={crop.name} style={styles.image} />
                <div style={styles.cardBody}>
                  <h4 style={styles.cropName}>{crop.name}</h4>
                  <p style={styles.description}>{crop.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes ck-slide {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .ck-track {
            animation: ck-slide 40s linear infinite;
          }
          .ck-track:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    );
}

const styles = {
    wrapper: {
        background: `
            radial-gradient(circle at 85% 10%, rgba(94, 234, 212, 0.14), transparent 45%),
            linear-gradient(135deg, #052e16 0%, #14532d 50%, #0f766e 100%)
        `,
        padding: '32px 0 32px 24px',
        borderRadius: '18px',
        boxShadow: '0 20px 45px rgba(4, 47, 30, 0.4), inset 0 1px 0 rgba(94, 234, 212, 0.08)',
        border: '1px solid rgba(94, 234, 212, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Segoe UI', sans-serif"
    },

    glow: {
        position: 'absolute',
        top: '-70px',
        right: '-50px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74, 222, 128, 0.2), transparent 70%)',
        filter: 'blur(6px)',
        pointerEvents: 'none'
    },

    heading: {
        fontSize: '1.5rem',
        fontWeight: '500',
        letterSpacing: '0.2px',
        marginBottom: '20px',
        paddingRight: '24px',
        background: 'linear-gradient(90deg, #bbf7d0 0%, #5eead4 60%, #99f6e4 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        position: 'relative',
        zIndex: 1
    },

    viewport: {
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        maskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)'
    },

    track: {
        display: 'flex',
        gap: '20px',
        width: 'max-content',
        willChange: 'transform'
    },

    card: {
        background: 'linear-gradient(160deg, rgba(20, 83, 45, 0.55), rgba(15, 118, 110, 0.45))',
        border: '1px solid rgba(94, 234, 212, 0.18)',
        padding: '14px',
        borderRadius: '14px',
        boxShadow: '0 12px 30px rgba(4, 47, 30, 0.35)',
        textAlign: 'center',
        width: '250px',
        flexShrink: 0
    },

    image: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '10px',
        display: 'block'
    },

    cardBody: {
        marginTop: '10px'
    },

    cropName: {
        fontSize: '1.15rem',
        fontWeight: '500',
        margin: 0,
        color: '#d1fae5',
        letterSpacing: '0.2px'
    },

    description: {
        fontSize: '0.9rem',
        fontWeight: '400',
        color: '#a7f3d0',
        marginTop: '6px',
        lineHeight: '1.5'
    }
};