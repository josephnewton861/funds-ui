const ProgresBar = ({ percentage }: { percentage: number }) => {
  return (
    <div style={{ width: '100%', backgroundColor: '#eee', height: '20px' }}>
      <div
        style={{
          width: `${percentage}%`,
          backgroundColor: 'darkRed',
          height: '100%',
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
}

export default ProgresBar;