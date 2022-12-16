function BlurContainer({ src, blur }) {

  const transformWrapper = `scale(${blur}, 0.001)`;
  const transform = `scale(calc(1/(${blur})), 1000)`;

  return (
    <div className="Blur-wrapper">
      <div style={{
        filter: 'blur(1rem)',
        height: '100%',
        transform: transformWrapper,
        display: 'flex'
      }}>
        <img style={{
          transform: transform
        }} src={src} ></img>
      </div>
    </div>
  );
}

export default BlurContainer;